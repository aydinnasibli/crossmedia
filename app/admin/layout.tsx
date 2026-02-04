import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/posts/new"
            className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            New Post
          </Link>
          <Link
            href="/admin/comments"
            className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Comments
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <UserButton />
                <span>Profile</span>
            </div>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
