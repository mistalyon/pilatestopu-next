import Link from 'next/link';

const blogPosts = [
  {
    title: 'Pilates ile Zayiflama: Bilmeniz Gereken Her Sey',
    excerpt: 'Pilates ile kilo vermenin en etkili yollarini kesfetmek icin rehberimizi okuyun.',
    slug: 'pilates-ile-zayiflama',
    category: 'Pilates Zayiflama',
  },
  {
    title: 'Reformer Pilates Nedir? Faydalari Nelerdir?',
    excerpt: 'Reformer pilates hakkinda merak ettiginiz tum detaylar bu yazimizda.',
    slug: 'reformer-pilates-nedir',
    category: 'Reformer ve Aletli Pilates',
  },
  {
    title: 'Hamilelikte Pilates Yapilir mi?',
    excerpt: 'Hamilelikte pilates yapmanin faydalari ve dikkat edilmesi gerekenler.',
    slug: 'hamilelikte-pilates',
    category: 'Hamile Pilatesi',
  },
];

export default function BlogPreviewSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Son Blog Yazilari</h2>
          <Link href="/blog" className="text-purple-700 hover:text-purple-800 font-medium">
            Tumu &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group">
                <div className="bg-gray-100 rounded-xl h-48 mb-4"></div>
                <span className="text-xs text-purple-600 font-medium">{post.category}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2 group-hover:text-purple-700">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
