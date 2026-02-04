"use client";

import { useState } from "react";
import { MockPost } from "@/app/actions";

export function BreakingNews({ posts }: { posts?: MockPost[] }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  // Use provided posts or fallback text
  const text = posts && posts.length > 0
    ? posts.map(p => p.title).join(" — ")
    : "Azərbaycan neftinin qiyməti dünya bazarında yenidən bahalaşıb — Prezident İlham Əliyev yeni sərəncam imzaladı — Bakıda beynəlxalq iqtisadi forum öz işinə başlayıb.";

  return (
    <div className="bg-white dark:bg-[#1a202c] border-b border-[#f0f2f4] dark:border-gray-800">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-2 flex items-center gap-3">
        <span className="shrink-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider animate-pulse">
          TƏCİLİ
        </span>
        <div className="flex-1 overflow-hidden relative h-6">
          <p className="absolute w-full animate-marquee whitespace-nowrap text-sm font-medium text-[#111318] dark:text-gray-200 leading-6">
            {text}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#616f89] hover:text-primary"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "20px" }}
          >
            close
          </span>
        </button>
      </div>
    </div>
  );
}
