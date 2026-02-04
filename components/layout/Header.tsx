import Link from "next/link";
import { getCategories } from "@/app/actions";

export async function Header() {
  const categories = await getCategories();

  return (
    <header className="bg-white dark:bg-[#1a202c] sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link className="flex items-center gap-2 group" href="/">
            <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[28px]">newsmode</span>
            </div>
            <h1 className="text-[#111318] dark:text-white text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
              Crossmedia
            </h1>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg">
            <label className="flex w-full items-center h-11 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 px-3 transition-shadow focus-within:ring-2 focus-within:ring-primary/20">
              <span className="material-symbols-outlined text-[#616f89] dark:text-gray-400">
                search
              </span>
              <input
                className="w-full bg-transparent border-none text-sm text-[#111318] dark:text-white placeholder:text-[#616f89] focus:ring-0 ml-2 focus:outline-none"
                placeholder="Xəbər axtar..."
              />
            </label>
          </div>

          {/* CTA Button */}
          <button className="hidden sm:flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors">
            <span className="material-symbols-outlined text-[20px]">subscriptions</span>
            <span>Abunə ol</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-[#111318] dark:text-white">
            <span className="material-symbols-outlined text-[28px]">menu</span>
          </button>
        </div>

        {/* Navigation Categories */}
        <nav className="mt-4 pt-1 border-t border-transparent md:border-[#f0f2f4] dark:border-gray-800 overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-1 min-w-max pb-1">
            <li>
              <Link
                className="block px-3 py-2 rounded-lg text-sm font-bold text-primary bg-primary/10"
                href="/"
              >
                Əsas Xəbərlər
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-[#111318] dark:text-gray-300 hover:bg-[#f0f2f4] dark:hover:bg-gray-800 transition-colors"
                  href={`/category/${cat.name}`} // Using name for slug for now to match seeding
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
