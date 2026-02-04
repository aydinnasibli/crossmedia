"use client";

import Link from "next/link";
import { format } from "date-fns";
import { az } from "date-fns/locale";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";

export function TopUtilityBar() {
  const currentDate = format(new Date(), "d MMMM yyyy", { locale: az });

  return (
    <div className="bg-white dark:bg-[#1a202c] border-b border-[#f0f2f4] dark:border-gray-800">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 h-10 flex items-center justify-between text-xs font-medium text-[#616f89] dark:text-gray-400">
        <div className="flex items-center gap-4">
          <span>Bakı, {currentDate}</span>
          <WeatherWidget />
        </div>
        <div className="flex items-center gap-3">
          <Link href="#" className="hover:text-primary transition-colors">
            Haqqımızda
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Reklam
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Əlaqə
          </Link>
          <div className="w-px h-3 bg-gray-300 mx-1"></div>
          <div className="flex gap-2">
            <Link
              href="#"
              className="hover:text-[#1877F2] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                public
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
