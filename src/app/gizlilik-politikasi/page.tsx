import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | PilatesTopu",
  description: "PilatesTopu.com gizlilik politikası ve kişisel verilerin korunması.",
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
          <p className="text-gray-600 mb-6">
            PilatesTopu.com, kullanıcıların deneyimini iyileştirmek amacıyla bazı verileri toplayabilir. Bu veriler arasında ziyaret edilen sayfalar, tarayıcı bilgileri ve IP adresleri yer alabilir.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Çerezler (Cookies)</h2>
          <p className="text-gray-600 mb-6">
            Sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Verilerin Kullanımı</h2>
          <p className="text-gray-600 mb-6">
            Toplanan veriler yalnızca hizmet kalitesini artırmak, istatistiksel analizler yapmak ve kullanıcı deneyimini iyileştirmek amacıyla kullanılır. Kişisel verileriniz üçüncü taraflarla paylaşılmaz.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. KVKK Uyumu</h2>
          <p className="text-gray-600 mb-6">
            PilatesTopu.com, 6698 sayılı Kişisel Verilerin Korunması Kanunu&apos;na (KVKK) uygun olarak çalışmaktadır. Kişisel verilerinizle ilgili haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. İletişim</h2>
          <p className="text-gray-600">
            Gizlilik politikası hakkında sorularınız için info@pilatestopu.com adresine e-posta gönderebilirsiniz.
          </p>
        </div>
      </section>
    </main>
  );
}
