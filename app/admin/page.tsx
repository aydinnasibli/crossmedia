import { getAdminStats } from "./actions";
import { getPosts as getAllPosts } from "@/app/actions";
import Link from "next/link";
import { format } from "date-fns";
import { az } from "date-fns/locale";

export default async function AdminDashboard() {
  const stats = await getAdminStats();
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 5); // Take top 5

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Card 1: Views */}
        <div className="bg-white dark:bg-[#1a2234] rounded-xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 dark:border-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Ümumi Baxışlar
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.views.toLocaleString()}
              </h3>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
              <span className="material-symbols-outlined">visibility</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-green-600 text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
            <span>+12%</span>
            <span className="text-gray-400 font-normal ml-1">keçən aya görə</span>
          </div>
        </div>

        {/* Stat Card 2: Posts */}
        <div className="bg-white dark:bg-[#1a2234] rounded-xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 dark:border-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Məqalələr
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.posts}
              </h3>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600">
              <span className="material-symbols-outlined">post_add</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-green-600 text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
            <span>+2%</span>
            <span className="text-gray-400 font-normal ml-1">keçən həftəyə görə</span>
          </div>
        </div>

        {/* Stat Card 3: Comments */}
        <div className="bg-white dark:bg-[#1a2234] rounded-xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 dark:border-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Şərhlər
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.comments}
              </h3>
            </div>
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600">
              <span className="material-symbols-outlined">chat_bubble</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-green-600 text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
            <span>+5%</span>
            <span className="text-gray-400 font-normal ml-1">keçən günə görə</span>
          </div>
        </div>

        {/* Stat Card 4: Subscribers */}
        <div className="bg-white dark:bg-[#1a2234] rounded-xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 dark:border-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Yeni Abunəçilər
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.subscribers}
              </h3>
            </div>
            <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-teal-600">
              <span className="material-symbols-outlined">person_add</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-red-500 text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">trending_down</span>
            <span>-2%</span>
            <span className="text-gray-400 font-normal ml-1">keçən həftəyə görə</span>
          </div>
        </div>
      </div>

      {/* Recent Articles Section */}
      <div className="bg-white dark:bg-[#1a2234] rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Son Məqalələr
          </h3>
          <Link
            className="text-primary text-sm font-medium hover:underline"
            href="/admin/posts"
          >
            Hamısına bax
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">
                  Məqalə Başlığı
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Müəllif
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Kateqoriya
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tarix
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Əməliyyatlar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentPosts.map((post) => (
                <tr
                  key={post._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-16 bg-cover bg-center rounded bg-gray-200"
                        style={{ backgroundImage: `url('${post.mainImage}')` }}
                      ></div>
                      <span className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
                        {post.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {post.author.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {format(new Date(post.publishedAt), "dd MMM yyyy", { locale: az })}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-100 dark:border-green-800">
                      <span className="size-1.5 rounded-full bg-green-500"></span>
                      Yayımlandı
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
