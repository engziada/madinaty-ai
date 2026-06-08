import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "images", "gallery");

    // Check if directory exists
    if (!fs.existsSync(galleryDir)) {
      return NextResponse.json({ photos: [] });
    }

    const files = await fs.promises.readdir(galleryDir);

    // Filter for image formats
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".avif"];
    const validFiles = files.filter((file) => imageExtensions.includes(path.extname(file).toLowerCase()));

    // Randomize and pick 10
    const shuffledFiles = validFiles.sort(() => 0.5 - Math.random()).slice(0, 10);

    const images = shuffledFiles.map((file) => ({
      src: `/images/gallery/${file}`,
      name: file,
    }));

    return NextResponse.json(
      { photos: images },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Error reading gallery folder:", error);
    return NextResponse.json({ error: "Failed to read gallery folder" }, { status: 500 });
  }
}
