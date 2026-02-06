"use client";

import { deleteSubscriber } from "@/app/admin/actions";
import { useTransition } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Bu abunəçini silmək istədiyinizə əminsiniz?")) {
      startTransition(async () => {
        await deleteSubscriber(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
      title="Sil"
    >
      <span className="material-symbols-outlined">delete</span>
    </button>
  );
}
