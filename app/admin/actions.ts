"use server";

import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createPost(formData: FormData) {
  try {
    await connectDB();

    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const authorName = formData.get("authorName") as string;
    const authorRole = formData.get("authorRole") as string;
    const authorImage = formData.get("authorImage") as string;
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
        return { success: false, message: "Image is required" };
    }

    // Convert file to base64 or buffer to upload
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "news-platform" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const mainImage = uploadResult.secure_url;

    // Generate slug
    // Transliterate specific Azeri characters if needed, or just basic
    // For now simple replacement
    let slug = title.toLowerCase()
        .replace(/ə/g, "e")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ü/g, "u")
        .replace(/ğ/g, "g")
        .replace(/ç/g, "c")
        .replace(/ş/g, "s")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    // Ensure uniqueness (basic check)
    let counter = 1;
    let originalSlug = slug;
    while (await Post.findOne({ slug })) {
        slug = `${originalSlug}-${counter}`;
        counter++;
    }

    await Post.create({
      title,
      slug,
      excerpt,
      content,
      mainImage,
      category,
      author: {
        name: authorName,
        role: authorRole,
        image: authorImage,
      },
      publishedAt: new Date(),
    });

    revalidatePath("/");
    return { success: true };

  } catch (error) {
    console.error("Create Post Error:", error);
    return { success: false, message: "Failed to create post" };
  }
}

export async function getPendingComments() {
    await connectDB();
    const comments = await Comment.find({ isApproved: false }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(comments));
}

export async function approveComment(commentId: string) {
    await connectDB();
    await Comment.findByIdAndUpdate(commentId, { isApproved: true });
    revalidatePath("/admin/comments");
}

export async function denyComment(commentId: string) {
    await connectDB();
    await Comment.findByIdAndDelete(commentId);
    revalidatePath("/admin/comments");
}
