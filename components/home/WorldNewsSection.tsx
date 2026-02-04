import Link from "next/link";
import { MockPost } from "@/app/actions";

interface WorldNewsSectionProps {
  posts: MockPost[];
}

export function WorldNewsSection({ posts }: WorldNewsSectionProps) {
  if (!posts || posts.length === 0) return null;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 4);

  return (
    <div className="border-t border-[#f0f2f4] dark:border-gray-800 pt-8 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#111318] dark:text-white flex items-center gap-2">
          <span className="w-2 h-8 bg-purple-600 rounded-full"></span>
          Dünya
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <Link
          href={`/articles/${mainPost.slug}`}
          className="flex-1 group cursor-pointer"
        >
          <div className="overflow-hidden rounded-lg mb-3 h-48 bg-gray-100 dark:bg-gray-800">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${mainPost.mainImage}')` }}
            ></div>
          </div>
          <h3 className="text-lg font-bold text-[#111318] dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
            {mainPost.title}
          </h3>
          <p className="text-sm text-[#616f89] dark:text-gray-400 line-clamp-3">
            {mainPost.excerpt}
          </p>
        </Link>
        <div className="flex-1 flex flex-col gap-4">
          {sidePosts.map((post) => (
            <Link
              key={post._id}
              href={`/articles/${post.slug}`}
              className="flex gap-4 group cursor-pointer"
            >
              <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform"
                  style={{ backgroundImage: `url('${post.mainImage}')` }}
                ></div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#111318] dark:text-white line-clamp-2 mb-1 group-hover:text-purple-600">
                  {post.title}
                </h4>
                <span className="text-xs text-gray-500">14:20</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
