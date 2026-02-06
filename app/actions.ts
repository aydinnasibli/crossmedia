"use server";

import connectDB from "@/lib/db";
import Comment from "@/models/Comment";
import Subscriber from "@/models/Subscriber";
import Post from "@/models/Post";
import Category from "@/models/Category";

// --- Types ---

export interface PostType {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage: string;
  publishedAt: string;
  category: string;
  tags?: string[];
  views?: number;
  author: { name: string; image: string; role: string };
  content?: string;
}

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  order: number;
}

export type MockPost = PostType;

// --- Mock Data ---
const MOCK_CATEGORIES = [
  "Siyasət", "İqtisadiyyat", "Cəmiyyət", "Dünya", "İdman",
  "Mədəniyyət", "Texnologiya", "Kriminal", "Maqazin",
  "Avto", "Sağlamlıq", "Elm"
];

const MOCK_POSTS: PostType[] = [
  {
    _id: "1",
    title: "Bakıda keçirilən beynəlxalq iqtisadi forumda yeni sazişlər imzalandı",
    slug: "bakida-iqtisadi-forum",
    excerpt: "Forum çərçivəsində Azərbaycanın ixrac potensialının artırılması və xarici investisiyaların cəlb edilməsi istiqamətində mühüm müzakirələr aparılıb.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfGBjvyvw8dryDUXXMeZkD8mq2pa74in3jU3rL_mHHEhzY8fLod2X4NfFUzaZprbfzwqH5ligfJm5RBUNskrJIqH39KAhlwj1Y6eS__9YTUD4RuPS5cbAx_oOm6lYOLKds1ilNHsBQaEe9Q3uBCq6XmpLZUNGLyU1k9X55NxoD9QtZJp8FY8AFGpifM3OaP3yFjDWtHmKh8zlFTXeaEUIMBeOXn_HEcTsfco-fZ8i3GAXmLskNPHsEvEvau8PVWADZqcphNAyyolOn",
    publishedAt: new Date().toISOString(),
    category: "İqtisadiyyat",
    tags: ["Forum", "İqtisadiyyat", "Bakı"],
    views: 12500,
    author: { name: "Elvin Məmmədov", role: "İqtisadiyyat redaktoru", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBIPPlVvRjV4el6HzRbIouevV1t3GK-908hMyw35ZsnSQivytzbW9qSQKJqDm8NHkFpYt0BH-bhq_9zXIgXx2x_BZUx4jdX16W8AW9CvR-INANzYe6n948j-FPPvR-zVPuVwdNrFha6hurcoRHRcGO8_KoYV1EPNVlnI8JmNyJNzk2c-tW12alJl_dEbLEkosMvixKC1swl4aH6eDObtQYhhoFaSgL58Y1KQPX_4CNReKpLceTiKZJiPpj32SalmDS0W2h-03DaAAk" }
  },
  {
    _id: "2",
    title: "Süni intellekt sahəsində Azərbaycan startapının böyük uğuru",
    slug: "suni-intellekt-startap",
    excerpt: "Azərbaycanlı gənclər tərəfindən yaradılan süni intellekt layihəsi qlobal bazarda diqqət çəkib.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgHJCs-HepnTb-lbiXqE0fVhyHBadpQNKDi17Pk4vHy1eUMGq4136WefW2Xd2IshkwVvxjFfYXwMVjwb2Ry4oPuI_9lC7QiXIu7N-Z23rLvC6Gh331XqeDe2GxVvkWXvZnFxQYsUjztD_qPSp4dnu1-V-c0VgjvDR_cqIjpivYlgKwP7hBAFtZwgZnLM2K1weLzlTe0mjH5e2kgtVkZgud6ql83n86ndbTbw11VYR78jVPmUC1nFbXIqKqfvgnLvNklOwr-l-mXlHN",
    publishedAt: new Date().toISOString(),
    category: "Texnologiya",
    tags: ["AI", "Startap", "Texnologiya"],
    views: 8400,
    author: { name: "Aysel Quliyeva", role: "Texnologiya müxbiri", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABbuG7cHMZv1AKPwkzJIOpcZdD6Lo_c0IkqeuXbXFdDSvXVPBgvJ3votw72Mav_WiSJ4eq6fIlTMBwj47M2ZveowX6ndS5kFo_dFcSn9_mQDyBjuKaFFyPaRIBmeYmraS8mgWJoACge-ZUuXbMdj-EfoRhEqVOJwrkT2zguRxAL_-g5OwcpHtZBvMOGLJJADyN1iVpLoaVhqr_E1FBMpNWxU-pV0Fovwc2FTB06umgQTwj1EgPz2HMTlRmPST3MsnrNCoRp8ef3voA" }
  },
  {
    _id: "3",
    title: "Milli komandamız Avropa çempionatının seçmə mərhələsində",
    slug: "milli-komanda-avropa",
    excerpt: "Yığma komandamız bu axşam həlledici oyununa çıxacaq. Baş məşqçi mətbuat konfransı keçirib.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD90LHVXGbP2uZXJoyafZevB6nbfX0UTNNDXwoaPvvCHmZfQCj8wYY2CJIVnHze7KsxV3wSZFOxyCPfXeFZVSMu9vgDsHS6muTJVRejx4PHuYbI41f37l8plj1qhd-x8KUsqI7tUvCme9I9Y0Z_9DHhQm6ij2FHQGLjVile73R8XXQ2aPzHLO7GXeq4S8kXuueBTDg1Pa4P7vQcCv8GkqE_XGRYIG6HO2EFzbSPFhKnRFodB7rucHOrfbLu1--XvqAevvUMhxDrTSK9",
    publishedAt: new Date().toISOString(),
    category: "İdman",
    tags: ["Futbol", "Milli", "İdman"],
    views: 15200,
    author: { name: "Rəşad Əliyev", role: "İdman şərhçisi", image: "" }
  },
  {
    _id: "4",
    title: "Mərkəzi Bank uçot dərəcəsini sabit saxladı: Ekspert rəyləri",
    slug: "merkezi-bank-ucot",
    excerpt: "Bu gün keçirilən iclasda Mərkəzi Bankın İdarə Heyəti uçot dərəcəsinin dəyişdirilməməsi barədə qərar qəbul edib.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgha6OH72Hm1kVi5u87NmMQ0pqt8egiwR7Y8zDA_CBihvEbm1DRMnU2uM9Nh8Un3uADXf8POVrl7Dt-8gxO1js64RuG4_5KGu4U48Unwl3NL2hBHGesay6K07GcRzwm5g2-C9WgoezCVgdI7An2AzcVRCsP0GeUydVfMMZq6EqIsGpIYnVenZIZk5xWKBixHIBpAip0CRUKm39FQJN17-Vz8jJgWqAAu7N6ei9OCcBGblBJjjGtPLZ12krCCQflxKjG9kkS20XV34b",
    publishedAt: new Date().toISOString(),
    category: "Maliyyə",
    tags: ["Bank", "Maliyyə", "İqtisadiyyat"],
    views: 5600,
    author: { name: "Elvin Məmmədov", role: "İqtisadiyyat redaktoru", image: "" }
  },
  {
    _id: "5",
    title: "Təhsil sistemində yeni islahatlar paketi təqdim olundu",
    slug: "tehsil-islahatlari",
    excerpt: "Elm və Təhsil Nazirliyi növbəti tədris ili üçün nəzərdə tutulan yenilikləri ictimaiyyətə açıqlayıb.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0eKTj5Fxc03z8-sf8R8VeOMlD7Zbb32P6yHehy30q70XCSgAvo1ptJi7_8dJ0LFXtztp4oZZsDrXJZdWh-6k9GRjUkbyiCnEKgt-J2-abB3CN5j1D_R5_Iyp9wANbyE7AD3zS0a4mC5YUnz4APNTh9n5kgbcCvtv0AWHKa62CoxFwm9GSvBaScSpDC1jH8WHWMhQaeKvuBXi12kyxpQmLxBY5JwVOLw7wKSqtcMyKPezmQp1eGSwINhgrmbeAIn0qNLSbvKeYuwP6",
    publishedAt: new Date().toISOString(),
    category: "Cəmiyyət",
    tags: ["Təhsil", "Cəmiyyət", "İslahat"],
    views: 9100,
    author: { name: "Günel Həsənova", role: "Təhsil eksperti", image: "" }
  },
  {
    _id: "6",
    title: "Qarabağda 'Yaşıl Enerji' zonasının yaradılması sürətlənir",
    slug: "qarabag-yasil-enerji",
    excerpt: "Azad edilmiş ərazilərdə bərpa olunan enerji mənbələrindən istifadə üzrə işlər planlı şəkildə davam etdirilir.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG1PYbeF8YQBtme-faUf58gT0NGNYAnSupJit7fCwcwBGjhu0web7gjyzJkHbS_Y-nd0sgf_jWiN-u0yJLC2Cqpb13dr9uAuo-CnoT56MWohysFsh6oskhT83DMMJDM0Bg9P6VXtGhvaq99MVC8L6Jw50Bm_GVuMWu1ia7iUwEiNrjs5VKapfXaRJEzbNcisSaTQ2odZETHtBBNc1t_G-l0b0Q9a_KJexNDtAQXXODmJjfgVUStns4jzfgdhQf8DXt89n7dQ-muDQQ",
    publishedAt: new Date().toISOString(),
    category: "Ekologiya",
    tags: ["Qarabağ", "Enerji", "Ekologiya"],
    views: 7300,
    author: { name: "Samir Kərimov", role: "Müxbir", image: "" }
  },
  {
    _id: "7",
    title: "Bakı Caz Festivalı: Dünya ulduzları paytaxta gəlir",
    slug: "baki-caz-festivali",
    excerpt: "Bu il keçiriləcək festivalda iştirak edəcək musiqiçilərin siyahısı və proqram açıqlanıb.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPw2D7wMCcPSNoaIcFh-19HZO7WU-EnGp-Tm80wltPNT97bHRrER8Q3DxnkuhpCHWLbitFcRZNQNRQNkVwY7qXpuUckWQHmJdAUUyxzayeRZZMTWFn6QuC636HksD-lwTH7R08u2htHW2ieEpEJxPo3kyymhgkngv3Ua8MP1RoeAtIwChiq17Nqkf9mTMLq2LQmT_R5SwKu6Ji1Wd_W9JrA6va4EvGS_7Es7wvFbUVgvZg9DpmJ7QZskWUXolsakNxGLUAqIKrs3-E",
    publishedAt: new Date().toISOString(),
    category: "Mədəniyyət",
    tags: ["Mədəniyyət", "Musiqi", "Bakı"],
    views: 4500,
    author: { name: "Nərgiz Məmmədli", role: "Mədəniyyət yazarı", image: "" }
  },
  {
    _id: "8",
    title: "BMT Təhlükəsizlik Şurasının fövqəladə iclası çağırılıb",
    slug: "bmt-tehlukesizlik",
    excerpt: "Qlobal iqlim dəyişikliyi ilə mübarizə və ərzaq təhlükəsizliyi məsələləri iclasın əsas gündəmini təşkil edəcək.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVlu7Wazg3WA-igdLKVsIfH1LE7hsHJRFflQCRE_7g5iQOZfJ5WEPgdvCZOEbSHkpS4xQgk-oDbboj6V7b2MOxqA5pVB_ZgErUIbQj9vxwZXgMMQb82Q4-kCRaow3vy3V4ZHXKXxXBByMk_5mTSI6ixIz1GWXaSerFPzN3ARxbng3dVOmZmUaTRpZ7QSpHTkIeDfLmwC_4wIuaiU1gvj7Yfku9gIhB28e1H0Jv-Tr0l_X9rwIGtRsalyo45Jv1pjAgq82SoJhNwCg2",
    publishedAt: new Date().toISOString(),
    category: "Dünya",
    tags: ["BMT", "Siyasət", "Dünya"],
    views: 11200,
    author: { name: "Foreign Desk", role: "Xarici xəbərlər", image: "" }
  },
   {
    _id: "9",
    title: "Avropa bazarlarında inflyasiya səviyyəsi enməyə başlayıb",
    slug: "avropa-inflyasiya",
    excerpt: "Avropa Mərkəzi Bankının son hesabatına görə, avrozona ölkələrində inflyasiya göstəriciləri azalmağa doğru gedir.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyIaBC39LOVZfYRWEjVie27ne3mo7vP5_7z293uHW2Qt-QGb2mpGvtPDFyTyw2mLQo8NOyUA2bAdEw1uyFS83arV_TKjAc218jAuliicrYIViFGHp03UfBNPziwAMB6J8lkv8mds9eD3R1JUNSxBFEs8aFgozN9DIdqUn9ngA3bvFnOtlaozMgXdrqkUF7vtD6cUIK0nLwt4BzoVTesf_B9oVZ7Le2ml1KwP6ORsHlx1TUJXz88N-awTqH2fZDrJo8oVhmhLniy2lS",
    publishedAt: new Date().toISOString(),
    category: "Dünya",
    tags: ["İqtisadiyyat", "Avropa", "Dünya"],
    views: 3200,
    author: { name: "Foreign Desk", role: "Xarici xəbərlər", image: "" }
  },
  {
    _id: "10",
    title: "Texnologiya nəhəngləri yeni süni intellekt qaydalarını qəbul etdi",
    slug: "texnologiya-ai-qaydalari",
    excerpt: "Böyük texnologiya şirkətləri süni intellektin etik inkişafı üçün birgə bəyannamə imzalayıblar.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuANKq1inO6rozgFbQ_bCldbHDOX20VMJDBuJIKnP0VoszDKMcrZ1TQie47qCQAl8fd2uCzpE1y0WFJ7t0UENYa06yHwNoylbFOygCCu5Y2sfmw7R4JD0kyYofeLehOrdJKz8kY8r1t8KqATBXgRedR2EP5L-XsohRYS23pNTykWm_NmjG-ARz5UZLZm8HcluHpPF3EP_WT5exrcnQbBKn91dONm2E5M-m33ib_Fjr-_Zwvr9iSdRVvn9GYYT9JeDi2nFPuktOQLu_Zh",
    publishedAt: new Date().toISOString(),
    category: "Dünya",
    tags: ["Texnologiya", "AI", "Dünya"],
    views: 4100,
    author: { name: "Aysel Quliyeva", role: "Texnologiya müxbiri", image: "" }
  },
   {
    _id: "11",
    title: "Beynəlxalq ekologiya sammitinin vaxtı dəyişdirildi",
    slug: "ekologiya-sammiti",
    excerpt: "Təşkilat komitəsi sammitin keçiriləcəyi tarixlərdə dəyişiklik edildiyini elan edib.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-1XZw_C2tI4igsuAly-BCqL3Ywg0hQymLL0g4v_YRgsQJDgQVdEg_khkRTr6O94PEdu0q7wmlOhHpbdzJMt5qZ85aPk2mCknyhSFdjxlZ0K3gj8dhjGEYd52XBS8o86z6fEy6ESy9nNhC3IfdAt_LjTLBwP5ENpgPmZT5IA-dYgVVaa_3-PuRkCWlUiYr_tK3KUnqxZLWnss-PpNp0Xl25eD7FbdKU4CSjCTDpLUlXylOAeyqlC0LEZiVrNA7YrlFTlMPwW4gwIxP",
    publishedAt: new Date().toISOString(),
    category: "Dünya",
    tags: ["Ekologiya", "Dünya", "Sammit"],
    views: 2900,
    author: { name: "Samir Kərimov", role: "Müxbir", image: "" }
  },
  // Siyasət Posts for Category Page
  {
    _id: "12",
    title: "Milli Məclisin payız sessiyasının ilk iclası keçirildi: Gündəlikdə hansı məsələlər var?",
    slug: "milli-meclis-payiz-sessiyasi",
    excerpt: "Bu gün Milli Məclisin payız sessiyasının ilk plenar iclası baş tutub. İclasda 20-dən çox qanun layihəsi müzakirəyə çıxarılıb.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2iouApZyH6chHM5cuS_1lCaWqn8WaehPnulml7OfCH8OJm1mStI_lYKXQyJe109olUcDvsF3R1Om_rQ15bICVq40Iwq30nrb3haLxMEQD68CUAwimwMKAqobm2OjXfHFx3PcW4SeNehUKjGezNYXC85CX1ow4ucX5Q6EOUV1oawRREQTVYkGFaHdj66f0iL7n5-z5_dz-PZyMNKIjdz_JyRect91ys4w1mAGyegDVTWYmU07FraYNpM4KMDWtfpVoDreIPqJW19KA",
    publishedAt: new Date().toISOString(),
    category: "Siyasət",
    tags: ["Milli Məclis", "Siyasət", "Qanun"],
    views: 9800,
    author: { name: "Siyasət Şöbəsi", role: "Redaktor", image: "" }
  },
  {
    _id: "13",
    title: "Nazirlər Kabinetindən yeni qərar: Sosial müavinətlər artırılır",
    slug: "nazirler-kabineti-qerar",
    excerpt: "Baş nazir tərəfindən imzalanan yeni qərara əsasən, növbəti aydan etibarən bir sıra sosial müavinətlərin məbləğində artım olacaq.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3SxBqKBndwj_EazHLadh9leHNDGx6vxXM5XX1w2Xw_dkLUlSyvbueVTFVjoF6sp8uWCBsDxV0DrbhIYb6n2krL0bTI8hWxL9682--3TAUIiXkVeQaNtFVFyBuawXJN4OdnQsBKRFoBcpnAW3j8svsWy2080_y08Go9d_akMq3vlvuLhBYtiyARuz7dh6Nj9oHOcpwpYKliCJ4VQxBtBR_LnNsfZNswaxLp9TeeRWQdk2y6rnejBLo9TA1q3vCm_VKAJ9BR7SgHj_Y",
    publishedAt: new Date().toISOString(),
    category: "Siyasət",
    tags: ["Nazirlər Kabineti", "Sosial", "Qərar"],
    views: 7500,
    author: { name: "Siyasət Şöbəsi", role: "Redaktor", image: "" }
  },
  {
     _id: "14",
    title: "Xarici işlər naziri rəsmi səfərə yola düşüb",
    slug: "xin-resmi-sefer",
    excerpt: "Nazir bu gün səhər saatlarında nümayəndə heyəti ilə birlikdə Avropa ölkələrinə rəsmi səfərə yola düşüb.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3XqUlFhdoG70z63Yg4TGQrOyjjYgzk894Ec72gAi4yfO_L4OdIMadXwDJjpyaLvjrIyC42zDX783ZOJLDvpyztOPD0xDvxShIa1QrQfpP__1MBpLjfm5ZvwMCWqWUQhtoITRl7-wRz-mVaM2ZDxReR81xPX4SLRBZ3EQKz8i-Sp6oCh9afUgxyUQ80duW1ekC__mK82TvseKX30XBXJvoY5EOaC4vEqu7z0ZHUyBVJ-5q_96-pfJftFxgJJ99jRUzW4l2u79e1a7l",
    publishedAt: new Date().toISOString(),
    category: "Siyasət",
    tags: ["XİN", "Səfər", "Diplomatiya"],
    views: 6200,
    author: { name: "Siyasət Şöbəsi", role: "Redaktor", image: "" }
  },
  {
      _id: "15",
    title: "Vergi Məcəlləsinə edilən dəyişikliklər təsdiqləndi",
    slug: "vergi-mecellesi-deyisiklik",
    excerpt: "Sahibkarları maraqlandıran yeni vergi güzəştləri və dəyişikliklər rəsmi olaraq qüvvəyə minib.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXjMoCvv9azsb2NDkGan6RdUFBnzaGww9ABCjmlB3SHmyekf4nITz-yhlMIhV90D1p6_bJzX-2Xz6OsviPDJ1lx4Q9cJ9LvNZWXz2pPumCu_eyb-MrzhjEUwRB3xRGawwzmrVRrNfWzHMCSgVYKyRmBG8OYlzAkmUVzQhJ-DNZS8d8FV1SNOIEwFLJuYkSKL8wgo6Vg0YIwZ0flFnJJLUA-U4u4vEd1FPjBn8vWHzCE5YroF4_BUtSxp6HjtVtYh5-2lp1cyxAO2xu",
    publishedAt: new Date().toISOString(),
    category: "Siyasət",
    tags: ["Vergi", "Qanun", "Sahibkar"],
    views: 5900,
    author: { name: "Siyasət Şöbəsi", role: "Redaktor", image: "" }
  },
  {
       _id: "16",
    title: "Mərkəzi Seçki Komissiyasından bələdiyyə seçkiləri ilə bağlı açıqlama",
    slug: "msk-belediyye-seckileri",
    excerpt: "MSK sədri növbəti bələdiyyə seçkilərinin keçiriləcəyi tarix və hazırlıq prosesi barədə məlumat verib.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl1DCoT02D5sNgOuCT93JlqdH_iTO-S5F_21faHc6BgG9waI0PpytM6mQ1qzD_3XXilmKdr1hjThRcFTzqLsjoh1D79eYz0TI7q2xUNtSoWJQlJuznQVNn446aIA0KSQGwtK_hfU2p3S_63OLzU_mw21wLBX9SP4lR00pfUMv-9Sa025SCwSIJFoezjyRHG6LalJdwttwS-JGYRF5sErZT-aBMphdjyDQhm43gC8A9I6WGOhBOf174YbbBO3q0NVcwLLiHWlUtrlv6",
    publishedAt: new Date().toISOString(),
    category: "Siyasət",
    tags: ["MSK", "Seçki", "Bələdiyyə"],
    views: 4800,
    author: { name: "Siyasət Şöbəsi", role: "Redaktor", image: "" }
  }
];

// --- Data Fetching ---

export async function getCategories(): Promise<CategoryType[]> {
  try {
    const db = await connectDB();
    if (db) {
       const categories = await Category.find().sort({ order: 1 });
       if (categories.length > 0) return JSON.parse(JSON.stringify(categories));
    }
    // Fallback Mock Categories
    return MOCK_CATEGORIES.map((name, index) => ({
        _id: `cat-${index}`,
        name,
        slug: name.toLowerCase().replace(/ə/g, 'e').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g'),
        order: index
    }));
  } catch (error) {
    console.error("Error fetching categories (using mock):", error);
    // Fallback Mock Categories
    return MOCK_CATEGORIES.map((name, index) => ({
        _id: `cat-${index}`,
        name,
        slug: name.toLowerCase().replace(/ə/g, 'e').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g'),
        order: index
    }));
  }
}

export async function getPosts(): Promise<PostType[]> {
  try {
    const db = await connectDB();
    if (db) {
       const posts = await Post.find().sort({ publishedAt: -1 });
       if (posts.length > 0) return JSON.parse(JSON.stringify(posts));
    }
    // Fallback to Mock Data if DB is empty or fails
    return MOCK_POSTS;
  } catch (error) {
    console.error("Error fetching posts (using mock):", error);
    return MOCK_POSTS;
  }
}

export async function getPostBySlug(slug: string): Promise<PostType | null> {
    try {
        const db = await connectDB();
        if (db) {
           const post = await Post.findOne({ slug });
           if (post) return JSON.parse(JSON.stringify(post));
        }
        // Fallback
        return MOCK_POSTS.find(p => p.slug === slug) || null;
    } catch (error) {
        console.error("Error fetching post by slug (using mock):", error);
        return MOCK_POSTS.find(p => p.slug === slug) || null;
    }
}

export async function getPostsByCategory(category: string): Promise<PostType[]> {
  try {
    const db = await connectDB();
    if (db) {
       const posts = await Post.find({
         category: { $regex: new RegExp(`^${category}$`, "i") }
       }).sort({ publishedAt: -1 });
       if (posts.length > 0) return JSON.parse(JSON.stringify(posts));
    }

    // Fallback
    return MOCK_POSTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
  } catch (error) {
    console.error("Error fetching posts by category (using mock):", error);
    return MOCK_POSTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
}

export async function getRelatedPosts(category: string, currentId: string): Promise<PostType[]> {
  try {
    const db = await connectDB();
    if (db) {
        const posts = await Post.find({
            category: { $regex: new RegExp(`^${category}$`, "i") },
            _id: { $ne: currentId }
        })
        .sort({ publishedAt: -1 })
        .limit(4);
        if (posts.length > 0) return JSON.parse(JSON.stringify(posts));
    }

    // Fallback
    return MOCK_POSTS
        .filter(p => p.category.toLowerCase() === category.toLowerCase() && p._id !== currentId)
        .slice(0, 4);
  } catch (error) {
    console.error("Error fetching related posts (using mock):", error);
    return MOCK_POSTS
        .filter(p => p.category.toLowerCase() === category.toLowerCase() && p._id !== currentId)
        .slice(0, 4);
  }
}

export async function incrementViews(slug: string) {
  try {
    const db = await connectDB();
    if (!db) return;

    await Post.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } }
    );
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
}

// --- MongoDB Actions ---

export async function seedDatabase() {
    try {
        const db = await connectDB();
        if (!db) return { success: false, message: "DB Connection failed" };

        // 1. Seed Categories
        const countCategories = await Category.countDocuments();
        if (countCategories === 0) {
            console.log("Seeding categories...");
            const categoryDocs = MOCK_CATEGORIES.map((name, index) => ({
                name,
                slug: name.toLowerCase().replace(/ə/g, 'e').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g'),
                order: index
            }));
            await Category.insertMany(categoryDocs);
        }

        // 2. Seed Posts
        const countPosts = await Post.countDocuments();
        if (countPosts === 0) {
             console.log("Seeding posts...");
             // Remove _id for creation to let Mongo generate it
             const postsToSeed = MOCK_POSTS.map(({ _id, ...rest }) => rest);
             await Post.insertMany(postsToSeed);
        }

        return { success: true, message: "Database seeded successfully" };

    } catch (error) {
        console.error("Seeding error:", error);
        return { success: false, message: "Seeding failed" };
    }
}

export async function submitComment(postId: string, formData: FormData) {
  try {
    const db = await connectDB();
    if (!db) return { success: false, message: "Database connection failed" };

    const content = formData.get("content") as string;
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const email = formData.get("email") as string;

    if (!content || !name || !surname || !email) {
      return { success: false, message: "Bütün xanaları doldurun (Ad, Soyad, Email, Rəy)" };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Düzgün email ünvanı daxil edin" };
    }

    // Generate avatar using initials
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name + " " + surname)}&background=random`;

    await Comment.create({
      postId,
      name,
      surname,
      email,
      avatar,
      content,
      isApproved: false, // Explicitly pending
    });

    return { success: true, message: "Şərhiniz göndərildi və təsdiq gözləyir." };
  } catch (error) {
    console.error("Error submitting comment:", error);
    return { success: false, message: "Xəta baş verdi" };
  }
}

export async function getComments(postId: string) {
    try {
        const db = await connectDB();
        if (!db) return [];

        // Only get approved comments
        const comments = await Comment.find({ postId, isApproved: true }).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(comments));
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
}

export async function subscribeNewsletter(formData: FormData) {
  try {
    const db = await connectDB();
    if (!db) return { success: true, message: "Abunə oldunuz! (Demo)" };

    const email = formData.get("email") as string;

    if (!email) return { success: false, message: "Email daxil edin" };

    // Check if exists
    const existing = await Subscriber.findOne({ email });
    if (existing) {
        return { success: true, message: "Artıq abunə olmusunuz" };
    }

    await Subscriber.create({ email });
    return { success: true, message: "Abunə oldunuz!" };
  } catch (error) {
    console.error("Error subscribing:", error);
    return { success: true, message: "Abunə oldunuz! (Demo)" };
  }
}
