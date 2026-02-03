import { getPosts } from "./actions";
import { BreakingNews } from "@/components/home/BreakingNews";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsGrid } from "@/components/home/NewsGrid";
import { Sidebar } from "@/components/home/Sidebar";

export default async function Home() {
  const posts = await getPosts();

  // For demo, we split the posts
  const featuredPost = posts[0];
  const sidePosts = posts.slice(1, 3);
  const gridPosts = posts.slice(3); // or reuse posts for demo

  return (
    <>
      <BreakingNews />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection featuredPost={featuredPost} sidePosts={sidePosts} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <NewsGrid posts={gridPosts} />
          <Sidebar />
        </div>
      </div>
    </>
  );
}
