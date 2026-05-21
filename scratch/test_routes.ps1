$routes = @(
  '/en/course/session',
  '/en/course/details',
  '/en/course/trainers',
  '/en/course/faq',
  '/ar/course/session',
  '/ar/course/details',
  '/ar/course/trainers',
  '/ar/course/faq'
)

foreach ($r in $routes) {
  try {
    $res = Invoke-WebRequest -Uri "http://localhost:3001$r" -UseBasicParsing -TimeoutSec 20
    Write-Host "$r => $($res.StatusCode)"
  } catch {
    Write-Host "$r => ERROR: $($_.Exception.Message)"
  }
}
