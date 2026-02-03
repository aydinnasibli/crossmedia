import Link from "next/link";
import { MockPost } from "@/app/actions";

interface HeroSectionProps {
  featuredPost: MockPost;
  sidePosts: MockPost[];
}

export function HeroSection({ featuredPost, sidePosts }: HeroSectionProps) {
  if (!featuredPost) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
      {/* Main Hero Article (8 cols) */}
      <div className="lg:col-span-8 group cursor-pointer">
        <Link href={`/articles/${featuredPost.slug.current}`}>
          <div className="relative h-[480px] w-full rounded-xl overflow-hidden bg-gray-200">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${featuredPost.mainImage.asset.url}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
              <span className="inline-block bg-primary text-white text-xs font-bold px-2.5 py-1 rounded mb-3">
                {featuredPost.category || "Xəbər"}
              </span>
              <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-2 group-hover:underline decoration-2 underline-offset-4">
                {featuredPost.title}
              </h2>
              <p className="text-gray-300 text-sm md:text-base hidden sm:block max-w-2xl line-clamp-2">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 mt-4 text-gray-400 text-xs font-medium">
                <span className="flex items-center gap-1">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                  >
                    schedule
                  </span>{" "}
                  1 saat əvvəl
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                  >
                    visibility
                  </span>{" "}
                  12.5k baxış
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Side Hero Articles (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {sidePosts.map((post, idx) => (
          <Link
            key={post._id}
            href={`/articles/${post.slug.current}`}
            className="flex-1 relative rounded-xl overflow-hidden group cursor-pointer min-h-[200px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${post.mainImage.asset.url}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-5">
              <span
                className={`inline-block text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2 ${
                  idx === 0 ? "bg-blue-500" : "bg-green-600"
                }`}
              >
                {post.category || "Xəbər"}
              </span>
              <h3 className="text-white text-lg font-bold leading-snug group-hover:text-blue-200 transition-colors">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
