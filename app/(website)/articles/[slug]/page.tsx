import { getPostBySlug, getRelatedPosts, getComments, incrementViews } from "@/app/actions";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleContent } from "@/components/article/ArticleContent";
import { ArticleSidebar } from "@/components/article/ArticleSidebar";
import { CommentSection } from "@/components/article/CommentSection";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const post = await getPostBySlug(decodedSlug);

  if (!post) {
    notFound();
  }

  // Increment views
  await incrementViews(decodedSlug);

  // Fetch related
  const relatedPosts = await getRelatedPosts(post.category, post._id);
  const comments = await getComments(post._id);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <article className="lg:col-span-8 flex flex-col gap-6">
          <ArticleHeader post={post} />
          <ArticleContent post={post} />
          <CommentSection postId={post._id} comments={comments} />
        </article>
        <ArticleSidebar similarPosts={relatedPosts} />
      </div>
    </div>
  );
}
