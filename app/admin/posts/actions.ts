"use server";

import connectDB from "@/lib/db";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/cloudinary";

export async function createPost(formData: FormData) {
  try {
    const db = await connectDB();
    if (!db) return { success: false, message: "DB Connection failed" };

    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    const authorName = formData.get("authorName") as string;
    const authorRole = formData.get("authorRole") as string;
    const authorImage = formData.get("authorImage") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !category || !content) {
      return { success: false, message: "All fields are required" };
    }

    let mainImage = "";
    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) {
          mainImage = uploadedUrl;
      } else {
          return { success: false, message: "Main Image upload failed" };
      }
    } else {
      return { success: false, message: "Main Image is required" };
    }

    // Generate Slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newPost = new Post({
      title,
      slug,
      excerpt,
      category,
      content,
      mainImage,
      author: {
        name: authorName,
        role: authorRole,
        image: authorImage,
      },
      publishedAt: new Date(),
      views: 0,
    });

    await newPost.save();

    revalidatePath("/admin/posts");
    revalidatePath("/");

    return { success: true, message: "Post created successfully" };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, message: "Failed to create post" };
  }
}

export async function updatePost(id: string, formData: FormData) {
  try {
    const db = await connectDB();
    if (!db) return { success: false, message: "DB Connection failed" };

    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    const authorName = formData.get("authorName") as string;
    const authorRole = formData.get("authorRole") as string;
    const authorImage = formData.get("authorImage") as string;
    const imageFile = formData.get("image") as File;

    const updateData: any = {
      title,
      excerpt,
      category,
      content,
      author: {
        name: authorName,
        role: authorRole,
        image: authorImage,
      },
    };

    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) {
          updateData.mainImage = uploadedUrl;
      }
    }

    await Post.findByIdAndUpdate(id, updateData);

    revalidatePath("/admin/posts");
    revalidatePath("/");

    return { success: true, message: "Post updated successfully" };
  } catch (error) {
    console.error("Error updating post:", error);
    return { success: false, message: "Failed to update post" };
  }
}

export async function deletePost(id: string) {
  try {
    const db = await connectDB();
    if (!db) return { success: false, message: "DB Connection failed" };

    await Post.findByIdAndDelete(id);

    revalidatePath("/admin/posts");
    revalidatePath("/");

    return { success: true, message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, message: "Failed to delete post" };
  }
}

export async function getPost(id: string) {
    try {
        const db = await connectDB();
        if (!db) return null;

        const post = await Post.findById(id);
        if (!post) return null;

        return JSON.parse(JSON.stringify(post));
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}
