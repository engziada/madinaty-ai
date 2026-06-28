import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";

export const runtime = "edge"; // neon is edge-compatible

function getSql() {
  const raw = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || "";
  if (!raw) throw new Error("NEON_DATABASE_URL is not set");
  return neon(raw);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "ar" ? "ar" : "en";
  
  try {
    const sql = getSql();
    const result = await sql`
      SELECT content FROM platform_activities 
      WHERE id = ${`hero-${locale}`} 
      LIMIT 1
    `;
    
    if (result.length > 0) {
      return NextResponse.json({ content: result[0].content });
    }
    return NextResponse.json({ content: "" });
  } catch (error) {
    console.error("Activities GET error:", error);
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Check auth
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  
  if (sessionToken !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { contentEn, contentAr } = body;
    
    if (typeof contentEn !== "string" || typeof contentAr !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const sql = getSql();
    
    // Upsert English
    await sql`
      INSERT INTO platform_activities (id, locale, content, updated_at) 
      VALUES ('hero-en', 'en', ${contentEn}, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, updated_at = CURRENT_TIMESTAMP
    `;
    
    // Upsert Arabic
    await sql`
      INSERT INTO platform_activities (id, locale, content, updated_at) 
      VALUES ('hero-ar', 'ar', ${contentAr}, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, updated_at = CURRENT_TIMESTAMP
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Activities POST error:", error);
    return NextResponse.json({ error: "Failed to update activities" }, { status: 500 });
  }
}
