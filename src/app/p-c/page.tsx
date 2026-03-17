import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { MapPin } from "lucide-react";

export const revalidate = 3600;

const SITE_URL = "https://www.pilatestopu.com";

export const metadata: Metadata = {
  title: "Türkiye Pilates Salonları | İl İl Pilates Rehberi",
  description:
    "Türkiye'nin 81 ilinde pilates salonları, reformer pilates stüdyoları ve eğitmenlerini keşfedin. Şehrinize en yakın pilates merkezini bulun.",
  keywords: ["pilates salonları", "türkiye pilates", "reformer pilates", "mat pilates", "pilates rehberi"],
  alternates: { canonical: SITE_URL + "/p-c" },
  openGraph: {
    title: "Türkiye Pilates Salonları | 81 İlde Pilates Rehberi",
    description:
      "Türkiye'nin 81 ilinde pilates salonlarını keşfedin. Reformer pilates, mat pilates ve daha fazlası.",
    url: SITE_URL + "/p-c",
    type: "website",
    locale: "tr_TR",
    siteName: "PilatesTopu",
  },
};

const regions: Record<string, string[]> = {
  "Marmara": ["istanbul", "bursa", "kocaeli", "balikesir", "tekirdag", "sakarya", "edirne", "kirklareli", "canakkale", "yalova", "bilecik"],
  "İç Anadolu": ["ankara", "konya", "eskisehir", "kayseri", "sivas", "kirsehir", "nevsehir", "nigde", "aksaray", "yozgat", "karaman", "kirikkale", "cankiri"],
  "Ege": ["izmir", "manisa", "denizli", "aydin", "mugla", "afyonkarahisar", "kutahya", "usak"],
  "Akdeniz": ["antalya", "mersin", "adana", "hatay", "kahramanmaras", "osmaniye", "isparta", "burdur"],
  "Karadeniz": ["trabzon", "samsun", "ordu", "giresun", "rize", "artvin", "zonguldak", "kastamonu", "sinop", "amasya", "tokat", "corum", "bolu", "duzce", "bartin", "karabuk", "gumushane", "bayburt"],
  "Doğu Anadolu": ["erzurum", "van", "malatya", "elazig", "erzincan", "agri", "kars", "igdir", "mus", "bitlis", "hakkari", "tunceli", "bingol", "ardahan"],
  "Güneydoğu Anadolu": ["gaziantep", "sanliurfa", "diyarbakir", "mardin", "batman", "siirt", "sirnak", "adiyaman", "kilis"],
};

export default async function SalonlarPage() {
  const { data: cities } = await supabase
    .from("cities")
    .select("id, name, slug, studio_count")
    .order("studio_count", { ascending: false });

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-r from-[#730EC3] to-[#E91E90] py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Türkiye Pilates Salonları
          </h1>
          <p className="text-lg text-white/90">
            81 ilde pilates salonlarını keşfedin
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-16">
          {cities?.slice(0, 12).map(function (city: any) {
            return (
              <Link
                key={city.id}
                href={"/p-c/" + city.slug}
                className="bg-white rounded-xl border border-gray-100 p-4 text-center hover:shadow-lg hover:border-[#730EC3]/20 transition-all group"
              >
                <MapPin className="w-5 h-5 text-[#730EC3] mx-auto mb-2" />
                <span className="font-semibold text-gray-900 group-hover:text-[#730EC3] transition-colors">
                  {city.name}
                </span>
                <span className="block text-xs text-gray-500 mt-1">
                  {city.studio_count}+ salon
                </span>
              </Link>
            );
          })}
        </div>

        {Object.entries(regions).map(function ([region, slugs]) {
          var regionCities = (cities || []).filter(function (c: any) {
            return slugs.includes(c.slug);
          });
          if (regionCities.length === 0) return null;
          return (
            <div key={region} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {region} Bölgesi
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {regionCities.map(function (city: any) {
                  return (
                    <Link
                      key={city.slug}
                      href={"/p-c/" + city.slug}
                      className="bg-gray-50 rounded-lg p-3 text-center hover:bg-purple-50 hover:shadow-sm transition-all"
                    >
                      <span className="font-medium text-gray-900">{city.name}</span>
                      <span className="block text-xs text-gray-500 mt-1">
                        {city.studio_count}+ salon
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
