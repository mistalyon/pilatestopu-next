import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

async function getPost(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, categories(name, slug)")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return data;
}

async function getRelatedPosts(categoryId: string, currentId: string) {
  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, featured_image")
    .eq("category_id", categoryId)
    .neq("id", currentId)
    .eq("status", "published")
    .limit(3);
  return data || [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return { title: "Yazı Bulunamadı - PilatesTopu" };
  }
  return {
    title: post.meta_title || `${post.title} | PilatesTopu Blog`,
    description: post.meta_description || post.excerpt || "",
    keywords: post.focus_keyword || "",
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = post.category_id ? await getRelatedPosts(post.category_id, post.id) : [];

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm text-purple-200 mb-4">
            <Link href="/" className="hover:text-white">Anasayfa</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{post.title}</span>
          </nav>
          {post.categories && (
            <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm mb-3">
              {(post.categories as any).name}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-white">{post.title}</h1>
          {post.published_at && (
            <p className="text-purple-200 mt-3">
              {new Date(post.published_at).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {post.featured_image && (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full rounded-xl mb-8 max-h-96 object-cover"
          />
        )}

        {post.content ? (
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : post.excerpt ? (
          <div className="prose prose-lg max-w-none">
            <p>{post.excerpt}</p>
            <p className="text-gray-500 italic">Tam içerik yakında eklenecektir.</p>
          </div>
        ) : (
          <p className="text-gray-500">İçerik yakında eklenecektir.</p>
        )}
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">İlgili Yazılar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-900 mb-2">{rp.title}</h3>
                  {rp.excerpt && <p className="text-gray-600 text-sm line-clamp-2">{rp.excerpt}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
