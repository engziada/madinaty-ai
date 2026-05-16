const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(process.cwd(), "data", "madinaty.db");
const db = new Database(dbPath);

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS push_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT NOT NULL UNIQUE,
      locale TEXT DEFAULT 'ar',
      platform TEXT,
      os TEXT,
      browser TEXT,
      screen_size TEXT,
      user_agent TEXT,
      referrer TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_push_tokens_locale ON push_tokens(locale);
    CREATE INDEX IF NOT EXISTS idx_push_tokens_platform ON push_tokens(platform);
  `);
  console.log("✅ push_tokens table created or already exists.");
} catch (err) {
  console.error("❌ Migration failed:", err.message);
  process.exit(1);
} finally {
  db.close();
}
