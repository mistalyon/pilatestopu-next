import type { Metadata } from "next";

const SITE_URL = "https://pilatestopu-next.vercel.app";

export const metadata: Metadata = {
  title: "Kullanım Koşullları",
  description:
    "PilatesTopu.com kullanım koşullları ve hizmet şartları. Platformı kullanmadan önce lütfen okuyunuz.",
  alternates: { canonical: SITE_URL + "/kullanim-kosullari" },
};

export default function KullanimKosullariPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Kullanım Koşullları</h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">Son güncelleme: Mart 2026</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Genel Koşullar</h2>
          <p className="text-gray-700 mb-4">
            PilatesTopu.com web sitesini kullanarak aşağıdaki koşullları kabul
            etmiş sayılırsınız.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hizmet Kapsamı</h2>
          <p className="text-gray-700 mb-4">
            PilatesTopu, Türkiye genelindeki pilates salonlarını listeleyen bir rehber
            platformudur.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Fikri Mülkiyet</h2>
          <p className="text-gray-700 mb-4">
            Sitedeki tüm içerikler, tasarımlar ve logolar PilatesTopu&apos;na aittir.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Sorumluluk Reddi</h2>
          <p className="text-gray-700 mb-4">
            Platform üzerinde listelenen işletmelerin hizmet kalitesi konusunda PilatesTopu
            sorumluluk kabul etmez.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Değişiklikler</h2>
          <p className="text-gray-700">
            PilatesTopu, bu kullanım koşulllarını önceden haber vermeksizin
            değiştirme hakkını saklı tutar.
          </p>
        </div>
      </section>
    </main>
  );
}
