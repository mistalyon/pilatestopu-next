import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Yardım Merkezi | PilatesTopu",
  description: "PilatesTopu.com sık sorulan sorular ve yardım merkezi.",
};

const faqs = [
  {
    q: "PilatesTopu.com nedir?",
    a: "PilatesTopu.com, Türkiye genelinde pilates salonlarını, eğitmenleri ve pilates ile ilgili içerikleri bir araya getiren kapsamlı bir rehber platformudur.",
  },
  {
    q: "Salonumu nasıl listeleyebilirim?",
    a: "Salonunuzu listelemek için İş Ortaklığı sayfamızdan veya WhatsApp üzerinden bizimle iletişime geçebilirsiniz.",
  },
  {
    q: "Listeleme ücretli mi?",
    a: "Temel listeleme ücretsizdir. Öne çıkarılmış listeleme ve ek özellikler için iletişime geçebilirsiniz.",
  },
  {
    q: "Salon bilgilerimi nasıl güncelleyebilirim?",
    a: "Salon bilgilerinizi güncellemek için info@pilatestopu.com adresine e-posta gönderebilir veya WhatsApp üzerinden bizimle iletişime geçebilirsiniz.",
  },
  {
    q: "Pilates türleri arasındaki fark nedir?",
    a: "Reformer pilates özel aletlerle yapılırken, mat pilates sadece bir mat üzerinde gerçekleştirilir. Klinik pilates ise fizyoterapistler eşliğinde rehabilitasyon amaçlı uygulanır.",
  },
  {
    q: "Nasıl iletişime geçebilirim?",
    a: "Bize info@pilatestopu.com adresinden, +90 544 673 22 02 numarasından veya WhatsApp üzerinden ulaşabilirsiniz.",
  },
];

export default function YardimPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Yardım Merkezi</h1>
          <p className="text-purple-100 mt-2">Sık sorulan sorular ve yardım</p>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h2>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-purple-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sorunuz mu var?</h2>
          <p className="text-gray-600 mb-6">Aradığınız cevabı bulamadıysanız bize ulaşın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              İletişim
            </Link>
            <a
              href="https://wa.me/905446732202"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
