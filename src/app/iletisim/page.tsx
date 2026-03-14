import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iletisim - PilatesTopu | Bize Ulasin",
  description: "PilatesTopu.com ile iletisime gecin. Sorulariniz, onerileriniz veya is birligi teklifleriniz icin bize ulasin.",
};

export default function IletisimPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Iletisim</h1>
          <p className="text-xl text-purple-100">Sorulariniz icin bize ulasin</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bize Yazin</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Adiniz Soyadiniz</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Adinizi girin" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresiniz</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="ornek@email.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Konu</label>
                <select id="subject" name="subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="">Konu secin</option>
                  <option value="genel">Genel Soru</option>
                  <option value="salon">Salon Kaydi</option>
                  <option value="is-ortakligi">Is Ortakligi</option>
                  <option value="sikayet">Sikayet/Oneri</option>
                  <option value="teknik">Teknik Destek</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mesajiniz</label>
                <textarea id="message" name="message" rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Mesajinizi yazin..." />
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Gonder
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Iletisim Bilgileri</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">&#9993;</div>
                <div>
                  <h3 className="font-bold text-gray-900">E-posta</h3>
                  <p className="text-gray-600">info@pilatestopu.com</p>
                  <p className="text-sm text-gray-500">7/24 e-posta ile ulasin</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-xl">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-2xl">&#9742;</div>
                <div>
                  <h3 className="font-bold text-gray-900">Telefon</h3>
                  <p className="text-gray-600">+90 544 673 22 02</p>
                  <p className="text-sm text-gray-500">Hafta ici 09:00 - 18:00</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">&#128172;</div>
                <div>
                  <h3 className="font-bold text-gray-900">WhatsApp</h3>
                  <a href="https://wa.me/905446732202" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">WhatsApp ile yazin</a>
                  <p className="text-sm text-gray-500">Hizli iletisim icin</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-xl">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-2xl">&#128205;</div>
                <div>
                  <h3 className="font-bold text-gray-900">Adres</h3>
                  <p className="text-gray-600">Balat, Fatih / Istanbul</p>
                  <p className="text-sm text-gray-500">Turkiye</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
