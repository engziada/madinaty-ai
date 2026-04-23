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
