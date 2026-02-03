"use client";

import { subscribeNewsletter } from "@/app/actions";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
};

export function Sidebar() {
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

  return (
    <aside className="lg:col-span-4 space-y-8">
      {/* Latest / Most Read Tabs */}
      <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#f0f2f4] dark:border-gray-800 p-5 shadow-sm">
        <div className="flex border-b border-[#f0f2f4] dark:border-gray-700 mb-4">
          <button className="flex-1 pb-3 text-sm font-bold text-primary border-b-2 border-primary">
            Son Xəbərlər
          </button>
          <button className="flex-1 pb-3 text-sm font-medium text-[#616f89] dark:text-gray-400 hover:text-[#111318] dark:hover:text-white transition-colors">
            Ən Çox Oxunan
          </button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="contents">
              <a className="flex gap-3 group items-start" href="#">
                <span className="text-xs font-medium text-gray-400 mt-1">
                  15:30
                </span>
                <h3 className="text-sm font-medium text-[#111318] dark:text-white group-hover:text-primary leading-snug">
                  Metropolitendə yeni ödəmə sistemi tətbiq olunur
                </h3>
              </a>
              {i < 5 && (
                <div className="border-b border-dashed border-gray-100 dark:border-gray-800"></div>
              )}
            </div>
          ))}
        </div>
        <button className="w-full mt-5 py-2 text-xs font-bold text-[#616f89] dark:text-gray-400 bg-[#f0f2f4] dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          Bütün xəbər lenti
        </button>
      </div>

      {/* Newsletter Widget */}
      <div className="rounded-xl p-6 bg-gradient-to-br from-[#135bec]/10 to-[#135bec]/5 border border-primary/20 dark:from-primary/20 dark:to-primary/10">
        <div className="flex items-center gap-3 mb-4 text-primary">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "32px" }}
          >
            mark_email_unread
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#111318] dark:text-white mb-2">
          Bülletenə abunə ol
        </h3>
        <p className="text-sm text-[#616f89] dark:text-gray-300 mb-5 leading-relaxed">
          Həftənin ən vacib siyasi xəbərlərini və eksklüziv təhlillərini
          birbaşa emailinizdə əldə edin.
        </p>
        <form action={formAction} className="flex flex-col gap-3">
          <label className="sr-only">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full h-11 px-4 rounded-lg border border-[#d1d5db] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111318] dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
            placeholder="Email ünvanınız"
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full h-11 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70"
          >
            {isPending ? "Gözləyin..." : "Abunə ol"}
          </button>
          {state.message && (
            <p
              className={`text-xs mt-1 text-center ${
                state.success ? "text-green-600" : "text-red-500"
              }`}
            >
              {state.message}
            </p>
          )}
        </form>
        <p className="text-xs text-[#616f89] dark:text-gray-500 mt-3 text-center">
          Spam göndərmirik, istənilən vaxt ayrıla bilərsiniz.
        </p>
      </div>

      {/* Ad Placeholder */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64 flex flex-col items-center justify-center text-center p-4">
        <span className="text-xs text-gray-400 uppercase tracking-widest mb-2">
          Reklam
        </span>
        <div className="w-16 h-1 bg-gray-300 rounded mb-4"></div>
        <p className="text-gray-400 text-sm">Reklam yeriniz burada ola bilər</p>
      </div>
    </aside>
  );
}
