import Link from 'next/link';

const posts = [
  {
    slug: 'pilates-ile-zayiflama',
    category: 'Pilates Zayıflama',
    title: 'Pilates ile Zayıflama: Bilmeniz Gereken Her Şey',
    excerpt: 'Pilates ile kilo vermenin en etkili yollarını keşfetmek için rehberimizi okuyun.',
  },
  {
    slug: 'reformer-pilates-nedir',
    category: 'Reformer Pilates',
    title: 'Reformer Pilates Nedir? Tam Rehber',
    excerpt: 'Reformer pilatesin faydaları, nasıl yapıldığı ve kimler için uygun olduğu.',
  },
  {
    slug: 'hamile-pilatesi-rehberi',
    category: 'Hamile Pilatesi',
    title: 'Hamile Pilatesi: Güvenli Egzersiz Rehberi',
    excerpt: 'Hamilelikte pilates yapmanın faydaları ve dikkat edilmesi gerekenler.',
  },
];

export default function BlogPreviewSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Blog Yazıları</h2>
        <p className="text-gray-600 text-center mb-12">Pilates hakkında en güncel bilgiler ve rehberler</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow h-full">
                <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold mt-4 mb-2 group-hover:text-purple-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900">
            Tüm Yazıları Görüntüle →
          </Link>
        </div>
      </div>
    </section>
  );
}
