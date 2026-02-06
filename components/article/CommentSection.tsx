"use client";

import { useActionState } from "react";
import { submitComment } from "@/app/actions";

const initialState = {
  success: false,
  message: "",
};

export function CommentSection({ postId, comments = [] }: { postId: string, comments?: any[] }) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
        // Forward all fields to the server action
        const result = await submitComment(postId, formData);
        return {
            success: result.success,
            message: result.message || ""
        };
    },
    initialState
  );

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-[#111318] dark:text-white mb-6 flex items-center gap-2">
        Şərhlər{" "}
        <span className="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
          {comments.length}
        </span>
      </h3>

      <form action={formAction} className="mb-10 bg-white dark:bg-[#1A202C] border border-[#f0f2f4] dark:border-gray-800 p-6 rounded-xl shadow-sm">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Şərh Yazın</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Ad *</label>
                <input
                    name="name"
                    required
                    placeholder="Adınız"
                    className="w-full bg-[#f8f9fa] dark:bg-gray-800 border-none rounded-lg px-4 py-3 text-sm text-[#111318] dark:text-white placeholder:text-[#616f89] focus:ring-2 focus:ring-primary/50"
                />
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Soyad *</label>
                <input
                    name="surname"
                    required
                    placeholder="Soyadınız"
                    className="w-full bg-[#f8f9fa] dark:bg-gray-800 border-none rounded-lg px-4 py-3 text-sm text-[#111318] dark:text-white placeholder:text-[#616f89] focus:ring-2 focus:ring-primary/50"
                />
            </div>
        </div>

        <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email *</label>
            <input
                name="email"
                type="email"
                required
                placeholder="nümunə@mail.com"
                className="w-full bg-[#f8f9fa] dark:bg-gray-800 border-none rounded-lg px-4 py-3 text-sm text-[#111318] dark:text-white placeholder:text-[#616f89] focus:ring-2 focus:ring-primary/50"
            />
        </div>

        <div className="flex gap-4">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 hidden md:flex">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div className="flex-1">
            <textarea
              name="content"
              required
              className="w-full bg-[#f8f9fa] dark:bg-gray-800 border-none rounded-lg p-4 text-[#111318] dark:text-white placeholder:text-[#616f89] focus:ring-2 focus:ring-primary/50 resize-y min-h-[100px]"
              placeholder="Fikirlərinizi yazın..."
            ></textarea>
            <div className="flex justify-between mt-3 items-center gap-4">
               <span className={`text-sm font-medium ${state.success ? 'text-green-600' : 'text-red-600'}`}>
                   {state.message}
               </span>
              <button
                type="submit"
                disabled={isPending}
                className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-primary/30 disabled:opacity-70"
              >
                {isPending ? "Göndərilir..." : "Göndər"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-col gap-6">
        {comments.map((comment, i) => (
          <div key={i} className="flex gap-4">
            <div
              className="size-10 rounded-full bg-gray-200 overflow-hidden shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${comment.avatar || "https://ui-avatars.com/api/?name=" + comment.name + "&background=random"}')` }}
            ></div>
            <div className="flex-1">
              <div className="bg-[#f8f9fa] dark:bg-gray-800/50 p-4 rounded-xl rounded-tl-none">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#111318] dark:text-white text-sm">
                    {comment.name} {comment.surname}
                  </span>
                  <span className="text-xs text-[#616f89]">
                      {/* Format date properly in real app */}
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString("az-AZ") : "Bu gün"}
                  </span>
                </div>
                <p className="text-sm text-[#4a5568] dark:text-gray-300">
                  {comment.content}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-2 pl-2">
                <button className="text-xs font-bold text-[#616f89] hover:text-primary flex items-center gap-1">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                  >
                    thumb_up
                  </span>{" "}
                  Bəyən ({comment.likes || 0})
                </button>
                <button className="text-xs font-bold text-[#616f89] hover:text-primary">
                  Cavab yaz
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
