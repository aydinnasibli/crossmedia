import { getPosts } from "@/app/actions";
import { NewsGrid } from "@/components/home/NewsGrid";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q || "";

  const allPosts = await getPosts();

  const filteredPosts = allPosts.filter(post => {
      const lowerQuery = query.toLowerCase();
      return (
          post.title.toLowerCase().includes(lowerQuery) ||
          post.excerpt.toLowerCase().includes(lowerQuery) ||
          (post.category && post.category.toLowerCase().includes(lowerQuery))
      );
  });

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <div className="mb-8 border-b border-[#f0f2f4] dark:border-gray-800 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-[#111318] dark:text-white">
            Axtarış nəticələri
          </h1>
          <p className="text-[#616f89] dark:text-gray-400 mt-2 text-lg">
             "{query}" sorğusu üzrə {filteredPosts.length} nəticə tapıldı.
          </p>
       </div>

       {filteredPosts.length > 0 ? (
           <NewsGrid posts={filteredPosts} title="Nəticələr" />
       ) : (
           <div className="py-20 text-center">
               <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">Heç nə tapılmadı</h3>
               <p className="text-gray-500 mt-2">Zəhmət olmasa, başqa açar sözlərlə yenidən cəhd edin.</p>
           </div>
       )}
    </div>
  );
}
