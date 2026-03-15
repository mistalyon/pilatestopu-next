import type { Metadata } from "next";

const SITE_URL = "https://pilatestopu-next.vercel.app";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "PilatesTopu.com gizlilik politikası ve kişisel verilerin korunması. Verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi edinin.",
  alternates: { canonical: SITE_URL + "/gizlilik-politikasi" },
};

export default function GizlilikPolitikasiPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Gizlilik Politikası</h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">Son güncelleme: Mart 2026</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Toplanan Veriler</h2>
          <p className="text-gray-700 mb-4">
            PilatesTopu.com olarak, hizmetlerimizi sunabilmek için bazı kişisel verilerinizi
            toplayabiliriz. Bunlar; ad-soyad, e-posta adresi, telefon numarası ve iletişim
            formu aracılığıyla gönderdiğiniz mesajlardır.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Verilerin Kullanımı</h2>
          <p className="text-gray-700 mb-4">
            Toplanan veriler; hizmet kalitesinin artırılması, iletişim
            taleplerinin yanıtlanması ve platform geliştirme amaçlı
            kullanılır. Verileriniz üçüncü taraflarla
            paylaşılmaz.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Çerezler (Cookies)</h2>
          <p className="text-gray-700 mb-4">
            Sitemizde kullanıcı deneyimini iyileştirmek için çerezler
            kullanılmaktadır. Tarayıcı ayarlarınızdan çerez
            tercihlerinizi yönetebilirsiniz.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Veri Güvenliği</h2>
          <p className="text-gray-700 mb-4">
            Verileriniz SSL şifreleme ile korunmakta ve güvenli sunucularda
            saklanmaktadır. KVKK kapsamında haklarınızı kullanmak için
            bizimle iletişime geçebilirsiniz.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. İletişim</h2>
          <p className="text-gray-700">
            Gizlilik politikamız hakkında sorularınız için iletişim
            sayfamız üzerinden bize ulaşabilirsiniz.
          </p>
        </div>
      </section>
    </main>
  );
}
