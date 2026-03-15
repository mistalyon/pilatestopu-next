import { Metadata } from "next";
import Link from "next/link";
import { Target, Users, MapPin, Heart } from "lucide-react";

const SITE_URL = "https://pilatestopu-next.vercel.app";

export const metadata: Metadata = {
  title: "Hakkımızda – Türkiye'nin Pilates Rehberi",
  description:
    "PilatesTopu, Türkiye genelinde 81 ilde pilates salonlarını, eğitmenlerini ve ekipmanlarını keşfetmenizi sağlayan ücretsiz rehber platformudur. 500+ salon, 9 pilates türü.",
  alternates: { canonical: SITE_URL + "/hakkimizda" },
  openGraph: {
    title: "Hakkımızda – Türkiye'nin Pilates Rehberi",
    description:
      "PilatesTopu, Türkiye genelinde pilates salonlarını ve eğitmenlerini keşfetmenizi sağlayan ücretsiz rehber platformudur.",
    url: SITE_URL + "/hakkimizda",
    type: "website",
    siteName: "PilatesTopu",
  },
};

const stats = [
  { icon: MapPin, value: "81", label: "İl" },
  { icon: Users, value: "500+", label: "Salon" },
  { icon: Target, value: "9", label: "Pilates Türü" },
  { icon: Heart, value: "7/24", label: "Destek" },
];

export default function HakkimizdaPage() {
  const aboutLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "PilatesTopu Hakkında",
    description:
      "Türkiye'nin en kapsamlı pilates rehberi. 81 ilde pilates salonları, eğitmenler ve ekipmanlar.",
    url: SITE_URL + "/hakkimizda",
    isPartOf: { "@type": "WebSite", name: "PilatesTopu", url: SITE_URL },
    mainEntity: {
      "@type": "Organization",
      name: "PilatesTopu",
      url: SITE_URL,
      description:
        "Türkiye'nin en büyük pilates platformu. 81 ilde salonlar, eğitmenler ve dersler.",
      foundingDate: "2022",
      areaServed: { "@type": "Country", name: "Türkiye" },
      sameAs: [],
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hakkımızda",
        item: SITE_URL + "/hakkimizda",
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="bg-gradient-to-r from-[#730EC3] to-[#E91E90] py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-lg text-white/90">
            Türkiye&apos;nin en kapsamlı pilates platformu
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map(function (s) {
            return (
              <div
                key={s.label}
                className="text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
              >
                <s.icon className="w-8 h-8 text-[#730EC3] mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">{s.value}</p>
                <p className="text-gray-500 text-sm">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto space-y-6 text-gray-600 leading-relaxed">
          <h2 className="text-2xl font-bold text-gray-900">Biz Kimiz?</h2>
          <p>
            PilatesTopu, Türkiye genelinde pilates salonlarını, eğitmenlerini ve
            derslerini keşfetmenizi sağlayan kapsamlı bir rehber platformudur. 81 ilde
            bulunan yüzlerce pilates stüdyosunu karşılaştırın, sizin
            için en uygun olanı bulun.
          </p>
          <h2 className="text-2xl font-bold text-gray-900">Misyonumuz</h2>
          <p>
            Reformer pilates, mat pilates, klinik pilates ve daha fazlası hakkında
            doğru ve güncel bilgiye ulaşmanızı sağlıyoruz. Uzman
            içeriklerimiz, egzersiz rehberlerimiz ve beslenme önerilerimizle
            sağlıklı yaşam yolculuğunuzda yanınızdayız.
          </p>
          <h2 className="text-2xl font-bold text-gray-900">İşletmenize Katılın</h2>
          <p>
            Pilates stüdyonuzu platformumuza ekleyerek binlerce potansiyel müşteriye
            ulaşın. İş ortaklığı başvurusu için hemen
            iletişime geçin.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link
              href="/iletisim"
              className="bg-[#730EC3] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#5c0b9c] transition text-center"
            >
              İletişime Geçin
            </Link>
            <Link
              href="/is-ortakligi"
              className="border-2 border-[#730EC3] text-[#730EC3] px-8 py-3 rounded-full font-semibold hover:bg-[#730EC3] hover:text-white transition text-center"
            >
              İş Ortaklığı Başvurusu
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
import { Metadata } from "next";
import Link from "next/link";
import { Target, Users, MapPin, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | PilatesTopu - Türkiye'nin Pilates Rehberi",
  description: "PilatesTopu, Türkiye genelinde pilates salonlarını, eğitmenlerini ve ekipmanlarını keşfetmenizi sağlayan ücretsiz bir rehber platformudur.",
  alternates: { canonical: "https://pilatestopu-next.vercel.app/hakkimizda" },
};

const stats = [
  { icon: MapPin, value: "81", label: "İl" },
  { icon: Users, value: "500+", label: "Salon" },
  { icon: Target, value: "9", label: "Pilates Türü" },
  { icon: Heart, value: "7/24", label: "Destek" },
];

export default function HakkimizdaPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#F2DFF4] to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Hakkımızda</h1>
          <p className="text-gray-600 text-lg">Türkiye’nin en kapsamlı pilates rehberi</p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-4xl py-12">
        <div className="grid sm:grid-cols-4 gap-6 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-sm border p-6 text-center">
              <s.icon className="w-8 h-8 text-[#730EC3] mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            PilatesTopu, Türkiye genelinde pilates ile ilgilenen herkese yardımcı olmayı amaçlayan ücretsiz bir dijital platformdur.
            81 ilde pilates salonlarını, eğitmenlerini, ders türlerini ve ekipmanları keşfetmenize olanak sağlıyoruz.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ne Yapıyoruz?</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Reformer pilates, mat pilates, klinik pilates, hamile pilatesi gibi farklı pilates türlerinde hizmet veren salonları
            bir araya getirerek, kullanıcıların en uygun salonu kolayca bulmalarını sağlıyoruz. Ayrıca blogumuzda
            pilates hakkında faydalı rehber yazıları ve egzersiz önerileri paylaşıyoruz.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">İşletme Sahipleri İçin</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Pilates salonunuzu platformumuza ücretsiz olarak ekleyebilirsiniz. Binlerce potansiyel müşteriye ulaşmak
            ve online görünürlüğünüzü artırmak için hemen başvurun.
          </p>
          <Link
            href="/is-ortakligi"
            className="inline-block bg-[#730EC3] hover:bg-[#5a0b9a] text-white font-medium py-3 px-6 rounded-xl transition-colors no-underline"
          >
            İş Ortaklığı Başvurusu &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
