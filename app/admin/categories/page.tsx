import { getCategories } from "@/app/actions";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#111318] dark:text-white">Kateqoriyalar</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
          Yeni Kateqoriya
        </button>
      </div>

      <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Ad</th>
              <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Slug</th>
              <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Sıra</th>
              <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{cat.name}</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{cat.slug}</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{cat.order}</td>
                <td className="px-6 py-4">
                  <button className="text-primary hover:underline font-medium">
                    Redaktə
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                        Kateqoriya tapılmadı.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
