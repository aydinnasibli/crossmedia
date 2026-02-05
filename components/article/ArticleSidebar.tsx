import Link from "next/link";
import { MockPost } from "@/app/actions";

export function ArticleSidebar({ similarPosts = [] }: { similarPosts?: MockPost[] }) {
  return (
    <aside className="lg:col-span-4 flex flex-col gap-10">
      {/* Ad Placeholder */}
      <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-gray-400 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
        <span className="text-xs uppercase tracking-widest mb-1">Reklam</span>
        <span className="text-sm font-medium">300x250</span>
      </div>

      {/* Popular Tags */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-l-4 border-primary pl-3">
          <h3 className="text-xl font-bold text-[#111318] dark:text-white">
            Populyar Teqlər
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {["#Qarabağ", "#Futbol", "#Rəqəmsal", "#Təhsil", "#Neft", "#COP29", "#Bank"].map((tag, i) => (
             <Link
                key={tag}
                href="#"
                className={`px-3 py-2 border rounded-lg text-sm font-medium transition-all ${
                    i === 2
                    ? "bg-primary text-white border-primary hover:bg-blue-700"
                    : "bg-white border-[#f0f2f4] dark:bg-[#1A202C] dark:border-gray-800 dark:text-gray-300 hover:border-primary hover:text-primary"
                }`}
              >
                {tag}
              </Link>
          ))}
        </div>
      </div>

      {/* Similar News */}
      <div className="flex flex-col gap-5 sticky top-24">
        <div className="flex items-center justify-between border-b border-[#f0f2f4] dark:border-gray-800 pb-3">
          <h3 className="text-xl font-bold text-[#111318] dark:text-white">
            Oxşar Xəbərlər
          </h3>
          <Link
            href="#"
            className="text-xs font-bold text-primary uppercase tracking-wide"
          >
            Hamısına bax
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          {similarPosts.length === 0 ? (
             <div className="text-sm text-gray-500">Oxşar xəbər yoxdur.</div>
          ) : (
            similarPosts.map((post) => (
              <Link key={post._id} href={`/articles/${post.slug}`} className="group flex gap-4 items-start">
                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url('${post.mainImage}')` }}
                  ></div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-primary">
                    {post.category || "Xəbər"}
                  </span>
                  <h4 className="text-sm font-bold text-[#111318] dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <span className="text-xs text-[#616f89] mt-1">2 saat əvvəl</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
