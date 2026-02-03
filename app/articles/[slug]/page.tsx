import { getPosts } from "@/app/actions";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleContent } from "@/components/article/ArticleContent";
import { CommentSection } from "@/components/article/CommentSection";
import { Sidebar } from "@/components/home/Sidebar";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find((p) => p.slug.current === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="layout-container flex flex-col max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <article className="lg:col-span-8 flex flex-col gap-6">
          <ArticleHeader post={post} />
          <ArticleContent post={post} />
          <CommentSection postId={post._id} />
        </article>

        {/* Reusing Sidebar from Home, can be customized or separate component if needed */}
        <Sidebar />
      </div>
    </div>
  );
}
