const { neon } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

const dbUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("NEON_DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const sql = neon(dbUrl);

async function main() {
  try {
    console.log("Connecting to database to remove Khemet hero links...");
    const result = await sql`DELETE FROM platform_activities WHERE id IN ('hero-ar', 'hero-en') RETURNING *`;
    console.log(`Deleted ${result.length} rows.`);
    console.log("Success! Hero panel will now fall back to the dynamic 5-course markdown.");
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

main();
