import Link from "next/link";
import { PostType } from "@/app/actions";
import { format } from "date-fns";

export function ArticleHeader({ post }: { post: PostType }) {
  return (
    <div className="flex flex-col gap-6">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-[#616f89] dark:text-gray-400">
        <Link href="/" className="hover:text-primary transition-colors">
          Ana Səhifə
        </Link>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "12px" }}
        >
          chevron_right
        </span>
        <Link href="#" className="hover:text-primary transition-colors">
          {post.category || "Xəbər"}
        </Link>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "12px" }}
        >
          chevron_right
        </span>
        <span className="text-[#111318] dark:text-white font-medium">
          Məqalə
        </span>
      </nav>

      <header className="flex flex-col gap-4">
        <span className="w-fit px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">
          {post.category || "Xəbər"}
        </span>
        <h1 className="text-[#111318] dark:text-white text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-[1.15] tracking-tight">
          {post.title}
        </h1>
        <p className="text-[#616f89] dark:text-gray-400 text-lg md:text-xl font-normal leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between border-y border-[#f0f2f4] dark:border-gray-800 py-4 mt-2">
          <div className="flex items-center gap-3">
            <div
              className="size-10 rounded-full bg-gray-200 overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage: `url('${
                  post.author?.image ||
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCBIPPlVvRjV4el6HzRbIouevV1t3GK-908hMyw35ZsnSQivytzbW9qSQKJqDm8NHkFpYt0BH-bhq_9zXIgXx2x_BZUx4jdX16W8AW9CvR-INANzYe6n948j-FPPvR-zVPuVwdNrFha6hurcoRHRcGO8_KoYV1EPNVlnI8JmNyJNzk2c-tW12alJl_dEbLEkosMvixKC1swl4aH6eDObtQYhhoFaSgL58Y1KQPX_4CNReKpLceTiKZJiPpj32SalmDS0W2h-03DaAAk"
                }')`,
              }}
            ></div>
            <div className="flex flex-col">
              <span className="text-[#111318] dark:text-white font-bold text-sm">
                {post.author?.name || "Redaksiya heyəti"}
              </span>
              <span className="text-[#616f89] dark:text-gray-400 text-xs">
                {post.author?.role || "Müəllif"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#616f89] dark:text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                calendar_today
              </span>
              <span>{post.publishedAt ? format(new Date(post.publishedAt), "PPP") : "Tarix yoxdur"}</span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                schedule
              </span>
              <span>5 dəq oxu</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
