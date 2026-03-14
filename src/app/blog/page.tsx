import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Pilates Blog | Rehber & Bilgiler - PilatesTopu",
  description: "Pilates hakkında yazılar, egzersiz rehberleri, sağlık bilgileri ve uzman önerileri. PilatesTopu Blog.",
};

async function getBlogPosts() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, featured_image, published_at, created_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) {
    console.error("Blog posts error:", error);
    return [];
  }
  return data || [];
}

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pilates Blog</h1>
          <p className="text-xl text-purple-100">Pilates dünyasından yazılar, rehberler ve öneriler</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {post.featured_image && (
                  <div className="aspect-video bg-purple-100 overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mt-1 mb-2 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-3">
                    {new Date(post.published_at || post.created_at).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Blog yazıları yakında eklenecektir.</p>
          </div>
        )}
      </section>
    </main>
  );
}
