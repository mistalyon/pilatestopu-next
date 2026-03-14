import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | PilatesTopu",
  description: "PilatesTopu.com kullanım koşulları ve şartları.",
};

export default function KullanimKosullariPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Kullanım Koşulları</h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">Son güncelleme: Mart 2026</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Genel Koşullar</h2>
          <p className="text-gray-600 mb-6">
            PilatesTopu.com web sitesini kullanarak aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Bu koşullar, sitemizi ziyaret eden tüm kullanıcılar için geçerlidir.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hizmet Tanımı</h2>
          <p className="text-gray-600 mb-6">
            PilatesTopu.com, Türkiye genelinde pilates salonları, eğitmenler ve pilates ile ilgili içerikleri listeleyen bir rehber platformudur. Platform üzerinden sunulan bilgiler bilgilendirme amaçlıdır.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Fikri Mülkiyet</h2>
          <p className="text-gray-600 mb-6">
            Sitedeki tüm içerikler, tasarımlar, logolar ve görseller PilatesTopu.com&apos;a aittir. İzinsiz kopyalanamaz veya çoğaltılamaz.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Sorumluluk Reddi</h2>
          <p className="text-gray-600 mb-6">
            PilatesTopu.com, platformda listelenen işletmelerin hizmet kalitesi, fiyatları veya uygulamaları hakkında garanti vermez. Kullanıcılar, listelenen işletmelerle iletişime geçmeden önce kendi araştırmalarını yapmaları önerilir.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. İletişim</h2>
          <p className="text-gray-600">
            Kullanım koşulları hakkında sorularınız için info@pilatestopu.com adresine e-posta gönderebilirsiniz.
          </p>
        </div>
      </section>
    </main>
  );
}
