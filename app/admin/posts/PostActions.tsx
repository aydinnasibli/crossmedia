"use client";

import { useTransition } from "react";
import { deletePost } from "./actions";
import Link from "next/link";
import { format } from "date-fns";
import { az } from "date-fns/locale";

export default function PostActions({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Bu məqaləni silmək istədiyinizə əminsiniz?")) {
      startTransition(async () => {
        await deletePost(id);
      });
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      <Link
        href={`/admin/posts/${id}`}
        className="text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors"
        title="Redaktə et"
      >
        <span className="material-symbols-outlined text-[20px]">edit</span>
      </Link>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors disabled:opacity-50"
        title="Sil"
      >
        <span className="material-symbols-outlined text-[20px]">delete</span>
      </button>
    </div>
  );
}
