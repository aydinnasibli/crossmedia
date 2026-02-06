"use server";

import connectDB from "@/lib/db";
import Comment from "@/models/Comment";
import { revalidatePath } from "next/cache";

export async function getAdminComments() {
  try {
    const db = await connectDB();
    if (!db) return [];

    const comments = await Comment.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.error("Error fetching admin comments:", error);
    return [];
  }
}

export async function approveComment(id: string) {
  try {
    const db = await connectDB();
    if (!db) return { success: false, message: "DB Failed" };

    await Comment.findByIdAndUpdate(id, { isApproved: true });
    revalidatePath("/admin/comments");
    revalidatePath("/admin");
    return { success: true, message: "Şərh təsdiqləndi" };
  } catch (error) {
    console.error("Error approving comment:", error);
    return { success: false, message: "Xəta baş verdi" };
  }
}

export async function deleteComment(id: string) {
  try {
    const db = await connectDB();
    if (!db) return { success: false, message: "DB Failed" };

    await Comment.findByIdAndDelete(id);
    revalidatePath("/admin/comments");
    revalidatePath("/admin");
    return { success: true, message: "Şərh silindi" };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { success: false, message: "Xəta baş verdi" };
  }
}
