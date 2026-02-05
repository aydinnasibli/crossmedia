import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  color?: string; // class for the pill, e.g. bg-primary, bg-purple-600
  link?: string;
  linkText?: string;
}

export function SectionHeader({ title, color = "bg-primary", link, linkText = "Hamısına bax" }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-[#111318] dark:text-white flex items-center gap-2">
        <span className={`w-2 h-8 rounded-full ${color}`}></span>
        {title}
      </h2>
      {link && (
        <Link
          href={link}
          className="text-sm font-semibold text-primary hover:text-blue-700 flex items-center gap-1"
        >
          {linkText} <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      )}
    </div>
  );
}
