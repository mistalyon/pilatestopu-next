import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Türkiye Pilates Salonları | İl İl Pilates Rehberi - PilatesTopu",
  description: "Türkiye\'nin 81 ilinde pilates salonları, reformer pilates stüdyoları ve eğitmenler. En yakın pilates salonunu bulun.",
  keywords: "pilates salonları, türkiye pilates, reformer pilates, mat pilates, pilates rehberi",
};

async function getAllCities() {
  const { data } = await supabase
    .from("cities")
    .select("name, slug, studio_count")
    .order("studio_count", { ascending: false });
  return data || [];
}

export default async function SalonlarPage() {
  const cities = await getAllCities();

  const regions: Record<string, string[]> = {
    "Marmara": ["istanbul", "bursa", "kocaeli", "balikesir", "tekirdag", "sakarya", "canakkale", "edirne", "yalova", "kirklareli", "bilecik"],
    "Ege": ["izmir", "manisa", "aydin", "denizli", "mugla", "afyonkarahisar", "kutahya", "usak"],
    "Akdeniz": ["antalya", "adana", "mersin", "hatay", "kahramanmaras", "osmaniye", "isparta", "burdur"],
    "İç Anadolu": ["ankara", "konya", "kayseri", "eskisehir", "sivas", "yozgat", "aksaray", "nigde", "nevsehir", "kirsehir", "kirikkale", "karaman"],
    "Karadeniz": ["trabzon", "samsun", "ordu", "giresun", "rize", "artvin", "zonguldak", "kastamonu", "sinop", "amasya", "tokat", "corum", "bolu", "duzce", "bartin", "karabuk", "bayburt", "gumushane"],
    "Doğu Anadolu": ["erzurum", "malatya", "elazig", "van", "erzincan", "kars", "agri", "mus", "bingol", "bitlis", "hakkari", "tunceli", "igdir", "ardahan"],
    "Güneydoğu Anadolu": ["gaziantep", "diyarbakir", "sanliurfa", "mardin", "batman", "siirt", "sirnak", "adiyaman", "kilis"],
  };

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Türkiye Pilates Salonları
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            81 ilde pilates salonları, reformer pilates stüdyoları ve eğitmenler
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
          {cities.slice(0, 12).map((city) => (
            <Link
              key={city.slug}
              href={`/p-c/${city.slug}`}
              className="bg-white border-2 border-purple-100 rounded-xl p-4 text-center hover:border-purple-400 hover:shadow-lg transition-all"
            >
              <span className="block font-bold text-gray-900 text-lg">{city.name}</span>
              <span className="block text-sm text-purple-600 mt-1">{city.studio_count}+ salon</span>
            </Link>
          ))}
        </div>

        {Object.entries(regions).map(([region, slugs]) => {
          const regionCities = cities.filter((c) => slugs.includes(c.slug));
          if (regionCities.length === 0) return null;
          return (
            <div key={region} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{region} Bölgesi</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {regionCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/p-c/${city.slug}`}
                    className="bg-gray-50 rounded-lg p-3 text-center hover:bg-purple-50 hover:shadow-md transition-all"
                  >
                    <span className="font-medium text-gray-900">{city.name}</span>
                    <span className="block text-xs text-gray-500 mt-1">{city.studio_count}+ salon</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
