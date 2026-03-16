import { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, MessageCircle, Mail, ChevronDown } from "lucide-react";

const SITE_URL = "https://pilatestopu.com";

export const metadata: Metadata = {
  title: "Yardım Merkezi: Sık Sorulan Sorular ve Destek",
  description:
    "PilatesTopu hakkında sık sorulan sorular, yardım ve destek. Pilates salonları, üyelik, iş ortaklığı ve daha fazlası hakkında bilgi edinin.",
  alternates: { canonical: SITE_URL + "/yardim" },
};

const faqs = [
  {
    q: "PilatesTopu nedir?",
    a: "PilatesTopu, Türkiye genelinde pilates salonlarını, dersleri ve ekipmanları keşfetmenizi sağlayan kapsamlı bir rehber platformudur.",
  },
  {
    q: "Pilates salonumu nasıl ekleyebilirim?",
    a: "İş Ortaklığı sayfamızdan başvuru yapabilir veya WhatsApp üzerinden bizimle iletişime geçebilirsiniz.",
  },
  {
    q: "Platform ücretsiz mi?",
    a: "Evet, PilatesTopu tamamen ücretsiz bir platformdur. Kullanıcılar pilates salonlarını ücretsiz olarak arayabilir ve karşılaştırabilir.",
  },
  {
    q: "Hangi şehirlerde hizmet veriyorsunuz?",
    a: "Türkiye’nin 81 ilinde pilates salonlarını listeliyoruz. İstanbul, Ankara, İzmir, Antalya, Bursa ve daha fazlası.",
  },
  {
    q: "Salon bilgileri ne kadar güncel?",
    a: "Salon bilgileri işletme sahipleri tarafından güncellenmektedir. Herhangi bir hata fark ederseniz bize bildirmenizi rica ederiz.",
  },
  {
    q: "Nasıl iletişime geçebilirim?",
    a: "İletişim sayfamız, WhatsApp hattımız veya info@pilatestopu.com adresi üzerinden bize ulaşabilirsiniz.",
  },
];

export default function YardimPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(function (f) {
      return {
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      };
    }),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Yardım",
        item: SITE_URL + "/yardim",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="bg-gradient-to-r from-[#730EC3] to-[#E91E90] py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Yardım Merkezi</h1>
          <p className="text-lg text-white/90">
            Sık sorulan sorular ve destek
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Sık Sorulan Sorular
        </h2>
        <div className="space-y-4">
          {faqs.map(function (f, i) {
            return (
              <details
                key={i}
                className="group border border-gray-200 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition">
                  <span className="font-semibold text-gray-900">{f.q}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-gray-600">{f.a}</div>
              </details>
            );
          })}
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hala Sorunuz mu Var?
          </h2>
          <p className="text-gray-600 mb-6">Bize doğrudan ulaşabilirsiniz</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/905446732202?text=Merhaba, yardım almak istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
            <a
              href="mailto:info@pilatestopu.com"
              className="inline-flex items-center justify-center gap-2 bg-[#730EC3] hover:bg-[#5a0b9c] text-white px-6 py-3 rounded-full font-semibold transition"
            >
              <Mail className="w-5 h-5" /> E-posta Gönder
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
