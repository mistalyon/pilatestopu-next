import type { Metadata } from "next";
import Link from "next/link";

const cities: Record<string, { name: string; description: string; studioCount: number; popularTypes: string[] }> = {
  "istanbul": { name: "Istanbul", description: "Istanbul'da pilates salonlari, reformer pilates studyolari ve egitmenler. Turkiye'nin en buyuk sehrinde en iyi pilates deneyimini yasayin.", studioCount: 150, popularTypes: ["Reformer Pilates", "Mat Pilates", "Klinik Pilates"] },
  "ankara": { name: "Ankara", description: "Ankara'da pilates salonlari ve studyolar. Baskent'te en kaliteli pilates egitmenlerini ve merkezlerini kesfedin.", studioCount: 85, popularTypes: ["Reformer Pilates", "Mat Pilates", "Hamile Pilatesi"] },
  "izmir": { name: "Izmir", description: "Izmir'de pilates salonlari, reformer pilates ve mat pilates dersleri. Ege'nin incisi Izmir'de pilates yapabileceginiz yerler.", studioCount: 72, popularTypes: ["Reformer Pilates", "Mat Pilates", "Online Ders"] },
  "antalya": { name: "Antalya", description: "Antalya'da pilates salonlari ve studyolar. Akdeniz'in guzel sehrinde pilates yapabileceginiz en iyi merkezler.", studioCount: 58, popularTypes: ["Reformer Pilates", "Mat Pilates", "Klinik Pilates"] },
  "bursa": { name: "Bursa", description: "Bursa'da pilates salonlari, egitmenler ve fizyoterapistler. Bursa'nin en iyi pilates merkezlerini kesfedin.", studioCount: 45, popularTypes: ["Reformer Pilates", "Mat Pilates", "Cocuk Pilatesi"] },
  "eskisehir": { name: "Eskisehir", description: "Eskisehir'de pilates salonlari ve studyolar. Universite sehri Eskisehir'de en iyi pilates merkezleri.", studioCount: 32, popularTypes: ["Mat Pilates", "Reformer Pilates", "Grup Dersi"] },
  "konya": { name: "Konya", description: "Konya'da pilates salonlari ve egitmenler. Konya'nin en iyi pilates studyolarini kesfedin.", studioCount: 28, popularTypes: ["Reformer Pilates", "Mat Pilates", "Hamile Pilatesi"] },
  "gaziantep": { name: "Gaziantep", description: "Gaziantep'te pilates salonlari ve studyolar. Gaziantep'in en kaliteli pilates merkezleri.", studioCount: 25, popularTypes: ["Reformer Pilates", "Mat Pilates", "Klinik Pilates"] },
  "adana": { name: "Adana", description: "Adana'da pilates salonlari, reformer pilates ve mat pilates dersleri.", studioCount: 22, popularTypes: ["Reformer Pilates", "Mat Pilates"] },
  "mersin": { name: "Mersin", description: "Mersin'de pilates salonlari ve studyolar. Akdeniz kiyisinda pilates.", studioCount: 20, popularTypes: ["Mat Pilates", "Reformer Pilates"] },
  "kayseri": { name: "Kayseri", description: "Kayseri'de pilates salonlari ve egitmenler.", studioCount: 18, popularTypes: ["Reformer Pilates", "Mat Pilates"] },
  "trabzon": { name: "Trabzon", description: "Trabzon'da pilates salonlari ve studyolar.", studioCount: 15, popularTypes: ["Mat Pilates", "Reformer Pilates"] },
  "samsun": { name: "Samsun", description: "Samsun'da pilates salonlari ve studyolar.", studioCount: 14, popularTypes: ["Mat Pilates", "Reformer Pilates"] },
  "denizli": { name: "Denizli", description: "Denizli'de pilates salonlari ve studyolar.", studioCount: 16, popularTypes: ["Reformer Pilates", "Mat Pilates"] },
  "diyarbakir": { name: "Diyarbakir", description: "Diyarbakir'da pilates salonlari.", studioCount: 12, popularTypes: ["Mat Pilates", "Reformer Pilates"] },
  "mugla": { name: "Mugla", description: "Mugla'da pilates salonlari ve studyolar. Bodrum, Marmaris ve Fethiye'de pilates.", studioCount: 20, popularTypes: ["Reformer Pilates", "Mat Pilates"] },
  "sakarya": { name: "Sakarya", description: "Sakarya'da pilates salonlari.", studioCount: 12, popularTypes: ["Mat Pilates", "Reformer Pilates"] },
  "balikesir": { name: "Balikesir", description: "Balikesir'de pilates salonlari.", studioCount: 11, popularTypes: ["Mat Pilates", "Reformer Pilates"] },
  "malatya": { name: "Malatya", description: "Malatya'da pilates salonlari.", studioCount: 10, popularTypes: ["Mat Pilates"] },
  "manisa": { name: "Manisa", description: "Manisa'da pilates salonlari.", studioCount: 10, popularTypes: ["Mat Pilates"] },
};

export async function generateStaticParams() {
  return Object.keys(cities).map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const cityData = cities[city];
  if (!cityData) {
    return { title: "Sehir Bulunamadi - PilatesTopu" };
  }
  return {
    title: cityData.name + " Pilates Salonlari | En Iyi Studyolar - PilatesTopu",
    description: cityData.description,
    keywords: cityData.name + " pilates, " + cityData.name + " pilates salonlari, " + cityData.name + " reformer pilates",
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = cities[city];

  if (!cityData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sehir Bulunamadi</h1>
          <Link href="/" className="text-purple-600 hover:text-purple-700">Ana sayfaya don</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{cityData.name} Pilates Salonlari</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">{cityData.description}</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">{cityData.studioCount}+ Salon</span>
            {cityData.popularTypes.map((type) => (
              <span key={type} className="bg-white/10 text-white px-4 py-2 rounded-full text-sm">{type}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{cityData.name}&apos;da Pilates Turleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cityData.popularTypes.map((type) => (
            <div key={type} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{type}</h3>
              <p className="text-gray-600">{cityData.name}&apos;da {type.toLowerCase()} dersleri veren studyolari kesfedin.</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-8">{cityData.name}&apos;da One Cikan Studyolar</h2>
        <div className="bg-purple-50 rounded-xl p-8 text-center">
          <p className="text-gray-600 mb-4">{cityData.name} icin studyo bilgileri yaklnda eklenecektir.</p>
          <p className="text-gray-500">Salonunuzu listelemek icin bizimle iletisime gecin.</p>
          <Link href="/iletisim" className="inline-block mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Iletisime Gec
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Diger Sehirler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(cities).filter(([slug]) => slug !== city).slice(0, 12).map(([slug, c]) => (
              <Link key={slug} href={`/p-c/${slug}`} className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                <span className="font-medium text-gray-900">{c.name}</span>
                <span className="block text-sm text-gray-500">{c.studioCount}+ salon</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
