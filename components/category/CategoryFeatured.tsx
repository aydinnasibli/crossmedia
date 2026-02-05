import Link from "next/link";
import { MockPost } from "@/app/actions";
import { format } from "date-fns";

export function CategoryFeatured({ post }: { post: MockPost }) {
  if (!post) return null;

  return (
    <Link href={`/articles/${post.slug}`}>
      <article className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9] rounded-2xl overflow-hidden group cursor-pointer shadow-md mb-10">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${post.mainImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
              Əsas Xəbər
            </span>
            <span className="text-gray-300 text-xs font-medium flex items-center gap-1">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "16px" }}
              >
                schedule
              </span>{" "}
              {format(new Date(post.publishedAt), "HH:mm")}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight group-hover:underline decoration-2 underline-offset-4">
            {post.title}
          </h2>
          <p className="text-gray-200 text-sm md:text-base line-clamp-2 md:line-clamp-3 max-w-3xl opacity-90">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
