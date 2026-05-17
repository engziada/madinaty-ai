import { neon } from "@neondatabase/serverless";

let sqlInstance: ReturnType<typeof neon> | null = null;

function clean(v: string | undefined): string | undefined {
  if (!v) return v;
  return v
    .replace(/\r/g, "")
    .replace(/\n/g, "")
    .trim()
    .replace(/^['"]|['"]$/g, "");
}

function getSql() {
  if (sqlInstance) return sqlInstance;
  const raw = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || "";
  const DATABASE_URL = clean(raw);
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL or NEON_DATABASE_URL is required");
  }
  sqlInstance = neon(DATABASE_URL);
  return sqlInstance;
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

export async function insertRegistration(data: RegistrationData) {
  const result = (await getSql()`
    INSERT INTO registrations (
      name, email, phone, role, district, interests, message,
      gender, group_no, building_no, apartment_no, locale
    ) VALUES (
      ${data.name ?? null},
      ${data.email ?? null},
      ${data.phone ?? null},
      ${data.role ?? "Resident"},
      ${data.district ?? null},
      ${data.interests ?? null},
      ${data.message ?? null},
      ${data.gender ?? null},
      ${data.group_no ?? null},
      ${data.building_no ?? null},
      ${data.apartment_no ?? null},
      ${data.locale ?? "en"}
    )
    RETURNING id
  `) as any[];
  return { lastInsertRowid: result[0]?.id ?? 0 };
}

export async function getRegistrations(limit = 100) {
  return await getSql()`SELECT * FROM registrations ORDER BY created_at DESC LIMIT ${limit}`;
}

export interface WaitlistData {
  email: string;
  city: string;
  locale?: string;
}

export async function insertWaitlist(data: WaitlistData) {
  await getSql()`
    INSERT INTO waitlist (email, city, locale)
    VALUES (${data.email}, ${data.city}, ${data.locale ?? "en"})
    ON CONFLICT (email, city) DO UPDATE SET created_at = CURRENT_TIMESTAMP
  `;
}

export async function getWaitlist(limit = 100) {
  return await getSql()`SELECT * FROM waitlist ORDER BY created_at DESC LIMIT ${limit}`;
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

export async function upsertPushToken(data: PushTokenData) {
  await getSql()`
    INSERT INTO push_tokens (
      token, locale, platform, os, browser, screen_size, user_agent, referrer
    ) VALUES (
      ${data.token},
      ${data.locale ?? "ar"},
      ${data.platform ?? null},
      ${data.os ?? null},
      ${data.browser ?? null},
      ${data.screen_size ?? null},
      ${data.user_agent ?? null},
      ${data.referrer ?? null}
    )
    ON CONFLICT (token) DO UPDATE SET
      locale = EXCLUDED.locale,
      platform = EXCLUDED.platform,
      os = EXCLUDED.os,
      browser = EXCLUDED.browser,
      screen_size = EXCLUDED.screen_size,
      user_agent = EXCLUDED.user_agent,
      referrer = EXCLUDED.referrer,
      updated_at = CURRENT_TIMESTAMP
  `;
}

export async function deletePushToken(token: string) {
  await getSql()`DELETE FROM push_tokens WHERE token = ${token}`;
}

export async function getPushTokenCount() {
  const result = (await getSql()`SELECT COUNT(*)::int as count FROM push_tokens`) as any[];
  return result[0]?.count ?? 0;
}

export async function getPushTokensByLocale(locale: string, limit = 1000) {
  return await getSql()`SELECT * FROM push_tokens WHERE locale = ${locale} ORDER BY created_at DESC LIMIT ${limit}`;
}

export async function getAllPushTokens(limit = 10000) {
  return await getSql()`SELECT * FROM push_tokens ORDER BY created_at DESC LIMIT ${limit}`;
}
