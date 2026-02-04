"use server";

import connectDB from "@/lib/db";
import Comment from "@/models/Comment";
import Subscriber from "@/models/Subscriber";
import Post from "@/models/Post";

// --- Types ---

export interface PostType {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage: string;
  publishedAt: string;
  category: string;
  author: { name: string; image: string; role: string };
  content?: string;
}

// Alias for backward compatibility if needed, but we should update consumers
export type MockPost = PostType;

// --- Data Fetching ---

export async function getPosts(): Promise<PostType[]> {
  try {
    await connectDB();
    const posts = await Post.find().sort({ publishedAt: -1 });
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostType | null> {
    try {
        await connectDB();
        const post = await Post.findOne({ slug });
        if (!post) return null;
        return JSON.parse(JSON.stringify(post));
    } catch (error) {
        console.error("Error fetching post by slug:", error);
        return null;
    }
}

// --- MongoDB Actions ---

export async function submitComment(postId: string, formData: FormData) {
  try {
    await connectDB();
    const content = formData.get("content") as string;
    // Hardcoded user for now, in real app would come from auth
    const name = "Qonaq İstifadəçi";
    const avatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuABbuG7cHMZv1AKPwkzJIOpcZdD6Lo_c0IkqeuXbXFdDSvXVPBgvJ3votw72Mav_WiSJ4eq6fIlTMBwj47M2ZveowX6ndS5kFo_dFcSn9_mQDyBjuKaFFyPaRIBmeYmraS8mgWJoACge-ZUuXbMdj-EfoRhEqVOJwrkT2zguRxAL_-g5OwcpHtZBvMOGLJJADyN1iVpLoaVhqr_E1FBMpNWxU-pV0Fovwc2FTB06umgQTwj1EgPz2HMTlRmPST3MsnrNCoRp8ef3voA";

    if (!content) return { success: false, message: "Şərh boş ola bilməz" };

    await Comment.create({
      postId,
      name,
      avatar,
      content,
      isApproved: false, // Explicitly pending
    });

    return { success: true, message: "Şərhiniz göndərildi və təsdiq gözləyir." };
  } catch (error) {
    console.error("Error submitting comment:", error);
    return { success: false, message: "Xəta baş verdi" };
  }
}

export async function getComments(postId: string) {
    try {
        await connectDB();
        // Only get approved comments
        const comments = await Comment.find({ postId, isApproved: true }).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(comments));
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
}

export async function subscribeNewsletter(formData: FormData) {
  try {
    await connectDB();
    const email = formData.get("email") as string;

    if (!email) return { success: false, message: "Email daxil edin" };

    // Check if exists
    const existing = await Subscriber.findOne({ email });
    if (existing) {
        return { success: true, message: "Artıq abunə olmusunuz" };
    }

    await Subscriber.create({ email });
    return { success: true, message: "Abunə oldunuz!" };
  } catch (error) {
    console.error("Error subscribing:", error);
    return { success: false, message: "Xəta baş verdi" };
  }
}
