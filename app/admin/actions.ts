"use server";

import connectDB from "@/lib/db";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import Subscriber from "@/models/Subscriber";
import { revalidatePath } from "next/cache";

export async function getAdminStats() {
  try {
    const db = await connectDB();
    if (!db) return { views: 0, posts: 0, comments: 0, subscribers: 0 };

    const postsCount = await Post.countDocuments();
    const commentsCount = await Comment.countDocuments();
    const subscribersCount = await Subscriber.countDocuments();

    // Calculate total views
    const posts = await Post.find({}, { views: 1 });
    const views = posts.reduce((acc, post) => acc + (post.views || 0), 0);

    return {
      views,
      posts: postsCount,
      comments: commentsCount,
      subscribers: subscribersCount,
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return { views: 0, posts: 0, comments: 0, subscribers: 0 };
  }
}

export async function getSubscribers() {
  try {
    const db = await connectDB();
    if (!db) return [];

    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(subscribers));
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
}

export async function deleteSubscriber(id: string) {
  try {
    const db = await connectDB();
    if (!db) return { success: false, message: "Database connection failed" };

    await Subscriber.findByIdAndDelete(id);
    revalidatePath("/admin/subscribers");
    revalidatePath("/admin"); // Update stats on dashboard
    return { success: true, message: "Subscriber deleted" };
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return { success: false, message: "Error deleting subscriber" };
  }
}
