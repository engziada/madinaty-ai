#!/usr/bin/env node

/**
 * Quick workflow test for Madinaty local discovery.
 *
 * Usage:
 *   node scripts/test-discovery-workflow.mjs "Where can I eat Sushi?"
 */

const SERPER_API_URL = "https://google.serper.dev/search";

/**
 * @typedef {{title?: string, link?: string, snippet?: string}} SearchResult
 */

/**
 * Build a strict locality query for Madinaty discovery.
 * @param {string} userQuery
 * @returns {string}
 */
function buildSerperQuery(userQuery) {
  return [
    `${userQuery}`,
    "Madinaty",
    "New Cairo",
    "Egypt",
    "(site:google.com/maps OR site:tripadvisor.com OR site:facebook.com OR site:instagram.com)"
  ].join(" ");
}

/**
 * Check if content looks tied to Madinaty.
 * @param {SearchResult} item
 * @returns {boolean}
 */
function isMadinatyRelevant(item) {
  const haystack = `${item.title ?? ""} ${item.snippet ?? ""} ${item.link ?? ""}`.toLowerCase();
  return (
    haystack.includes("madinaty") ||
    haystack.includes("مدينتي") ||
    haystack.includes("new cairo") ||
    haystack.includes("القاهرة الجديدة")
  );
}

/**
 * Search web using Serper.
 * @param {string} apiKey
 * @param {string} userQuery
 * @returns {Promise<SearchResult[]>}
 */
async function searchSerper(apiKey, userQuery) {
  const query = buildSerperQuery(userQuery);
  const response = await fetch(SERPER_API_URL, {
    method: "POST",
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      q: query,
      gl: "eg",
      hl: "en",
      num: 10
    })
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Serper HTTP ${response.status}: ${errorText}`);
  }

  const payload = await response.json();
  return Array.isArray(payload?.organic) ? payload.organic : [];
}

/**
 * Print compact results for review.
 * @param {string} title
 * @param {SearchResult[]} results
 */
function printResults(title, results) {
  console.log(`\n${title} (${results.length})`);
  if (results.length === 0) {
    console.log("- none");
    return;
  }

  results.slice(0, 5).forEach((item, index) => {
    console.log(`\n${index + 1}. ${item.title ?? "(no title)"}`);
    console.log(`   ${item.link ?? "(no link)"}`);
    if (item.snippet) {
      console.log(`   ${item.snippet}`);
    }
  });
}

async function main() {
  const userQuery = process.argv.slice(2).join(" ").trim() || "Where can I eat Sushi?";
  const apiKey = process.env.SERPER_API_KEY;

  if (!apiKey) {
    throw new Error("Missing SERPER_API_KEY in environment.");
  }

  console.log("Testing discovery workflow...");
  console.log(`User query: ${userQuery}`);

  const organic = await searchSerper(apiKey, userQuery);
  const madinatyOnly = organic.filter(isMadinatyRelevant);

  printResults("Raw trusted-source candidates", organic);
  printResults("Madinaty-filtered candidates", madinatyOnly);

  if (madinatyOnly.length === 0) {
    console.log("\nDecision: fallback message should be returned (no trusted Madinaty matches).\n");
  } else {
    console.log("\nDecision: bot can answer using these sources with links.\n");
  }
}

main().catch((error) => {
  console.error("Workflow test failed:", error?.message ?? error);
  process.exit(1);
});
