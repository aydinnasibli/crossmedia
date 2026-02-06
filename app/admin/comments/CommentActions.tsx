"use client";

import { approveComment, deleteComment } from "./actions";
import { useTransition } from "react";

export function CommentActions({ id, isApproved }: { id: string, isApproved: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleApprove = () => {
    startTransition(async () => {
      await approveComment(id);
    });
  };

  const handleDelete = () => {
    if (confirm("Bu şərhi silmək istədiyinizə əminsiniz?")) {
      startTransition(async () => {
        await deleteComment(id);
      });
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      {!isApproved && (
        <button
          onClick={handleApprove}
          disabled={isPending}
          className="text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 p-2 rounded-lg transition-colors disabled:opacity-50"
          title="Təsdiqlə"
        >
          <span className="material-symbols-outlined text-[20px]">check</span>
        </button>
      )}
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
