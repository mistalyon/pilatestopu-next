import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const revalidate = 3600;

interface CityData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  studio_count: number;
}

async function getCity(slug: string): Promise<CityData | null> {
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return data;
}

async function getCities() {
  const { data } = await supabase
    .from("cities")
    .select("name, slug, studio_count")
    .order("studio_count", { ascending: false })
    .limit(81);
  return data || [];
}

async function getPlacesInCity(cityId: string) {
  const { data } = await supabase
    .from("places")
    .select("id, name, slug, address, phone, city_id, rating, review_count")
    .eq("city_id", cityId)
    .order("rating", { ascending: false });
  return data || [];
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const cityData = await getCity(city);
  if (!cityData) {
    return { title: "Şehir Bulunamadı - PilatesTopu" };
  }
  return {
    title: cityData.meta_title || `${cityData.name} Pilates Salonları | En İyi Stüdyolar - PilatesTopu`,
    description: cityData.meta_description || cityData.description || `${cityData.name} pilates salonları, reformer pilates ve mat pilates dersleri.`,
    keywords: `${cityData.name} pilates, ${cityData.name} pilates salonları, ${cityData.name} reformer pilates`,
    alternates: { canonical: `/p-c/${city}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = await getCity(city);
  if (!cityData) notFound();

  const [places, allCities] = await Promise.all([
    getPlacesInCity(cityData.id),
    getCities(),
  ]);
  const otherCities = allCities.filter((c) => c.slug !== city).slice(0, 12);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://pilatestopu-next.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Salonlar", item: "https://pilatestopu-next.vercel.app/p-c" },
      { "@type": "ListItem", position: 3, name: cityData.name, item: `https://pilatestopu-next.vercel.app/p-c/${city}` },
    ],
  };

  const localBusinessJsonLd = places.map((place) => ({
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: place.name,
    address: { "@type": "PostalAddress", addressLocality: cityData.name, addressCountry: "TR", streetAddress: place.address || "" },
    ...(place.phone && { telephone: place.phone }),
    ...(place.rating && { aggregateRating: { "@type": "AggregateRating", ratingValue: place.rating, reviewCount: place.review_count || 1 } }),
    url: `https://pilatestopu-next.vercel.app/salon/${place.slug}`,
  }));

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {localBusinessJsonLd.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      )}

      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <nav className="text-sm text-purple-200 mb-4">
            <Link href="/" className="hover:text-white">Anasayfa</Link>
            <span className="mx-2">/</span>
            <Link href="/p-c" className="hover:text-white">Salonlar</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{cityData.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{cityData.name} Pilates Salonları</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            {cityData.description || `${cityData.name} pilates salonları, reformer pilates stüdyoları ve eğitmenler.`}
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">{cityData.studio_count}+ Salon</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{cityData.name}&apos;da Pilates Salonları</h2>
        {places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {places.map((place) => (
              <Link key={place.id} href={`/salon/${place.slug}`} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{place.name}</h3>
                {place.address && <p className="text-gray-500 text-sm mb-2">{place.address}</p>}
                {place.rating && (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{place.rating}</span>
                    {place.review_count && <span className="text-gray-400 text-sm">({place.review_count} değerlendirme)</span>}
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-purple-50 rounded-xl p-8 text-center mb-16">
            <p className="text-gray-600 mb-4">{cityData.name} için salon bilgileri yakında eklenecektir.</p>
            <p className="text-gray-500">Salonunuzu listelemek için bizimle iletişime geçin.</p>
            <Link href="/iletisim" className="inline-block mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">İletişime Geç</Link>
          </div>
        )}

        <div className="prose max-w-none mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{cityData.name} Pilates Rehberi</h2>
          <p className="text-gray-600 leading-relaxed">
            {cityData.name} pilates salonları arasında reformer pilates, mat pilates, klinik pilates ve hamile pilatesi gibi farklı türlerde dersler sunan stüdyolar bulunmaktadır. {cityData.name}&apos;da pilates yapmak isteyenler için en uygun salonu bulmalarına yardımcı oluyoruz. PilatesTopu.com üzerinden {cityData.name} ve çevresindeki tüm pilates salonlarını, fiyatlarını ve kullanıcı yorumlarını karşılaştırabilirsiniz.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Diğer Şehirler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {otherCities.map((c) => (
              <Link key={c.slug} href={`/p-c/${c.slug}`} className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                <span className="font-medium text-gray-900">{c.name}</span>
                <span className="block text-sm text-gray-500">{c.studio_count}+ salon</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
