import Link from "next/link";
import { MockPost } from "@/app/actions";
import { format } from "date-fns";
import { az } from "date-fns/locale";

export function CategoryList({ posts }: { posts: MockPost[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/articles/${post.slug}`}
            className="flex flex-col group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl aspect-[3/2] mb-4">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${post.mainImage}')` }}
              ></div>
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-[#111318] dark:text-white">
                {post.category || "Xəbər"}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-[#616f89] dark:text-gray-500">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "14px" }}
                >
                  calendar_today
                </span>
                <span>
                  {format(new Date(post.publishedAt), "d MMMM, yyyy", { locale: az })}
                </span>
                <span>•</span>
                <span>{format(new Date(post.publishedAt), "HH:mm")}</span>
              </div>
              <h3 className="text-lg font-bold text-[#111318] dark:text-white leading-snug group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-[#616f89] dark:text-gray-400 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center">
        <button className="group flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-[#e5e7eb] dark:border-gray-700 rounded-lg text-[#111318] dark:text-white font-medium hover:bg-[#f6f6f8] dark:hover:bg-gray-700 transition-all shadow-sm">
          <span>Daha çox göstər</span>
          <span className="material-symbols-outlined transition-transform group-hover:translate-y-1">
            expand_more
          </span>
        </button>
      </div>
    </>
  );
}
