import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "bw";

  const folder = `portfolio/${category}`;
  const results = await cloudinary.search
    .expression(`folder:${folder}`)
    .sort_by("public_id", "desc")
    .max_results(50)
    .execute();

  const images = results.resources.map((file) => ({
    url: file.secure_url,
    alt: file.public_id,
  }));

  return NextResponse.json(images);
}
