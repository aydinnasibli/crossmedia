"use client";

import { useState } from "react";
import Link from "next/link";
import { CurrencyWidget } from "@/components/widgets/CurrencyWidget";
import { MockPost } from "@/app/actions";
import { format } from "date-fns";

interface HomeSidebarProps {
  latestPosts?: MockPost[];
  popularPosts?: MockPost[];
}

export function HomeSidebar({ latestPosts = [], popularPosts = [] }: HomeSidebarProps) {
  const [activeTab, setActiveTab] = useState<"latest" | "popular">("latest");

  const postsToShow = activeTab === "latest" ? latestPosts : popularPosts;

  return (
    <aside className="lg:col-span-4 space-y-8">
      {/* Latest / Most Read Tabs */}
      <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#f0f2f4] dark:border-gray-800 p-5 shadow-sm">
        <div className="flex border-b border-[#f0f2f4] dark:border-gray-700 mb-4">
          <button
            onClick={() => setActiveTab("latest")}
            className={`flex-1 pb-3 text-sm font-bold transition-colors border-b-2 ${
              activeTab === "latest"
                ? "text-primary border-primary"
                : "text-[#616f89] dark:text-gray-400 hover:text-[#111318] dark:hover:text-white border-transparent"
            }`}
          >
            Son Xəbərlər
          </button>
          <button
            onClick={() => setActiveTab("popular")}
            className={`flex-1 pb-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "popular"
                ? "text-primary border-primary"
                : "text-[#616f89] dark:text-gray-400 hover:text-[#111318] dark:hover:text-white border-transparent"
            }`}
          >
            Ən Çox Oxunan
          </button>
        </div>
        <div className="space-y-4">
          {postsToShow.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-4">Xəbər tapılmadı.</div>
          ) : (
            postsToShow.map((post, i) => (
              <div key={post._id} className="contents">
                <Link className="flex gap-3 group items-start" href={`/articles/${post.slug}`}>
                  <span className="text-xs font-medium text-gray-400 mt-1">
                    {format(new Date(post.publishedAt), "HH:mm")}
                  </span>
                  <h3 className="text-sm font-medium text-[#111318] dark:text-white group-hover:text-primary leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                {i < postsToShow.length - 1 && (
                  <div className="border-b border-dashed border-gray-100 dark:border-gray-800"></div>
                )}
              </div>
            ))
          )}
        </div>
        <button className="w-full mt-5 py-2 text-xs font-bold text-[#616f89] dark:text-gray-400 bg-[#f0f2f4] dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          Bütün xəbər lenti
        </button>
      </div>

      {/* Ad Placeholder */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64 flex flex-col items-center justify-center text-center p-4">
        <span className="text-xs text-gray-400 uppercase tracking-widest mb-2">
          Reklam
        </span>
        <div className="w-16 h-1 bg-gray-300 rounded mb-4"></div>
        <p className="text-gray-400 text-sm">Reklam yeriniz burada ola bilər</p>
      </div>

      {/* Currency Widget */}
      <CurrencyWidget />
    </aside>
  );
}
