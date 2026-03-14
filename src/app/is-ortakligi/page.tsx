import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "İş Ortaklığı | Salonunuzu Listeleyin - PilatesTopu",
  description: "Pilates salonunuzu PilatesTopu.com\'da listeleyin. Türkiye\'nin en büyük pilates rehberinde yerinizi alın.",
};

export default function IsOrtakligiPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">İş Ortaklığı</h1>
          <p className="text-xl text-purple-100">
            Pilates salonunuzu Türkiye&apos;nin en kapsamlı pilates rehberinde listeleyin
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Hedefli Erişim</h3>
            <p className="text-gray-600">Pilates arayan binlerce potansiyel müşteriye ulaşın</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">SEO Avantajı</h3>
            <p className="text-gray-600">Google&apos;da üst sıralarda görünün</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Güvenilir Platform</h3>
            <p className="text-gray-600">Türkiye&apos;nin en güvenilir pilates rehberinde yer alın</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hemen Başvurun</h2>
          <p className="text-gray-600 mb-6">
            Salonunuzu listelemek için aşağıdaki kanallardan bize ulaşabilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/905446732202?text=Merhaba, salonumu PilatesTopu.com'da listelemek istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              WhatsApp ile Yazın
            </a>
            <a
              href="mailto:info@pilatestopu.com?subject=İş Ortaklığı Başvurusu"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              E-posta Gönderin
            </a>
            <Link
              href="/iletisim"
              className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              İletişim Formu
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
