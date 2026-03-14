import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkimizda - PilatesTopu | Turkiye'nin Pilates Rehberi",
  description: "PilatesTopu.com hakkinda bilgi edinin. Turkiye'nin en kapsamli pilates rehberi olarak misyonumuz, vizyonumuz ve hikayemiz.",
};

export default function HakkimizdaPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Hakkimizda</h1>
          <p className="text-xl text-purple-100">Turkiye&apos;nin en kapsamli pilates platformu</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">PilatesTopu.com Nedir?</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            PilatesTopu.com, Turkiye genelinde pilates ile ilgilenen herkese yardimci olmak amaciyla kurulmus kapsamli bir platformdur. 81 ilde pilates salonlari, egitmenler, fizyoterapistler ve studyolar hakkinda detayli bilgiler sunuyoruz.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Amacimiz, pilates yapmak isteyen kisilerin dogru studyoyu, egitmeni veya fizyoterapisti kolayca bulmalarini saglamaktir. Ayni zamanda pilates hakkinda egitici icerikler ureterek, insanlarin saglkli bir yasam tarzi benimsemelerine katki saglamayi hedefliyoruz.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Misyonumuz</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Turkiye&apos;deki pilates ekosistemini dijitalleristirerek, pilates severlerin en dogru bilgiye ve en kaliteli hizmete erisimini kolaylastirmak. Pilates salonlari ve egitmenlere de dijital ortamda gorunurluk sagleyarak sektore katki sunmak.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Ne Sunuyoruz?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-purple-700 mb-3">Salon Rehberi</h3>
              <p className="text-gray-600">Turkiye genelinde pilates salonlari, studyolar ve merkezler hakkinda detayli bilgiler ve kullanici degerlendirmeleri.</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-pink-700 mb-3">Egitmen Dizini</h3>
              <p className="text-gray-600">Uzman pilates egitmenleri ve fizyoterapistleri kesferin, uzmanlik alanlarini ve deneyimlerini inceleyin.</p>
            </div>
            <div className="bg-teal-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-teal-700 mb-3">Blog & Rehberler</h3>
              <p className="text-gray-600">Pilates hakkinda egitici yazilar, egzersiz rehberleri, beslenme onerileri ve uzman gorusleri.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-purple-700 mb-3">Sehir Rehberleri</h3>
              <p className="text-gray-600">81 ilde pilates imkanlari hakkinda detayli sehir rehberleri ve bolgesel oneriler.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Iletisim</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Bize ulasmak icin asagidaki kanallari kullanabilirsiniz:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-3">
              <span>&#9993;</span> <span>info@pilatestopu.com</span>
            </li>
            <li className="flex items-center gap-3">
              <span>&#9742;</span> <span>+90 544 673 22 02</span>
            </li>
            <li className="flex items-center gap-3">
              <span>&#128205;</span> <span>Balat, Fatih / Istanbul</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
