"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/admin/TiptapEditor";

interface PostFormProps {
  initialData?: any;
  action: (formData: FormData) => Promise<{ success: boolean; message: string }>;
  isEdit?: boolean;
}

export default function PostForm({ initialData, action, isEdit }: PostFormProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialData?.content || "<p>Start writing...</p>");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("content", content);

    const result = await action(formData);

    if (result.success) {
      router.push("/admin/posts");
    } else {
      setError(result.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-[#1a2234] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        {isEdit ? "Məqaləni Redaktə Et" : "Yeni Məqalə Yarat"}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Başlıq
          </label>
          <input
            type="text"
            name="title"
            required
            defaultValue={initialData?.title}
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Qısa Məzmun (Excerpt)
          </label>
          <textarea
            name="excerpt"
            required
            rows={3}
            defaultValue={initialData?.excerpt}
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Kateqoriya
            </label>
            <select
              name="category"
              required
              defaultValue={initialData?.category || "Siyasət"}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
            >
              <option value="Siyasət">Siyasət</option>
              <option value="Daxili Siyasət">Daxili Siyasət</option>
              <option value="Xarici Əlaqələr">Xarici Əlaqələr</option>
              <option value="İqtisadiyyat">İqtisadiyyat</option>
              <option value="Texnologiya">Texnologiya</option>
              <option value="Cəmiyyət">Cəmiyyət</option>
              <option value="İdman">İdman</option>
              <option value="Mədəniyyət">Mədəniyyət</option>
              <option value="Dünya">Dünya</option>
              <option value="Kriminal">Kriminal</option>
              <option value="Maqazin">Maqazin</option>
              <option value="Avto">Avto</option>
              <option value="Sağlamlıq">Sağlamlıq</option>
              <option value="Elm">Elm</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Əsas Şəkil
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required={!isEdit}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
            />
            {initialData?.mainImage && (
                <p className="text-xs text-gray-500 mt-1">Cari şəkil mövcuddur. Dəyişmək üçün yenisini seçin.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Müəllif Adı
            </label>
            <input
              type="text"
              name="authorName"
              required
              defaultValue={initialData?.author?.name}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Müəllif Vəzifəsi
            </label>
            <input
              type="text"
              name="authorRole"
              required
              defaultValue={initialData?.author?.role}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Müəllif Şəkli (URL)
            </label>
            <input
              type="url"
              name="authorImage"
              placeholder="https://..."
              defaultValue={initialData?.author?.image}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Məzmun
          </label>
          <TiptapEditor content={content} onChange={setContent} />
        </div>

        <div className="flex justify-end gap-3">
            <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
                Ləğv et
            </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-lg shadow-primary/30"
          >
            {loading ? "Yadda saxlanılır..." : isEdit ? "Yenilə" : "Dərc et"}
          </button>
        </div>
      </form>
    </div>
  );
}
