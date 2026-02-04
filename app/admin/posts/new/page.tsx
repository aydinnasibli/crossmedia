"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/admin/TiptapEditor";
import { createPost } from "@/app/admin/actions";

export default function NewPostPage() {
  const router = useRouter();
  const [content, setContent] = useState("<p>Start writing...</p>");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("content", content);

    const result = await createPost(formData);

    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Create New Post</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Excerpt</label>
            <textarea
                name="excerpt"
                required
                rows={3}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                 <select
                    name="category"
                    required
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                    <option value="Siyasət">Siyasət</option>
                    <option value="Daxili Siyasət">Daxili Siyasət</option>
                    <option value="Xarici Əlaqələr">Xarici Əlaqələr</option>
                    <option value="İqtisadiyyat">İqtisadiyyat</option>
                    <option value="Texnologiya">Texnologiya</option>
                    <option value="Cəmiyyət">Cəmiyyət</option>
                    <option value="İdman">İdman</option>
                    <option value="Mədəniyyət">Mədəniyyət</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Main Image</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author Name</label>
                <input
                    type="text"
                    name="authorName"
                    required
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author Role</label>
                <input
                    type="text"
                    name="authorRole"
                    required
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author Image URL</label>
                <input
                    type="url"
                    name="authorImage"
                    required
                    placeholder="https://..."
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
            </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
          <TiptapEditor content={content} onChange={setContent} />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
