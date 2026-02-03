import Link from "next/link";

export function Header() {
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-[#1A202C] border-b border-[#f0f2f4] dark:border-gray-800 shadow-sm">
      <div className="layout-container flex flex-col max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Logo, Search, Auth */}
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-4 text-[#111318] dark:text-white"
          >
            <div className="size-8 text-primary flex items-center justify-center">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "32px" }}
              >
                language
              </span>
            </div>
            <h2 className="text-2xl font-black leading-tight tracking-[-0.015em]">
              Crossmedia
            </h2>
          </Link>

          <div className="hidden md:flex flex-1 justify-end gap-6 items-center max-w-xl ml-auto">
            <label className="flex flex-col min-w-40 w-full max-w-xs h-10">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#616f89]">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    search
                  </span>
                </div>
                <input
                  className="flex w-full flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-white dark:bg-gray-800 focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-[#f0f2f4] h-full placeholder:text-[#616f89] px-4 pl-10 text-sm font-normal leading-normal transition-all"
                  placeholder="Axtarış..."
                />
              </div>
            </label>
            <button className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary hover:bg-blue-700 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Daxil ol</span>
            </button>
          </div>
          <button className="md:hidden p-2 text-[#111318] dark:text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        {/* Bottom Row: Categories */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
          <nav className="flex items-center gap-6 min-w-max">
            <Link
              href="/"
              className="text-primary text-sm font-bold leading-normal border-b-2 border-primary pb-1"
            >
              Ana Səhifə
            </Link>
            {[
              "Siyasət",
              "İqtisadiyyat",
              "Cəmiyyət",
              "İdman",
              "Mədəniyyət",
              "Texnologiya",
              "Dünya",
              "Kriminal",
              "Avto",
              "Maraqlı",
            ].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[#111318] dark:text-gray-300 hover:text-primary text-sm font-medium leading-normal transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
