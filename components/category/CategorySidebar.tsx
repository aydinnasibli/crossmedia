"use client";

import Link from "next/link";
import { subscribeNewsletter, MockPost } from "@/app/actions";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
};

export function CategorySidebar({ trendingPosts = [] }: { trendingPosts?: MockPost[] }) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      const result = await subscribeNewsletter(formData);
      return {
        success: result.success,
        message: result.message || "",
      };
    },
    initialState
  );

  return (
    <aside className="w-full lg:w-[340px] flex flex-col gap-8 shrink-0">
      {/* Newsletter Widget */}
      <div className="rounded-xl p-6 bg-gradient-to-br from-[#135bec]/10 to-[#135bec]/5 border border-primary/20 dark:from-primary/20 dark:to-primary/10">
        <div className="flex items-center gap-3 mb-4 text-primary">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "32px" }}
          >
            mark_email_unread
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#111318] dark:text-white mb-2">
          Bülletenə abunə ol
        </h3>
        <p className="text-sm text-[#616f89] dark:text-gray-300 mb-5 leading-relaxed">
          Həftənin ən vacib siyasi xəbərlərini və eksklüziv təhlillərini
          birbaşa emailinizdə əldə edin.
        </p>
        <form action={formAction} className="flex flex-col gap-3">
          <label className="sr-only">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full h-11 px-4 rounded-lg border border-[#d1d5db] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111318] dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
            placeholder="Email ünvanınız"
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full h-11 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70"
          >
            {isPending ? "Gözləyin..." : "Abunə ol"}
          </button>
          {state.message && (
            <p
              className={`text-xs mt-1 text-center ${
                state.success ? "text-green-600" : "text-red-500"
              }`}
            >
              {state.message}
            </p>
          )}
        </form>
        <p className="text-xs text-[#616f89] dark:text-gray-500 mt-3 text-center">
          Spam göndərmirik, istənilən vaxt ayrıla bilərsiniz.
        </p>
      </div>

      {/* Trends Widget */}
      <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#f0f2f4] dark:border-gray-800 shadow-sm p-5">
        <div className="flex items-center justify-between mb-5 border-b border-[#f0f2f4] dark:border-gray-700 pb-3">
          <h3 className="text-lg font-bold text-[#111318] dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              trending_up
            </span>
            Həftənin Trendləri
          </h3>
        </div>
        <div className="flex flex-col gap-5">
          {trendingPosts.length === 0 ? (
             <div className="text-sm text-gray-400">Trend xəbər yoxdur.</div>
          ) : (
            trendingPosts.map((post, idx) => (
              <Link key={post._id} href={`/articles/${post.slug}`} className="group flex gap-4 items-start">
                <span className="text-3xl font-black text-[#e5e7eb] dark:text-gray-700 leading-none mt-[-4px] group-hover:text-primary transition-colors">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wide mb-1 block">
                    {post.category || "Xəbər"}
                  </span>
                  <h4 className="text-sm font-bold text-[#111318] dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Sticky Ad */}
      <div className="sticky top-24 w-full aspect-square bg-[#f0f2f4] dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center text-[#616f89] dark:text-gray-500 border border-dashed border-gray-300 dark:border-gray-700">
        <span className="text-xs font-bold uppercase tracking-widest mb-2">
          Reklam
        </span>
        <span
          className="material-symbols-outlined text-4xl opacity-50"
          style={{ fontSize: "48px" }}
        >
          ad_units
        </span>
      </div>
    </aside>
  );
}
