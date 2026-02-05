"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CategoryType } from "@/app/actions";
import { useState } from "react";

export function HeaderClient({ categories }: { categories: CategoryType[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white dark:bg-[#1a202c] sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link className="flex items-center gap-2 group" href="/">
            <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[28px]">newsmode</span>
            </div>
            <h1 className="text-[#111318] dark:text-white text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
              Crossmedia
            </h1>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg">
            <form onSubmit={handleSearch} className="w-full">
              <label className="flex w-full items-center h-11 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 px-3 transition-shadow focus-within:ring-2 focus-within:ring-primary/20 cursor-text">
                <span className="material-symbols-outlined text-[#616f89] dark:text-gray-400">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-sm text-[#111318] dark:text-white placeholder:text-[#616f89] focus:ring-0 ml-2 focus:outline-none"
                  placeholder="Xəbər axtar..."
                />
              </label>
            </form>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-[#111318] dark:text-white">
            <span className="material-symbols-outlined text-[28px]">menu</span>
          </button>
        </div>

        {/* Navigation Categories */}
        <nav className="mt-4 pt-1 border-t border-transparent md:border-[#f0f2f4] dark:border-gray-800 overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-1 min-w-max pb-1">
            <li>
              <Link
                className={`block px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                  pathname === "/"
                    ? "text-primary bg-primary/10"
                    : "text-[#111318] dark:text-gray-300 hover:bg-[#f0f2f4] dark:hover:bg-gray-800"
                }`}
                href="/"
              >
                Əsas Xəbərlər
              </Link>
            </li>
            {categories.map((cat) => {
              const href = `/category/${cat.name}`;
              // Handle encoded URL matching if necessary, but simple string check usually works for basic latin
              const isActive = pathname === href || pathname === `/category/${encodeURIComponent(cat.name)}`;

              return (
                <li key={cat._id}>
                  <Link
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                        ? "text-primary bg-primary/10 font-bold"
                        : "text-[#111318] dark:text-gray-300 hover:bg-[#f0f2f4] dark:hover:bg-gray-800"
                    }`}
                    href={href}
                  >
                    {cat.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
