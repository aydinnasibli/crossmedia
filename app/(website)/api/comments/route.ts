import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Comment from "@/models/Comment";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const comments = await Comment.find().sort({ createdAt: -1 });
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
