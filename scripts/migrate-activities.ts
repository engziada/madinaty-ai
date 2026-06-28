import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function migrate() {
  const sql = neon(process.env.NEON_DATABASE_URL || process.env.DATABASE_URL!);
  
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS platform_activities (
        id TEXT PRIMARY KEY,
        locale TEXT NOT NULL,
        content TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Created table platform_activities");

    await sql`
      CREATE TABLE IF NOT EXISTS admin_otp (
        id SERIAL PRIMARY KEY,
        phone TEXT NOT NULL,
        otp TEXT NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Created table admin_otp");
    
    // Seed default content if not exists
    const existing = await sql`SELECT count(*) FROM platform_activities`;
    if (existing[0].count === "0" || existing[0].count === 0) {
      await sql`
        INSERT INTO platform_activities (id, locale, content) VALUES
        ('hero-en', 'en', 'Welcome to Madinaty AI! This is a placeholder for recent activities.'),
        ('hero-ar', 'ar', 'مرحباً بك في مدينتي الذكية! هذه مساحة مخصصة للأنشطة الحديثة.');
      `;
      console.log("Seeded platform_activities");
    }

    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrate();
