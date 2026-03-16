import { Metadata } from "next";
import Link from "next/link";
import { Target, Users, MapPin, Heart } from "lucide-react";

const SITE_URL = "https://pilatestopu.com";

export const metadata: Metadata = {
  title: "Hakkımızda – Türkiye'nin Pilates Rehberi",
  description:
    "PilatesTopu, Türkiye genelinde 81 ilde pilates salonlarını, eğitmenlerini ve ekipmanlarını keşfetmenizi sağlayan ücretsiz rehber platformudur.",
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
    description: "Türkiye'nin en kapsamlı pilates rehberi.",
    url: SITE_URL + "/hakkimizda",
    isPartOf: { "@type": "WebSite", name: "PilatesTopu", url: SITE_URL },
    mainEntity: {
      "@type": "Organization",
      name: "PilatesTopu",
      url: SITE_URL,
      foundingDate: "2022",
      areaServed: { "@type": "Country", name: "Türkiye" },
    },
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
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
              <div key={s.label} className="text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
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
            derslerini keşfetmenizi sağlayan kapsamlı bir rehber platformudur.
          </p>
          <h2 className="text-2xl font-bold text-gray-900">Misyonumuz</h2>
          <p>
            Reformer pilates, mat pilates, klinik pilates ve daha fazlası hakkında
            doğru ve güncel bilgiye ulaşmanızı sağlıyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link href="/iletisim" className="bg-[#730EC3] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#5c0b9c] transition text-center">
              İletişime Geçin
            </Link>
            <Link href="/is-ortakligi" className="border-2 border-[#730EC3] text-[#730EC3] px-8 py-3 rounded-full font-semibold hover:bg-[#730EC3] hover:text-white transition text-center">
              İş Ortaklığı Başvurusu
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
