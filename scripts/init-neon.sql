-- Neon Postgres init script for Madinaty AI
-- Run this in your Neon SQL editor or via psql

CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_created ON registrations(created_at);

CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email, city)
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

CREATE TABLE IF NOT EXISTS push_tokens (
  id SERIAL PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  locale TEXT DEFAULT 'ar',
  platform TEXT,
  os TEXT,
  browser TEXT,
  screen_size TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_push_tokens_locale ON push_tokens(locale);
CREATE INDEX IF NOT EXISTS idx_push_tokens_platform ON push_tokens(platform);
