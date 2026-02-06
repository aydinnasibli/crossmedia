import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-[#101622] text-white pt-16 pb-8 border-t border-gray-800 mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">
                  newsmode
                </span>
              </div>
              <h2 className="text-xl font-bold">Crossmedia</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Azərbaycanın və dünyanın ən son xəbərləri, analitik təhlillər və
              maraqlı reportajlar bir ünvanda. Operativ və qərəzsiz xəbər
              portalı.
            </p>
            <div className="flex gap-3 pt-2">
              <Link
                href="#"
                className="size-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white"
              >
                <span className="material-symbols-outlined text-[16px]">
                  public
                </span>
              </Link>
              <Link
                href="#"
                className="size-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white"
              >
                <span className="material-symbols-outlined text-[16px]">
                  rss_feed
                </span>
              </Link>
              <Link
                href="#"
                className="size-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white"
              >
                <span className="material-symbols-outlined text-[16px]">
                  mail
                </span>
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kateqoriyalar</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/category/Siyasət" className="hover:text-white transition-colors">
                  Siyasət
                </Link>
              </li>
              <li>
                <Link href="/category/İqtisadiyyat" className="hover:text-white transition-colors">
                  İqtisadiyyat
                </Link>
              </li>
              <li>
                <Link href="/category/Cəmiyyət" className="hover:text-white transition-colors">
                  Cəmiyyət
                </Link>
              </li>
              <li>
                <Link href="/category/İdman" className="hover:text-white transition-colors">
                  İdman
                </Link>
              </li>
              <li>
                <Link href="/category/Mədəniyyət" className="hover:text-white transition-colors">
                  Mədəniyyət
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Faydalı Linklər</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Haqqımızda
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Reklam yerləşdirmək
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Redaksiya heyəti
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Məxfilik siyasəti
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Əlaqə
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="font-bold text-lg mb-4">Abunə olun</h3>
            <p className="text-gray-400 text-sm mb-4">
              Ən vacib xəbərləri emailinizə göndərək.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Crossmedia. Bütün hüquqlar qorunur.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <span>18+</span>
            <span>Bakı vaxtı ilə {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
