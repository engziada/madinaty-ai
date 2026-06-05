<#
.SYNOPSIS
    Pushes all environment variables from .env.local to Vercel.

.DESCRIPTION
    Reads key=value pairs from .env.local, strips surrounding quotes, trims all
    leading/trailing whitespace and newline characters, then upserts each variable
    to Vercel using raw bytes piped via cmd.exe -- ensuring zero whitespace pollution.

.PARAMETER EnvFile
    Path to the .env file. Defaults to .env.local in the project root.

.PARAMETER Environment
    Vercel target environment: production | preview | development. Defaults to production.

.PARAMETER DryRun
    If set, shows what would be pushed without actually calling Vercel.

.EXAMPLE
    .\scripts\push-env-to-vercel.ps1

.EXAMPLE
    .\scripts\push-env-to-vercel.ps1 -DryRun

.EXAMPLE
    .\scripts\push-env-to-vercel.ps1 -Environment preview

.EXAMPLE
    .\scripts\push-env-to-vercel.ps1 -EnvFile .env.production
#>

param(
    [string] $EnvFile     = (Join-Path (Split-Path $PSScriptRoot -Parent) ".env.local"),
    [ValidateSet("production","preview","development")]
    [string] $Environment = "production",
    [switch] $DryRun
)

$ErrorActionPreference = "Stop"
$SEP = "---------------------------------------------------"

function Write-Step { param($msg) Write-Host "  $msg"     -ForegroundColor Cyan   }
function Write-Ok   { param($msg) Write-Host "  OK  $msg" -ForegroundColor Green  }
function Write-Warn { param($msg) Write-Host "  !!  $msg" -ForegroundColor Yellow }
function Write-Fail { param($msg) Write-Host "  ERR $msg" -ForegroundColor Red    }

# ---------------------------------------------------------------------------
# Resolve Vercel CLI path (works even when not on PATH in child PowerShell)
# ---------------------------------------------------------------------------

function Resolve-VercelPath {
    # Prefer .cmd over .ps1 to avoid stderr noise in child PowerShell
    $preferCandidates = @(
        (Join-Path $env:APPDATA "npm\vercel.cmd"),
        (Join-Path $env:APPDATA "npm\vercel.ps1"),
        (Join-Path $env:APPDATA "npm\vercel")
    )
    foreach ($c in $preferCandidates) {
        if (Test-Path $c) { return $c }
    }

    # Fallback: try PATH
    $found = Get-Command "vercel.cmd" -ErrorAction SilentlyContinue
    if ($found) { return $found.Source }
    $found = Get-Command "vercel" -ErrorAction SilentlyContinue
    if ($found) { return $found.Source }

    # Last resort: npm prefix
    try {
        $npmPrefix = (& npm prefix -g 2>$null).Trim()
        foreach ($name in @("vercel.cmd", "vercel.ps1", "vercel")) {
            $c = Join-Path $npmPrefix $name
            if (Test-Path $c) { return $c }
        }
    } catch {}

    return $null
}

function Invoke-Vercel {
    param([string] $VercelBin, [string[]] $Args)
    & $VercelBin @Args 2>&1
}

# ---------------------------------------------------------------------------
# Upsert one variable cleanly
# ---------------------------------------------------------------------------

function Upsert-VercelVar {
    param(
        [string] $VercelBin,
        [string] $Key,
        [string] $Value,
        [string] $Env,
        [string] $TempFile
    )

    # Write value as raw UTF-8 bytes -- NO trailing newline whatsoever
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($Value)
    [System.IO.File]::WriteAllBytes($TempFile, $bytes)

    # Remove existing var silently (ignore errors if it doesn't exist)
    & $VercelBin env rm $Key $Env --yes 2>&1 | Out-Null

    # Pipe file content via cmd.exe to avoid PowerShell pipeline newline injection
    $output = cmd /c "type `"$TempFile`" | `"$VercelBin`" env add $Key $Env" 2>&1
    $joined = ($output -join " ")
    $ok     = ($LASTEXITCODE -eq 0) -or ($joined -match "Added Environment Variable")

    return $ok, $joined
}

# ---------------------------------------------------------------------------
# Banner
# ---------------------------------------------------------------------------

Write-Host ""
Write-Host $SEP -ForegroundColor DarkGray
Write-Host "  Vercel Env Push  -->  [$Environment]" -ForegroundColor White
Write-Host $SEP -ForegroundColor DarkGray
Write-Host ""

# ---------------------------------------------------------------------------
# Validate env file
# ---------------------------------------------------------------------------

if (-not (Test-Path $EnvFile)) {
    Write-Fail "Env file not found: $EnvFile"
    exit 1
}

# ---------------------------------------------------------------------------
# Validate Vercel CLI
# ---------------------------------------------------------------------------

$vercelBin = Resolve-VercelPath
if (-not $vercelBin) {
    Write-Fail "Vercel CLI not found. Run: npm i -g vercel"
    exit 1
}

# Use cmd /c to call .cmd file cleanly and avoid PS stderr noise
$vercelVersion = "unknown"
try {
    $vOut = cmd /c "`"$vercelBin`" --version" 2>&1
    $vercelVersion = ($vOut | Where-Object { $_ -match '\d+\.\d+' } | Select-Object -First 1).ToString().Trim()
} catch {}
Write-Step "Vercel CLI : $vercelVersion  [$vercelBin]"

if ($DryRun) { Write-Warn "DRY RUN -- no changes will be pushed to Vercel" }

Write-Step "Source     : $EnvFile"
Write-Step "Target     : Vercel [$Environment]"
Write-Host ""

# ---------------------------------------------------------------------------
# Parse .env file
# ---------------------------------------------------------------------------

$rawContent = [System.IO.File]::ReadAllText($EnvFile, [System.Text.Encoding]::UTF8)
$lines      = $rawContent -split "`n"
$vars       = [ordered]@{}

foreach ($line in $lines) {
    $line = $line.TrimEnd("`r")

    # Skip comments and blank lines
    if ($line -match '^\s*#' -or $line.Trim() -eq '') { continue }

    # Match KEY=VALUE  (value may be empty)
    if ($line -match '^([A-Za-z_][A-Za-z0-9_]*)=(.*)$') {
        $key = $Matches[1].Trim()
        $val = $Matches[2]

        # Strip surrounding quotes (single or double)
        if ($val -match '^"(.*)"$') { $val = $Matches[1] }
        if ($val -match "^'(.*)'$") { $val = $Matches[1] }

        # Trim all leading/trailing whitespace and newline chars
        $val = $val.Trim().TrimStart("`r", "`n").TrimEnd("`r", "`n")

        $vars[$key] = $val
    }
}

if ($vars.Count -eq 0) {
    Write-Warn "No variables found in $EnvFile"
    exit 0
}

Write-Host "  Found $($vars.Count) variable(s):" -ForegroundColor White
foreach ($k in $vars.Keys) {
    $v       = $vars[$k]
    $preview = if ($v.Length -gt 0) { $v.Substring(0, [Math]::Min(30, $v.Length)) + "..." } else { "(empty)" }
    Write-Host ("    {0,-48} {1}" -f $k, $preview) -ForegroundColor DarkGray
}
Write-Host ""

if ($DryRun) {
    Write-Warn "DRY RUN complete. $($vars.Count) vars would be pushed to [$Environment]. No changes made."
    Write-Host ""
    exit 0
}

# ---------------------------------------------------------------------------
# Push to Vercel
# ---------------------------------------------------------------------------

$tempFile = Join-Path $env:TEMP "vercel_env_push_tmp.txt"
$okCount  = 0
$failed   = @()

foreach ($key in $vars.Keys) {
    $val = $vars[$key]
    Write-Step "Pushing  $key  ($($val.Length) chars)..."

    $result  = Upsert-VercelVar -VercelBin $vercelBin -Key $key -Value $val -Env $Environment -TempFile $tempFile
    $success = $result[0]
    $out     = $result[1]

    if ($success) {
        Write-Ok "$key"
        $okCount++
    } else {
        Write-Fail "$key -- $out"
        $failed += $key
    }
}

# ---------------------------------------------------------------------------
# Cleanup
# ---------------------------------------------------------------------------

if (Test-Path $tempFile) { Remove-Item $tempFile -Force }

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------

Write-Host ""
Write-Host $SEP -ForegroundColor DarkGray
if ($failed.Count -eq 0) {
    Write-Host "  All $okCount variable(s) pushed successfully to [$Environment]." -ForegroundColor Green
} else {
    Write-Host "  $okCount pushed,  $($failed.Count) failed:" -ForegroundColor Yellow
    foreach ($f in $failed) {
        Write-Host "    - $f" -ForegroundColor Red
    }
}
Write-Host $SEP -ForegroundColor DarkGray
Write-Host ""

if ($failed.Count -gt 0) { exit 1 }
