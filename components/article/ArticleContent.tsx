import { PostType } from "@/app/actions";

export function ArticleContent({ post }: { post: PostType }) {
  return (
    <>
      <figure className="w-full mb-8">
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative shadow-sm">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${post.mainImage}')` }}
          ></div>
        </div>
        <figcaption className="mt-2 text-sm text-[#616f89] dark:text-gray-500 italic text-center">
          Foto: {post.title}
        </figcaption>
      </figure>

      <div
        className="prose prose-lg prose-slate dark:prose-invert max-w-none text-[#111318] dark:text-gray-200 font-body leading-loose"
        dangerouslySetInnerHTML={{ __html: post.content || "<p>Məzmun yoxdur</p>" }}
      />

      <div className="border-t border-[#f0f2f4] dark:border-gray-800 pt-8 mt-4">
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-sm font-bold text-[#111318] dark:text-white mr-2 flex items-center">
            Teqlər:
          </span>
          {["Xəbər", post.category || "Gündəm"].map(
            (tag) => (
              <a
                key={tag}
                href="#"
                className="px-3 py-1 bg-[#f0f2f4] dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm text-[#616f89] dark:text-gray-300 transition-colors"
              >
                #{tag}
              </a>
            )
          )}
        </div>
      </div>
    </>
  );
}
