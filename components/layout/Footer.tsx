import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#1A202C] border-t border-[#f0f2f4] dark:border-gray-800 py-12 mt-12">
      <div className="layout-container flex flex-col items-center justify-center max-w-[1280px] mx-auto px-4 text-center">
        <div className="flex items-center gap-2 mb-6 text-[#111318] dark:text-white">
          <div className="size-6 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined">language</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Crossmedia</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm font-medium text-[#616f89] dark:text-gray-400">
          <Link href="#" className="hover:text-primary transition-colors">
            Haqqımızda
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Reklam
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Əlaqə
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Məxfilik siyasəti
          </Link>
        </div>
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Crossmedia. Bütün hüquqlar qorunur.
        </p>
      </div>
    </footer>
  );
}
