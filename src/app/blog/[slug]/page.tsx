import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Calendar, ArrowLeft, Clock, Tag } from "lucide-react";

export const revalidate = 3600;

const DEFAULT_IMG = "/images/default-blog.svg";
const SITE_URL = "https://www.pilatestopu.com";

async function getPost(slug: string) {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

async function getRelatedPosts(currentSlug: string) {
  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, image_url, focus_keyword")
    .eq("status", "published")
    .neq("slug", currentSlug)
    .order("created_at", { ascending: false })
    .limit(3);
  return data || [];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Yazı Bulunamadı" };
  const imgUrl = post.image_url || DEFAULT_IMG;
  return {
    title: post.title,
    description: post.meta_description || post.excerpt,
    keywords: post.focus_keyword ? post.focus_keyword.split(",").map(function(k: string) { return k.trim(); }) : [],
    authors: [{ name: "PilatesTopu" }],
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt,
      url: SITE_URL + "/blog/" + post.slug,
      siteName: "PilatesTopu",
      images: [{ url: imgUrl, width: 1024, height: 680, alt: post.title }],
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.meta_description || post.excerpt,
      images: [imgUrl],
    },
    alternates: {
      canonical: SITE_URL + "/blog/" + post.slug,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  const wordCount = (post.content || "").split(" ").length;
  const readTime = Math.ceil(wordCount / 200);
  const relatedPosts = await getRelatedPosts(params.slug);
  const imgSrc = post.image_url || DEFAULT_IMG;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: imgSrc,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: { "@type": "Organization", name: "PilatesTopu", url: SITE_URL },
    publisher: { "@type": "Organization", name: "PilatesTopu", logo: { "@type": "ImageObject", url: "/images/logo.svg" } },
    mainEntityOfPage: { "@type": "WebPage", "@id": SITE_URL + "/blog/" + post.slug },
    wordCount: wordCount,
    keywords: post.focus_keyword || "",
    articleSection: "Pilates",
    inLanguage: "tr-TR",
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: SITE_URL + "/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: SITE_URL + "/blog/" + post.slug },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="bg-gradient-to-r from-[#730EC3] to-[#E91E90] py-10 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <span>/</span>
            <span className="text-white font-medium truncate max-w-[200px]">{post.title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{readTime} dk okuma</span>
            {post.focus_keyword && <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full"><Tag className="w-3 h-3" />{post.focus_keyword}</span>}
          </div>
        </div>
      </section>

      <article className="container mx-auto px-4 max-w-4xl py-10">
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          <Image src={imgSrc} alt={post.title} width={1024} height={680} className="w-full h-auto object-cover" priority />
        </div>
        {post.content && (
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-a:text-[#730EC3] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-img:rounded-xl prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-white py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">İlgili Yazılar</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(function(rp: any) {
                return (
                  <Link key={rp.id} href={"/blog/" + rp.slug} className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-all">
                    <div className="relative h-40 w-full">
                      <Image src={rp.image_url || DEFAULT_IMG} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#730EC3] transition-colors line-clamp-2">{rp.title}</h3>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{rp.excerpt}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 max-w-4xl py-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#730EC3] hover:underline font-medium">
          <ArrowLeft className="w-4 h-4" />
          Tüm Yazılara Dön
        </Link>
      </div>
    </main>
  );
}
