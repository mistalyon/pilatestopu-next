import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pilates Blog | Egzersizler, Ipuclari ve Rehberler - PilatesTopu",
  description: "Pilates hakkinda en guncel blog yazilari. Reformer pilates, mat pilates, hamile pilatesi, beslenme ve zayiflama rehberleri.",
  keywords: "pilates blog, pilates egzersizleri, reformer pilates, mat pilates, pilates zayiflama",
};

const blogPosts = [
  {
    slug: "pilates-ile-zayiflama",
    title: "Pilates ile Zayiflama: Bilmeniz Gereken Her Sey",
    excerpt: "Pilates ile kilo vermenin en etkili yollarini kesfetmek icin rehberimizi okuyun. Hangi pilates turleri zayiflamaya yardimci olur?",
    category: "Pilates Zayiflama",
    date: "2025-03-10",
    image: "/images/blog/pilates-zayiflama.jpg",
  },
  {
    slug: "reformer-pilates-nedir",
    title: "Reformer Pilates Nedir? Faydalari Nelerdir?",
    excerpt: "Reformer pilates hakkinda merak ettiginiz tum detaylar bu yazimizda. Reformer pilates nasil yapilir, faydalari nelerdir?",
    category: "Reformer ve Aletli Pilates",
    date: "2025-03-08",
    image: "/images/blog/reformer-pilates.jpg",
  },
  {
    slug: "hamilelikte-pilates",
    title: "Hamilelikte Pilates Yapilir mi?",
    excerpt: "Hamilelikte pilates yapmanin faydalari ve dikkat edilmesi gerekenler. Uzman gorusleri ile hamile pilatesi rehberi.",
    category: "Hamile Pilatesi",
    date: "2025-03-05",
    image: "/images/blog/hamile-pilates.jpg",
  },
  {
    slug: "mat-pilates-egzersizleri",
    title: "Evde Yapilabilecek 10 Mat Pilates Egzersizi",
    excerpt: "Evde kolayca yapabilceginiz mat pilates egzersizleri ile formda kalin. Baslangic seviyesinden ileri seviyeye egzersizler.",
    category: "Pilates Egzersizleri",
    date: "2025-02-28",
    image: "/images/blog/mat-pilates.jpg",
  },
  {
    slug: "klinik-pilates-nedir",
    title: "Klinik Pilates Nedir? Kimlere Uygulanir?",
    excerpt: "Klinik pilates, fizyoterapist esliginde yapilan rehabilitasyon amacli pilates. Bel fitigi, skolyoz ve daha fazlasi icin.",
    category: "Fizyoterapi",
    date: "2025-02-25",
    image: "/images/blog/klinik-pilates.jpg",
  },
  {
    slug: "pilates-ve-beslenme",
    title: "Pilates Yaparken Nasil Beslenmeli?",
    excerpt: "Pilates oncesi ve sonrasi beslenme onerileri. Performansinizi artirmak icin dogru besinler ve su tuketimi.",
    category: "Pilates ve Beslenme",
    date: "2025-02-20",
    image: "/images/blog/pilates-beslenme.jpg",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pilates Blog</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Pilates hakkinda en guncel bilgiler, egzersiz rehberleri ve uzman ipuclari
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-50" />
              <div className="p-6">
                <span className="text-sm font-medium text-purple-600">{post.category}</span>
                <h2 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-purple-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <time className="text-sm text-gray-500">{post.date}</time>
                  <Link href={`/blog/${post.slug}`} className="text-purple-600 font-medium hover:text-purple-700">
                    Devamini Oku &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
