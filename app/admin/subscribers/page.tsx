import { getSubscribers } from "@/app/admin/actions";
import DeleteButton from "./DeleteButton";
import { format } from "date-fns";
import { az } from "date-fns/locale";

export default async function SubscribersPage() {
  const subscribers = await getSubscribers();

  return (
    <div className="bg-white dark:bg-[#1a2234] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col">
       <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
         <h3 className="text-lg font-bold text-gray-900 dark:text-white">Abunəçilər</h3>
       </div>
       <div className="overflow-x-auto">
         <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarix</th>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {subscribers.map((sub: any) => (
                 <tr key={sub._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{sub.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                       {format(new Date(sub.createdAt), "dd MMM yyyy, HH:mm", { locale: az })}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <DeleteButton id={sub._id} />
                    </td>
                 </tr>
              ))}
              {subscribers.length === 0 && (
                <tr>
                   <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      Heç bir abunəçi tapılmadı.
                   </td>
                </tr>
              )}
            </tbody>
         </table>
       </div>
    </div>
  );
}
