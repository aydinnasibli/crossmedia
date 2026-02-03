import { MockPost } from "@/app/actions";

export function ArticleContent({ post }: { post: MockPost }) {
  return (
    <>
      <figure className="w-full mb-8">
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative shadow-sm">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${post.mainImage.asset.url}')` }}
          ></div>
        </div>
        <figcaption className="mt-2 text-sm text-[#616f89] dark:text-gray-500 italic text-center">
          Foto: Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi
        </figcaption>
      </figure>

      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-[#111318] dark:text-gray-200 font-body leading-loose">
        <p className="mb-6">
          Son illərdə Azərbaycanda informasiya texnologiyaları sahəsində
          müşahidə olunan inkişaf templəri regionda liderlik mövqeyini
          gücləndirir. Dövlət qurumlarının rəqəmsallaşması, startap
          ekosisteminin dəstəklənməsi və internet infrastrukturunun yenilənməsi
          bu prosesin əsas komponentləridir.
        </p>
        <p className="mb-6">
          Xüsusilə{" "}
          <a className="text-primary font-medium hover:underline" href="#">
            "Ağıllı Şəhər"
          </a>{" "}
          və "Ağıllı Kənd" layihələri çərçivəsində tətbiq edilən innovativ
          həllər, vətəndaşların həyat keyfiyyətini artırmaqla yanaşı,
          idarəetmədə şəffaflığı da təmin edir.
        </p>
        <h3 className="text-2xl font-bold text-[#111318] dark:text-white mt-8 mb-4 font-display">
          İqtisadiyyata Təsiri və Gözləntilər
        </h3>
        <p className="mb-6">
          İqtisadçı ekspertlərin fikrincə, rəqəmsal iqtisadiyyatın payının
          artması ÜDM-də neft sektorunun payının azalmasına və iqtisadiyyatın
          şaxələndirilməsinə müsbət təsir göstərəcəkdir. 2025-ci ilə qədər İT
          sektorunun ixrac potensialının ikiqat artması proqnozlaşdırılır.
        </p>
        <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl font-medium text-gray-800 dark:text-gray-200 bg-background-light dark:bg-gray-800/50 rounded-r-lg">
          "Rəqəmsal gələcək sadəcə texnologiya deyil, bu, yeni düşüncə tərzi
          və idarəetmə fəlsəfəsidir. Biz insan kapitalına investisiya qoyaraq bu
          gələcəyi bu gündən qururuq."
        </blockquote>
        <h3 className="text-2xl font-bold text-[#111318] dark:text-white mt-8 mb-4 font-display">
          Təhsil və İnsan Kapitalı
        </h3>
        <p className="mb-6">
          Yeni texnologiyaların tətbiqi ixtisaslı kadr tələbatını artırır. Bu
          məqsədlə universitetlərdə yeni İT fakültələri açılır, beynəlxalq
          təcrübə proqramları həyata keçirilir. "Technest" təqaüd proqramı
          çərçivəsində minlərlə gənc proqramlaşdırma, kibertəhlükəsizlik və data
          analitikası üzrə təhsil alır.
        </p>
        <p>
          Nəticə etibarilə, Azərbaycanın rəqəmsal haba çevrilməsi strateji hədəf
          olaraq qalır və bu istiqamətdə atılan addımlar artıq öz bəhrəsini
          verməkdədir.
        </p>
      </div>

      <div className="border-t border-[#f0f2f4] dark:border-gray-800 pt-8 mt-4">
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-sm font-bold text-[#111318] dark:text-white mr-2 flex items-center">
            Teqlər:
          </span>
          {["Rəqəmsalİnkişaf", "Texnologiya", "İqtisadiyyat", "İnnovasiya"].map(
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
