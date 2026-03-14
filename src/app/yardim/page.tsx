import { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, MessageCircle, Mail, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Yardım Merkezi | PilatesTopu",
  description: "PilatesTopu hakkında sık sorulan sorular, yardım ve destek. Pilates salonları, üyelik ve platform kullanımı hakkında bilgi alın.",
  alternates: { canonical: "https://pilatestopu-next.vercel.app/yardim" },
};

const faqs = [
  {
    q: "PilatesTopu nedir?",
    a: "PilatesTopu, Türkiye genelinde pilates salonlarını, dersleri ve ekipmanları keşfetmenizi sağlayan ücretsiz bir rehber platformudur. 81 ilde pilates salonu bilgilerine ulaşabilirsiniz."
  },
  {
    q: "Pilates salonumu nasıl ekleyebilirim?",
    a: "İş Ortaklığı sayfamızdan başvuru yapabilir veya WhatsApp üzerinden bizimle iletişime geçebilirsiniz. Salon bilgilerinizi doğruladıktan sonra platformumuza ekliyoruz."
  },
  {
    q: "Salon bilgileri ne sıklıkla güncelleniyor?",
    a: "Salon bilgileri düzenli olarak güncellenmektedir. İşletme sahipleri, bilgilerinin güncellenmesi için bizimle iletişime geçebilir."
  },
  {
    q: "PilatesTopu ücretsiz mi?",
    a: "Evet, PilatesTopu kullanıcılar için tamamen ücretsizdir. Salon arama, bilgi görüntüleme ve blog yazılarını okuma gibi tüm özellikler ücretsiz olarak sunulmaktadır."
  },
  {
    q: "Nasıl iletişime geçebilirim?",
    a: "Bize WhatsApp üzerinden (+90 544 673 22 02) veya e-posta ile (info@pilatestopu.com) ulaşabilirsiniz. İletişim sayfamızdan da mesaj gönderebilirsiniz."
  },
  {
    q: "Hangi şehirlerdeki salonları bulabilirim?",
    a: "Türkiye’nin 81 ilindeki pilates salonlarını listeliyoruz. İstanbul, Ankara, İzmir gibi büyük şehirlerin yanı sıra tüm Anadolu’daki salonlara ulaşabilirsiniz."
  },
];

export default function YardimPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="bg-gradient-to-b from-[#F2DFF4] to-white py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <HelpCircle className="w-12 h-12 text-[#730EC3] mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Yardım Merkezi</h1>
          <p className="text-gray-600">Sık sorulan sorular ve destek bilgileri</p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-3xl py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Sık Sorulan Sorular</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white rounded-xl border shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-gray-900 hover:text-[#730EC3] transition-colors">
                {faq.q}
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hala Sorunuz mu Var?</h2>
          <p className="text-gray-600 mb-6">Bize doğrudan ulaşabilirsiniz</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/905446732202?text=Merhaba, yardım almak istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
            <a
              href="mailto:info@pilatestopu.com"
              className="inline-flex items-center justify-center gap-2 bg-[#730EC3] hover:bg-[#5a0b9a] text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              <Mail className="w-5 h-5" /> E-posta Gönder
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
