"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/admin") return "İdarə Paneli";
    if (pathname.startsWith("/admin/posts")) return "Məqalələr";
    if (pathname.startsWith("/admin/categories")) return "Kateqoriyalar";
    if (pathname.startsWith("/admin/subscribers")) return "Abunəçilər";
    if (pathname.startsWith("/admin/analytics")) return "Analitika";
    if (pathname.startsWith("/admin/settings")) return "Tənzimləmələr";
    return "İdarə Paneli";
  };

  return (
    <header className="h-16 bg-white dark:bg-[#1a2234] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 flex-shrink-0 z-10 shadow-sm sticky top-0">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
        {getTitle()}
      </h2>
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-400 text-[20px]">
              search
            </span>
          </div>
          <input
            className="block w-64 pl-10 pr-3 py-2 border-none rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            placeholder="Axtarış..."
            type="text"
          />
        </div>
        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-gray-500 hover:text-primary hover:bg-blue-50 rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a2234]"></span>
          </button>
          <Link
            href="/admin/posts/new"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/30"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Yeni Məqalə</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
