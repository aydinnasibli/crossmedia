import { getAdminComments } from "./actions";
import { CommentActions } from "./CommentActions";
import { format } from "date-fns";
import { az } from "date-fns/locale";

export default async function AdminCommentsPage() {
  const comments = await getAdminComments();

  return (
    <div className="bg-white dark:bg-[#1a2234] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col">
       <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
         <h3 className="text-lg font-bold text-gray-900 dark:text-white">Şərhlər</h3>
         <span className="text-sm text-gray-500">{comments.length} şərh</span>
       </div>
       <div className="overflow-x-auto">
         <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">İstifadəçi</th>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">Şərh</th>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarix</th>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {comments.map((comment: any) => (
                 <tr key={comment._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-900 dark:text-white text-sm">
                                {comment.name} {comment.surname}
                            </span>
                            <span className="text-xs text-gray-500">{comment.email}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2" title={comment.content}>
                            {comment.content}
                        </p>
                    </td>
                    <td className="px-6 py-4">
                        {comment.isApproved ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-100 dark:border-green-800">
                                Təsdiqlənib
                            </span>
                        ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-100 dark:border-yellow-800">
                                Gözləmədə
                            </span>
                        )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                       {format(new Date(comment.createdAt), "dd MMM yyyy, HH:mm", { locale: az })}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <CommentActions id={comment._id} isApproved={comment.isApproved} />
                    </td>
                 </tr>
              ))}
              {comments.length === 0 && (
                <tr>
                   <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      Heç bir şərh tapılmadı.
                   </td>
                </tr>
              )}
            </tbody>
         </table>
       </div>
    </div>
  );
}
