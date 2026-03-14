import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, ArrowLeft, Clock, Tag } from "lucide-react";

export const revalidate = 3600;

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
    .select("title, slug, excerpt, featured_image, created_at")
    .neq("slug", currentSlug)
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(3);
  return data || [];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Yazı Bulunamadı" };
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    keywords: post.focus_keyword ? [post.focus_keyword, "pilates", "sağlık"] : undefined,
    alternates: { canonical: `https://pilatestopu-next.vercel.app/blog/${slug}` },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      type: "article",
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at,
      url: `https://pilatestopu-next.vercel.app/blog/${slug}`,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const relatedPosts = await getRelatedPosts(slug);
  const readTime = Math.max(1, Math.ceil((post.content?.length || 0) / 1000));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.featured_image || undefined,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: { "@type": "Organization", name: "PilatesTopu" },
    publisher: {
      "@type": "Organization",
      name: "PilatesTopu",
      logo: { "@type": "ImageObject", url: "https://www.pilatestopu.com/wp-content/uploads/2025/04/Pilates-Topu.png" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://pilatestopu-next.vercel.app/blog/${slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://pilatestopu-next.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://pilatestopu-next.vercel.app/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="bg-gradient-to-b from-[#F2DFF4] to-white py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#730EC3]">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#730EC3]">Blog</Link>
            <span>/</span>
            <span className="text-[#730EC3] font-medium truncate max-w-[200px]">{post.title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.created_at).toLocaleDateString("tr-TR")}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{readTime} dk okuma</span>
            {post.focus_keyword && <span className="flex items-center gap-1"><Tag className="w-4 h-4" />{post.focus_keyword}</span>}
          </div>
        </div>
      </section>

      <article className="container mx-auto px-4 max-w-4xl py-10">
        {post.featured_image && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img src={post.featured_image} alt={post.title} className="w-full h-auto object-cover" />
          </div>
        )}
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-[#730EC3] prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">İlgili Yazılar</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rp: any) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  {rp.featured_image && <img src={rp.featured_image} alt={rp.title} className="w-full h-40 object-cover" />}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#730EC3] transition-colors line-clamp-2">{rp.title}</h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{rp.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 max-w-4xl py-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#730EC3] hover:underline font-medium">
          <ArrowLeft className="w-4 h-4" /> Tüm Yazılara Dön
        </Link>
      </div>
    </>
  );
}
