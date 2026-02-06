"use client";

import { subscribeNewsletter } from "@/app/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
};

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      const result = await subscribeNewsletter(formData);
      return {
        success: result.success,
        message: result.message || "",
      };
    },
    initialState
  );

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input
        type="email"
        name="email"
        placeholder="Email ünvanınız"
        className="bg-gray-800 border-none rounded text-white text-sm placeholder:text-gray-500 focus:ring-1 focus:ring-primary h-10 px-3 outline-none"
        required
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-primary hover:bg-blue-600 text-white text-sm font-bold h-10 rounded transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? "Gözləyin..." : "Abunə ol"}
      </button>
    </form>
  );
}
