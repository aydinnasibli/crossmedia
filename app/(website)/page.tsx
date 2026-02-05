import { getPosts, getPostsByCategory } from "@/app/actions";
import { BreakingNews } from "@/components/home/BreakingNews";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsGrid } from "@/components/home/NewsGrid";
import { WorldNewsSection } from "@/components/home/WorldNewsSection";
import { HomeSidebar } from "@/components/home/HomeSidebar";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await getPosts();

  // Fallback if no posts
  if (!posts || posts.length === 0) {
      return <div className="p-8 text-center">No posts found. Please seed the database.</div>;
  }

  const featuredPost = posts[0];
  const sidePosts = posts.slice(1, 3);
  const gridPosts = posts.slice(3, 7);

  // Try to find real World news, otherwise fallback
  let worldPosts = await getPostsByCategory("Dünya");
  if (!worldPosts || worldPosts.length === 0) {
      worldPosts = posts.slice(7, 11);
  } else {
      worldPosts = worldPosts.slice(0, 4);
  }

  // Sidebar Data
  const latestPosts = posts.slice(0, 5);
  // Sort by views safely
  const popularPosts = [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  return (
    <>
      <BreakingNews posts={latestPosts} />
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
        <HeroSection featuredPost={featuredPost} sidePosts={sidePosts} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8">
            <NewsGrid posts={gridPosts} />
            <WorldNewsSection posts={worldPosts} />
          </div>
          <HomeSidebar latestPosts={latestPosts} popularPosts={popularPosts} />
        </div>
      </div>
    </>
  );
}
