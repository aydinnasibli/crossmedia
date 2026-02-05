import { getPosts, getPostsByCategory } from "@/app/actions";
import { CategoryHeader } from "@/components/category/CategoryHeader";
import { CategoryFeatured } from "@/components/category/CategoryFeatured";
import { CategoryList } from "@/components/category/CategoryList";
import { CategorySidebar } from "@/components/category/CategorySidebar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  // Decode slug because it might be "Siyas%C9%99t"
  const decodedSlug = decodeURIComponent(slug);

  const categoryPosts = await getPostsByCategory(decodedSlug);
  const allPosts = await getPosts();
  const trendingPosts = [...allPosts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  const featuredPost = categoryPosts.length > 0 ? categoryPosts[0] : null;
  const listPosts = categoryPosts.length > 1 ? categoryPosts.slice(1) : [];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CategoryHeader title={decodedSlug} />

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 w-full min-w-0">
          {featuredPost ? (
            <>
              <CategoryFeatured post={featuredPost} />
              <CategoryList posts={listPosts} />
            </>
          ) : (
            <div className="p-10 text-center text-gray-500 bg-white dark:bg-gray-800 rounded-xl">
              Bu kateqoriyada hələlik xəbər yoxdur.
            </div>
          )}
        </div>
        <CategorySidebar trendingPosts={trendingPosts} />
      </div>
    </div>
  );
}
