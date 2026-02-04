export function CategoryHeader({ title, description }: { title: string, description?: string }) {
  return (
    <div className="mb-8 border-b border-[#f0f2f4] dark:border-gray-800 pb-6">
      <div className="flex items-baseline gap-3">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#111318] dark:text-white capitalize">
          {title}
        </h1>
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
      </div>
      <p className="text-[#616f89] dark:text-gray-400 mt-3 text-lg max-w-2xl">
        {description || `${title} kateqoriyasına aid ən son xəbərlər, təhlillər və reportajlar.`}
      </p>
    </div>
  );
}
