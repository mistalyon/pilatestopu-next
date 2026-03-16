import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Calendar, ArrowRight } from "lucide-react";

export const revalidate = 60;

const DEFAULT_BLOG_IMAGE = "https://www.pilatestopu.com/wp-content/uploads/2022/06/aletli-pilates.png";
const SITE_URL = "https://pilatestopu.com";

export const metadata: Metadata = {
  title: "Pilates Blog: Egzersizler, Rehberler ve Beslenme Önerileri",
  description:
    "Pilates hakkında her şey: reformer pilates, mat pilates egzersizleri, beslenme önerileri, hamile pilatesi ve zayıflama rehberleri.",
  keywords: ["pilates blog", "pilates rehberi", "reformer pilates", "pilates egzersizleri", "pilates beslenme"],
  alternates: { canonical: SITE_URL + "/blog" },
  openGraph: {
    title: "Pilates Blog: Egzersizler, Rehberler ve Beslenme Önerileri",
    description: "Pilates hakkında her şey: reformer pilates, mat pilates, beslenme ve daha fazlası.",
    url: SITE_URL + "/blog",
    type: "website",
    siteName: "PilatesTopu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pilates Blog: Egzersizler, Rehberler ve Beslenme Önerileri",
    description: "Pilates hakkında her şey: reformer pilates, mat pilates ve daha fazlası.",
  },
};

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, image_url, created_at, focus_keyword")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Pilates Blog",
    description: "Pilates hakkında egzersizler, rehberler ve uzman içerikleri.",
    url: SITE_URL + "/blog",
    isPartOf: { "@type": "WebSite", name: "PilatesTopu", url: SITE_URL },
    inLanguage: "tr",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts?.length || 0,
      itemListElement: (posts || []).map(function (p: any, i: number) {
        return { "@type": "ListItem", position: i + 1, url: SITE_URL + "/blog/" + p.slug, name: p.title };
      }),
    },
  };

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-gradient-to-r from-[#730EC3] to-[#E91E90] py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm text-white/80 mb-2">Ana Sayfa / Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pilates Blog</h1>
          <p className="text-lg text-white/90">Pilates dünyasından yazılar, rehberler ve öneriler</p>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map(function (post: any) {
            return (
              <Link key={post.id} href={"/blog/" + post.slug} className="group block">
                <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image src={post.image_url || DEFAULT_BLOG_IMAGE} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    {post.focus_keyword && (
                      <span className="absolute top-3 left-3 bg-[#730EC3] text-white text-xs px-3 py-1 rounded-full font-medium">{post.focus_keyword}</span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#730EC3] transition-colors mb-3 line-clamp-2">{post.title}</h2>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#730EC3] font-medium group-hover:gap-2 transition-all">
                        Devamı <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
