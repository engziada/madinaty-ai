import Database from "better-sqlite3";
import { join } from "path";

const dbPath = join(process.cwd(), "data", "madinaty.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    initTables();
  }
  return db;
}

function initTables() {
  if (!db) return;
  db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'Resident',
      district TEXT,
      interests TEXT,
      message TEXT,
      gender TEXT,
      group_no TEXT,
      building_no TEXT,
      apartment_no TEXT,
      locale TEXT DEFAULT 'en',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
    CREATE INDEX IF NOT EXISTS idx_registrations_created ON registrations(created_at);

    CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      city TEXT NOT NULL,
      locale TEXT DEFAULT 'en',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(email, city)
    );
    CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
  `);

  // Best-effort additive migrations for older DBs that predate the new columns.
  const addColumn = (sql: string) => {
    try {
      db!.exec(sql);
    } catch {
      /* ignore: column already exists */
    }
  };
  addColumn("ALTER TABLE registrations ADD COLUMN gender TEXT");
  addColumn("ALTER TABLE registrations ADD COLUMN group_no TEXT");
  addColumn("ALTER TABLE registrations ADD COLUMN building_no TEXT");
  addColumn("ALTER TABLE registrations ADD COLUMN apartment_no TEXT");

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
}

export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  role: string;
  district?: string | null;
  interests?: string | null;
  message?: string | null;
  gender?: string | null;
  group_no?: string | null;
  building_no?: string | null;
  apartment_no?: string | null;
  locale?: string;
}

export function insertRegistration(data: RegistrationData) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO registrations (
      name, email, phone, role, district, interests, message,
      gender, group_no, building_no, apartment_no, locale
    ) VALUES (
      @name, @email, @phone, @role, @district, @interests, @message,
      @gender, @group_no, @building_no, @apartment_no, @locale
    )
  `);
  return stmt.run({
    district: null,
    interests: null,
    message: null,
    gender: null,
    group_no: null,
    building_no: null,
    apartment_no: null,
    locale: "en",
    ...data,
  });
}

export function getRegistrations(limit = 100) {
  const db = getDb();
  return db.prepare("SELECT * FROM registrations ORDER BY created_at DESC LIMIT ?").all(limit);
}

export interface WaitlistData {
  email: string;
  city: string;
  locale?: string;
}

export function insertWaitlist(data: WaitlistData) {
  const db = getDb();
  // Upsert on (email, city) to keep the UX idempotent.
  const stmt = db.prepare(`
    INSERT INTO waitlist (email, city, locale)
    VALUES (@email, @city, @locale)
    ON CONFLICT(email, city) DO UPDATE SET created_at = CURRENT_TIMESTAMP
  `);
  return stmt.run({ locale: "en", ...data });
}

export function getWaitlist(limit = 100) {
  const db = getDb();
  return db.prepare("SELECT * FROM waitlist ORDER BY created_at DESC LIMIT ?").all(limit);
}

/* ------------------------------------------------------------------ */
// Push notification tokens

export interface PushTokenData {
  token: string;
  locale?: string;
  platform?: string;
  os?: string;
  browser?: string;
  screen_size?: string;
  user_agent?: string;
  referrer?: string;
}

export function upsertPushToken(data: PushTokenData) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO push_tokens (token, locale, platform, os, browser, screen_size, user_agent, referrer)
    VALUES (@token, @locale, @platform, @os, @browser, @screen_size, @user_agent, @referrer)
    ON CONFLICT(token) DO UPDATE SET
      locale = excluded.locale,
      platform = excluded.platform,
      os = excluded.os,
      browser = excluded.browser,
      screen_size = excluded.screen_size,
      user_agent = excluded.user_agent,
      referrer = excluded.referrer,
      updated_at = CURRENT_TIMESTAMP
  `);
  return stmt.run({
    locale: "ar",
    platform: null,
    os: null,
    browser: null,
    screen_size: null,
    user_agent: null,
    referrer: null,
    ...data,
  });
}

export function deletePushToken(token: string) {
  const db = getDb();
  return db.prepare("DELETE FROM push_tokens WHERE token = ?").run(token);
}

export function getPushTokenCount() {
  const db = getDb();
  const row = db.prepare("SELECT COUNT(*) as count FROM push_tokens").get() as { count: number } | undefined;
  return row?.count ?? 0;
}

export function getPushTokensByLocale(locale: string, limit = 1000) {
  const db = getDb();
  return db.prepare("SELECT * FROM push_tokens WHERE locale = ? ORDER BY created_at DESC LIMIT ?").all(locale, limit);
}

export function getAllPushTokens(limit = 10000) {
  const db = getDb();
  return db.prepare("SELECT * FROM push_tokens ORDER BY created_at DESC LIMIT ?").all(limit);
}
