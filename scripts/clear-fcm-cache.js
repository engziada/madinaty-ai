/**
 * Diagnostic script to clear FCM-related caches.
 * Run this, then restart the dev server and reload the browser completely.
 */

const fs = require("fs");
const path = require("path");

// 1. Remove the old database token (so the server acts clean)
const dbPath = path.join(process.cwd(), "data", "madinaty.db");
if (fs.existsSync(dbPath)) {
  try {
    const Database = require("better-sqlite3");
    const db = new Database(dbPath);
    const result = db.prepare("DELETE FROM push_tokens").run();
    console.log(`✅ Deleted ${result.changes} old token(s) from SQLite.`);
    db.close();
  } catch (e) {
    console.log("ℹ️ Could not clear tokens (table may not exist yet).");
  }
} else {
  console.log("ℹ️ No database file found.");
}

// 2. Check if the service worker file exists
const swPath = path.join(process.cwd(), "public", "firebase-messaging-sw.js");
if (fs.existsSync(swPath)) {
  console.log("✅ Service worker file exists:", swPath);
} else {
  console.log("❌ Service worker file MISSING:", swPath);
}

console.log("\n📋 NEXT STEPS (do these manually in the browser):");
console.log("   1. Open DevTools (F12) → Application → Service Workers");
console.log('   2. Find "firebase-messaging-sw.js" and click UNREGISTER');
console.log("   3. Still in DevTools → Application → Storage → Clear site data");
console.log("   4. Close ALL tabs pointing to localhost:3000");
console.log("   5. Restart dev server: npm run dev");
console.log("   6. Open http://localhost:3000/ar (NOT 127.0.0.1)");
console.log("   7. Click Enable Notifications and allow");
