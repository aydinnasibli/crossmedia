import Link from "next/link";
import { MockPost } from "@/app/actions";

export function ArticleContent({ post }: { post: MockPost }) {
  if (!post) return null;

  return (
    <>
      <figure className="w-full mt-6">
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative shadow-sm">
          <img
            alt={post.title}
            className="w-full h-full object-cover"
            src={post.mainImage}
          />
        </div>
        <figcaption className="mt-2 text-sm text-[#616f89] dark:text-gray-500 italic text-center">
          Foto: {post.category} - Crossmedia
        </figcaption>
      </figure>

      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-[#111318] dark:text-gray-200 font-body leading-loose mt-8 rich-text">
         {/* If content is HTML, render it. If not, paragraphs. */}
         {post.content ? (
             <div dangerouslySetInnerHTML={{ __html: post.content }} />
         ) : (
             <>
                <p className="mb-6">
                  {post.excerpt} {post.excerpt}
                </p>
                <p className="mb-6">
                   Burada məqalənin əsas mətni yer alacaq. (Demo məzmun)
                </p>
                <h3 className="text-2xl font-bold text-[#111318] dark:text-white mt-8 mb-4 font-display">
                    Ətraflı İzah
                </h3>
                <p className="mb-6">
                   Mövzu ilə bağlı ətraflı məlumatlar və ekspert rəyləri burada qeyd olunur.
                </p>
                <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl font-medium text-gray-800 dark:text-gray-200 bg-background-light dark:bg-gray-800/50 rounded-r-lg">
                    "Bu, mövzu haqqında vacib bir sitatdır və diqqət çəkmək üçün buradadır."
                </blockquote>
             </>
         )}
      </div>

      <div className="border-t border-[#f0f2f4] dark:border-gray-800 pt-8 mt-4">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-sm font-bold text-[#111318] dark:text-white mr-2 flex items-center">
              Teqlər:
            </span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href="#"
                className="px-3 py-1 bg-[#f0f2f4] dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm text-[#616f89] dark:text-gray-300 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f8f9fa] dark:bg-gray-800/50 p-6 rounded-xl">
          <h4 className="font-bold text-[#111318] dark:text-white">
            Bu xəbəri paylaş:
          </h4>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                share
              </span>
              Facebook
            </button>
            <button className="flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                post
              </span>
              Twitter
            </button>
            <button className="flex items-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                chat
              </span>
              WhatsApp
            </button>
            <button
              className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-[#111318] dark:text-white size-9 rounded-lg transition-colors"
              title="Kopyala"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                link
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
