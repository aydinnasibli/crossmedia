"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "İdarə Paneli", href: "/admin", icon: "dashboard" },
    { name: "Məqalələr", href: "/admin/posts", icon: "article" },
    { name: "Kateqoriyalar", href: "/admin/categories", icon: "category" },
    { name: "Şərhlər", href: "/admin/comments", icon: "chat_bubble" },
    { name: "Abunəçilər", href: "/admin/subscribers", icon: "group" },
    { name: "Analitika", href: "/admin/analytics", icon: "analytics" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col flex-shrink-0 transition-all duration-300 h-screen fixed left-0 top-0 z-20">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="bg-primary aspect-square rounded-lg size-8 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-xl">newsmode</span>
          </div>
          <div>
            <h1 className="text-white text-lg font-bold leading-none">Crossmedia</h1>
            <p className="text-gray-400 text-xs mt-0.5">Admin Paneli</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
              isActive(link.href)
                ? "bg-primary text-white"
                : "text-gray-400 hover:text-white hover:bg-[#1e293b]"
            }`}
          >
            <span className={`material-symbols-outlined ${isActive(link.href) ? "filled" : ""}`}>
              {link.icon}
            </span>
            <span className="text-sm font-medium">{link.name}</span>
          </Link>
        ))}

        <div className="mt-4 pt-4 border-t border-gray-800">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Sistem
          </p>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1e293b] group transition-colors"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Tənzimləmələr</span>
          </Link>
        </div>
      </nav>

      {/* User Profile (Bottom Sidebar) */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 w-full p-2 rounded-lg text-left">
           <UserButton showName />
        </div>
      </div>
    </aside>
  );
}
