import { getPosts } from "@/app/actions";
import PostActions from "./PostActions";
import Link from "next/link";
import { format } from "date-fns";
import { az } from "date-fns/locale";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div className="bg-white dark:bg-[#1a2234] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col">
       <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
         <h3 className="text-lg font-bold text-gray-900 dark:text-white">Məqalələr</h3>
         <Link
            href="/admin/posts/new"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/30"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Yeni Məqalə</span>
          </Link>
       </div>
       <div className="overflow-x-auto">
         <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">Başlıq</th>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Müəllif</th>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kateqoriya</th>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarix</th>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {posts.map((post) => (
                 <tr key={post._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
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
                    <td className="px-6 py-4 text-right">
                       <PostActions id={post._id} />
                    </td>
                 </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                   <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      Heç bir məqalə tapılmadı.
                   </td>
                </tr>
              )}
            </tbody>
         </table>
       </div>
    </div>
  );
}
