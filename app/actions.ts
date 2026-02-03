"use server";

import connectDB from "@/lib/db";
import Comment from "@/models/Comment";
import Subscriber from "@/models/Subscriber";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

// --- Types ---

export interface MockPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: { asset: { url: string }; alt?: string };
  publishedAt: string;
  category?: string;
  author?: { name: string; image?: string; role?: string };
}

// --- Data Fetching ---

export async function getPosts(): Promise<MockPost[]> {
  try {
    const posts = await client.fetch(
      groq`*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        mainImage {
          asset->{
            url
          },
          alt
        },
        publishedAt,
        "category": categories[0]->title,
        author->{
          name,
          "image": image.asset->url,
          role
        }
      }`
    );

    // Fallback to mock data if Sanity is empty (for demo purposes)
    if (!posts || posts.length === 0) {
      console.log("No posts found in Sanity, returning mock data.");
      return getMockPosts();
    }

    return posts;
  } catch (error) {
    console.error("Error fetching posts from Sanity:", error);
    return getMockPosts(); // Fallback on error
  }
}

function getMockPosts(): MockPost[] {
  return [
    {
      _id: "1",
      title: "Milli Məclisin payız sessiyasının ilk iclası keçirildi: Gündəlikdə hansı məsələlər var?",
      slug: { current: "milli-meclis-payiz-sessiyasi" },
      excerpt:
        "Bu gün Milli Məclisin payız sessiyasının ilk plenar iclası baş tutub. İclasda 20-dən çox qanun layihəsi müzakirəyə çıxarılıb və mühüm qərarlar qəbul edilib.",
      mainImage: {
        asset: {
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2iouApZyH6chHM5cuS_1lCaWqn8WaehPnulml7OfCH8OJm1mStI_lYKXQyJe109olUcDvsF3R1Om_rQ15bICVq40Iwq30nrb3haLxMEQD68CUAwimwMKAqobm2OjXfHFx3PcW4SeNehUKjGezNYXC85CX1ow4ucX5Q6EOUV1oawRREQTVYkGFaHdj66f0iL7n5-z5_dz-PZyMNKIjdz_JyRect91ys4w1mAGyegDVTWYmU07FraYNpM4KMDWtfpVoDreIPqJW19KA",
        },
      },
      publishedAt: new Date().toISOString(),
      category: "Siyasət",
    },
    {
      _id: "2",
      title: "Nazirlər Kabinetindən yeni qərar: Sosial müavinətlər artırılır",
      slug: { current: "nazirler-kabineti-sosial-muavinetler" },
      excerpt:
        "Baş nazir tərəfindən imzalanan yeni qərara əsasən, növbəti aydan etibarən bir sıra sosial müavinətlərin məbləğində artım olacaq.",
      mainImage: {
        asset: {
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3SxBqKBndwj_EazHLadh9leHNDGx6vxXM5XX1w2Xw_dkLUlSyvbueVTFVjoF6sp8uWCBsDxV0DrbhIYb6n2krL0bTI8hWxL9682--3TAUIiXkVeQaNtFVFyBuawXJN4OdnQsBKRFoBcpnAW3j8svsWy2080_y08Go9d_akMq3vlvuLhBYtiyARuz7dh6Nj9oHOcpwpYKliCJ4VQxBtBR_LnNsfZNswaxLp9TeeRWQdk2y6rnejBLo9TA1q3vCm_VKAJ9BR7SgHj_Y",
        },
      },
      publishedAt: new Date().toISOString(),
      category: "Daxili Siyasət",
    },
     {
      _id: "3",
      title: "Xarici işlər naziri rəsmi səfərə yola düşüb",
      slug: { current: "xarici-isler-naziri-sefer" },
      excerpt: "Nazir bu gün səhər saatlarında nümayəndə heyəti ilə birlikdə Avropa ölkələrinə rəsmi səfərə yola düşüb.",
      mainImage: {
        asset: {
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3XqUlFhdoG70z63Yg4TGQrOyjjYgzk894Ec72gAi4yfO_L4OdIMadXwDJjpyaLvjrIyC42zDX783ZOJLDvpyztOPD0xDvxShIa1QrQfpP__1MBpLjfm5ZvwMCWqWUQhtoITRl7-wRz-mVaM2ZDxReR81xPX4SLRBZ3EQKz8i-Sp6oCh9afUgxyUQ80duW1ekC__mK82TvseKX30XBXJvoY5EOaC4vEqu7z0ZHUyBVJ-5q_96-pfJftFxgJJ99jRUzW4l2u79e1a7l"
        }
      },
      publishedAt: new Date().toISOString(),
      category: "Xarici Əlaqələr"
    },
    {
      _id: "4",
      title: "Azərbaycanda Rəqəmsal İnkişafın Yeni Mərhələsi: Gələcəyə Baxış",
      slug: { current: "azerbaycanda-reqemsal-inkisaf" },
      excerpt: "Rəqəmsal transformasiya ölkə iqtisadiyyatına necə təsir edəcək? Ekspertlər yeni strategiyanın detallarını açıqlayır.",
      mainImage: {
        asset: {
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1Mwh3c0p0eTWZWXigwacKtt1KKu8i0fFnJT4xpPfwD05ZKkSmGkXRtj2KFGuzasu3W0n-rHYHecGgqYt9Srr5l5uiZdaZ4u0Po6Csz8pKzp6vVTWy2cAfouVioQBoiP0EvG7C0qAEhCsdkzjhXZvXej6SC4dHn1VZ4OXsFLr_gJc6aHymukdrFL2fAmSToBrGGv_6k0TAk-qKlY9JwQ79c3aPXs71bvRA7xvGW9dslRNBaMWXMg1Qnw2SoPhJx3VGohonLx9MaZ1C",
        },
      },
      publishedAt: new Date().toISOString(),
      category: "Texnologiya",
      author: {
        name: "Elvin Məmmədov",
        role: "Texnologiya redaktoru",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBIPPlVvRjV4el6HzRbIouevV1t3GK-908hMyw35ZsnSQivytzbW9qSQKJqDm8NHkFpYt0BH-bhq_9zXIgXx2x_BZUx4jdX16W8AW9CvR-INANzYe6n948j-FPPvR-zVPuVwdNrFha6hurcoRHRcGO8_KoYV1EPNVlnI8JmNyJNzk2c-tW12alJl_dEbLEkosMvixKC1swl4aH6eDObtQYhhoFaSgL58Y1KQPX_4CNReKpLceTiKZJiPpj32SalmDS0W2h-03DaAAk"
      }
    },
  ];
}

// --- MongoDB Actions ---

export async function submitComment(postId: string, formData: FormData) {
  try {
    await connectDB();
    const content = formData.get("content") as string;
    // Hardcoded user for now, in real app would come from auth
    const name = "Qonaq İstifadəçi";
    const avatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuABbuG7cHMZv1AKPwkzJIOpcZdD6Lo_c0IkqeuXbXFdDSvXVPBgvJ3votw72Mav_WiSJ4eq6fIlTMBwj47M2ZveowX6ndS5kFo_dFcSn9_mQDyBjuKaFFyPaRIBmeYmraS8mgWJoACge-ZUuXbMdj-EfoRhEqVOJwrkT2zguRxAL_-g5OwcpHtZBvMOGLJJADyN1iVpLoaVhqr_E1FBMpNWxU-pV0Fovwc2FTB06umgQTwj1EgPz2HMTlRmPST3MsnrNCoRp8ef3voA";

    if (!content) return { success: false, message: "Şərh boş ola bilməz" };

    await Comment.create({
      postId,
      name,
      avatar,
      content,
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting comment:", error);
    return { success: false, message: "Xəta baş verdi" };
  }
}

export async function getComments(postId: string) {
    try {
        await connectDB();
        const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(comments));
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
}

export async function subscribeNewsletter(formData: FormData) {
  try {
    await connectDB();
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
    return { success: false, message: "Xəta baş verdi" };
  }
}
