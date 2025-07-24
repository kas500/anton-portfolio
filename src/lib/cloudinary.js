import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function fetchImagesByCategory(category) {
  const folder = `portfolio/${category}`; 
  const results = await cloudinary.search
    .expression(`folder:${folder}`)
    .sort_by('public_id', 'desc')
    .max_results(50)
    .execute();

  return results.resources.map((file) => ({
    url: file.secure_url,
    id: file.public_id,
    width: file.width,
    height: file.height,
  }));
}
