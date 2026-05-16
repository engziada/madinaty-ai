const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(process.cwd(), "data", "madinaty.db");
const db = new Database(dbPath);

const tables = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table'")
  .all()
  .map((r) => r.name);

console.log("📋 Tables in database:", tables.join(", "));

const count = db.prepare("SELECT COUNT(*) as c FROM push_tokens").get();
console.log("🔔 Push token count:", count.c);

if (count.c > 0) {
  const latest = db
    .prepare("SELECT token, locale, platform, os, browser, screen_size, created_at FROM push_tokens ORDER BY id DESC LIMIT 3")
    .all();
  console.log("📊 Latest tokens:");
  latest.forEach((row, i) => {
    console.log(`  ${i + 1}. [${row.locale}] ${row.platform} | ${row.os} | ${row.browser} | ${row.screen_size} | ${row.created_at}`);
    console.log(`     Token: ${row.token.substring(0, 20)}...${row.token.substring(row.token.length - 20)}`);
  });
} else {
  console.log("ℹ️ No tokens yet. Visit the site in a browser, click 'Enable Notifications', grant permission, then run this script again.");
}

db.close();
