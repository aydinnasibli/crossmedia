import Link from "next/link";
import { MockPost } from "@/app/actions";

interface NewsGridProps {
  posts: MockPost[];
  title?: string;
}

export function NewsGrid({ posts, title = "Gündəm" }: NewsGridProps) {
  return (
    <div className="lg:col-span-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#111318] dark:text-white flex items-center gap-2">
          <span className="w-2 h-8 bg-primary rounded-full"></span>
          {title}
        </h2>
        <Link
          href="#"
          className="text-sm font-semibold text-primary hover:text-blue-700 flex items-center gap-1"
        >
          Hamısına bax{" "}
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "18px" }}
          >
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/articles/${post.slug.current}`}
            className="flex flex-col group"
          >
            <div className="overflow-hidden rounded-lg mb-3 aspect-video bg-gray-100 dark:bg-gray-800">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${post.mainImage.asset.url}')` }}
              ></div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wide">
                  {post.category || "Xəbər"}
                </span>
                <span className="text-xs text-gray-500">• 2 saat əvvəl</span>
              </div>
              <h3 className="text-lg font-bold text-[#111318] dark:text-white leading-tight mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-[#616f89] dark:text-gray-400 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
