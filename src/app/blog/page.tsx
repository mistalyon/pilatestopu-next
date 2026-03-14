import { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Calendar, ArrowRight } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Pilates Blog | Rehber & Bilgiler - PilatesTopu",
  description: "Pilates hakkında her şey: egzersizler, beslenme, reformer pilates, hamile pilatesi ve daha fazlası. Uzman rehber yazıları.",
  keywords: ["pilates blog", "pilates rehberi", "reformer pilates", "pilates egzersizleri", "pilates beslenme"],
  alternates: { canonical: "https://pilatestopu-next.vercel.app/blog" },
  openGraph: {
    title: "Pilates Blog | Rehber & Bilgiler",
    description: "Pilates hakkında her şey: egzersizler, beslenme, reformer pilates ve daha fazlası.",
    url: "https://pilatestopu-next.vercel.app/blog",
  },
};

async function getPosts() {
  const { data } = await supabase
    .from("blog_posts")
    .select("title, slug, excerpt, featured_image, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  return data || [];
}

export default async function BlogPage() {
  const posts = await getPosts();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://pilatestopu-next.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Blog" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="bg-gradient-to-r from-[#730EC3] via-purple-600 to-[#E91E90] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-purple-200 mb-6">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white font-medium">Blog</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pilates Blog</h1>
          <p className="text-xl text-purple-100">Pilates dünyasından yazılar, rehberler ve öneriler</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-12">Henüz yazı yayınlanmamış.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border overflow-hidden"
              >
                {post.featured_image && (
                  <div className="overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#730EC3] transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
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
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
