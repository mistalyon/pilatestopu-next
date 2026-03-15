import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { MapPin, ChevronRight, Building2, Phone, Star, Navigation } from "lucide-react";

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

async function getPlacesInCity(cityId: string) {
  const { data } = await supabase
    .from("places")
    .select("*, place_place_types(place_types(name, slug))")
    .eq("city_id", cityId);
  return data || [];
}

async function getCities() {
  const { data } = await supabase
    .from("cities")
    .select("name, slug, studio_count")
    .order("name");
  return data || [];
}

async function getNeighborhoods(cityId: string) {
  const { data } = await supabase
    .from("neighborhoods")
    .select("name, slug")
    .eq("city_id", cityId)
    .order("name");
  return data || [];
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const cityData = await getCity(city);
  if (!cityData) {
    return { title: "Bulunamad\u0131 | PilatesTopu" };
  }
  return {
    title: cityData.meta_title || `${cityData.name} Pilates Salonlar\u0131 | En \u0130yi Stüdyolar \u2013 PilatesTopu`,
    description: cityData.meta_description || cityData.description || `${cityData.name} pilates salonlar\u0131, reformer pilates, mat pilates stüdyolar\u0131`,
    keywords: `${cityData.name} pilates, ${cityData.name} pilates salonlar\u0131, ${cityData.name} reformer pilates`,
    alternates: { canonical: `/p-c/${city}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = await getCity(city);
  if (!cityData) notFound();

  const [places, allCities, neighborhoods] = await Promise.all([
    getPlacesInCity(cityData.id),
    getCities(),
    getNeighborhoods(cityData.id),
  ]);

  const otherCities = allCities.filter((c) => c.slug !== city).slice(0, 12);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cityData.name} Pilates Salonlar\u0131`,
    description: cityData.description || `${cityData.name} pilates salonlar\u0131`,
    url: `https://pilatestopu.com/p-c/${city}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://pilatestopu.com" },
        { "@type": "ListItem", position: 2, name: "Pilates Salonlar\u0131", item: "https://pilatestopu.com/p-c" },
        { "@type": "ListItem", position: 3, name: cityData.name },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-purple-200 mb-4 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white">Anasayfa</Link>
            <span className="mx-2">/</span>
            <Link href="/p-c" className="hover:text-white">Salonlar</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{cityData.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{cityData.name} Pilates Salonlar\u0131</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            {cityData.description || `${cityData.name} pilates salonlar\u0131, reformer pilates stüdyolar\u0131 ve fiyatlar\u0131`}
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">{cityData.studio_count}+ Stüdyo</span>
            {neighborhoods.length > 0 && (
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">{neighborhoods.length} \u0130l\xe7e/Semt</span>
            )}
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      {neighborhoods.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Navigation className="w-6 h-6 text-purple-600" />
              {cityData.name} \u0130l\xe7e ve Semtler
            </h2>
            <p className="text-gray-600 mb-6">
              {cityData.name} ilindeki pilates salonlar\u0131n\u0131 il\xe7e ve semtlere g\xf6re ke\u015ffedin.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {neighborhoods.map((n: any) => (
                <Link
                  key={n.slug}
                  href={`/p-c/${city}/${n.slug}`}
                  className="flex items-center gap-3 bg-purple-50 hover:bg-purple-100 rounded-xl px-4 py-3 transition-all group hover:-translate-y-0.5"
                >
                  <MapPin className="w-4 h-4 text-purple-400 group-hover:text-purple-600 flex-shrink-0" />
                  <span className="text-gray-700 group-hover:text-purple-700 font-medium text-sm">{n.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-purple-500" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Salons Listing */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{cityData.name}&apos;da Pilates Salonlar\u0131</h2>
        {places.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place: any) => (
              <Link
                key={place.id}
                href={`/salon/${place.slug}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group hover:-translate-y-1 border border-gray-100"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 h-32 flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-white/80" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">{place.name}</h3>
                  {place.address && (
                    <p className="text-gray-500 text-sm mt-2 flex items-start gap-1">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {place.address}
                    </p>
                  )}
                  {place.phone && (
                    <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      {place.phone}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {place.place_place_types?.map((ppt: any) => (
                      <span key={ppt.place_types?.slug} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">
                        {ppt.place_types?.name}
                      </span>
                    ))}
                  </div>
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { MapPin, ChevronRight, Building2, Phone, Star, Navigation } from "lucide-react";

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

async function getPlacesInCity(cityId: string) {
  const { data } = await supabase
    .from("places")
    .select("*, place_place_types(place_types(name, slug))")
    .eq("city_id", cityId);
  return data || [];
}

async function getCities() {
  const { data } = await supabase
    .from("cities")
    .select("name, slug, studio_count")
    .order("name");
  return data || [];
}

async function getNeighborhoods(cityId: string) {
  const { data } = await supabase
    .from("neighborhoods")
    .select("name, slug")
    .eq("city_id", cityId)
    .order("name");
  return data || [];
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const cityData = await getCity(city);
  if (!cityData) {
    return { title: "Bulunamadı | PilatesTopu" };
  }
  return {
    title: cityData.meta_title || `${cityData.name} Pilates Salonları | En İyi Stüdyolar – PilatesTopu`,
    description: cityData.meta_description || cityData.description || `${cityData.name} pilates salonları, reformer pilates, mat pilates stüdyoları`,
    keywords: `${cityData.name} pilates, ${cityData.name} pilates salonları, ${cityData.name} reformer pilates`,
    alternates: { canonical: `/p-c/${city}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = await getCity(city);
  if (!cityData) notFound();

  const [places, allCities, neighborhoods] = await Promise.all([
    getPlacesInCity(cityData.id),
    getCities(),
    getNeighborhoods(cityData.id),
  ]);

  const otherCities = allCities.filter((c) => c.slug !== city).slice(0, 12);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cityData.name} Pilates Salonları`,
    description: cityData.description || `${cityData.name} pilates salonları`,
    url: `https://pilatestopu.com/p-c/${city}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://pilatestopu.com" },
        { "@type": "ListItem", position: 2, name: "Pilates Salonları", item: "https://pilatestopu.com/p-c" },
        { "@type": "ListItem", position: 3, name: cityData.name },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-purple-200 mb-4 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white">Anasayfa</Link>
            <span className="mx-2">/</span>
            <Link href="/p-c" className="hover:text-white">Salonlar</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{cityData.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{cityData.name} Pilates Salonları</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            {cityData.description || `${cityData.name} pilates salonları, reformer pilates stüdyoları ve fiyatları`}
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">{cityData.studio_count}+ Stüdyo</span>
            {neighborhoods.length > 0 && (
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">{neighborhoods.length} İlçe/Semt</span>
            )}
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      {neighborhoods.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Navigation className="w-6 h-6 text-purple-600" />
              {cityData.name} İlçe ve Semtler
            </h2>
            <p className="text-gray-600 mb-6">
              {cityData.name} ilindeki pilates salonlarını ilçe ve semtlere göre keşfedin.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {neighborhoods.map((n: any) => (
                <Link
                  key={n.slug}
                  href={`/p-c/${city}/${n.slug}`}
                  className="flex items-center gap-3 bg-purple-50 hover:bg-purple-100 rounded-xl px-4 py-3 transition-all group hover:-translate-y-0.5"
                >
                  <MapPin className="w-4 h-4 text-purple-400 group-hover:text-purple-600 flex-shrink-0" />
                  <span className="text-gray-700 group-hover:text-purple-700 font-medium text-sm">{n.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-purple-500" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Salons Listing */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{cityData.name}&apos;da Pilates Salonları</h2>
        {places.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place: any) => (
              <Link
                key={place.id}
                href={`/salon/${place.slug}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group hover:-translate-y-1 border border-gray-100"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 h-32 flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-white/80" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">{place.name}</h3>
                  {place.address && (
                    <p className="text-gray-500 text-sm mt-2 flex items-start gap-1">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {place.address}
                    </p>
                  )}
                  {place.phone && (
                    <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      {place.phone}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {place.place_place_types?.map((ppt: any) => (
                      <span key={ppt.place_types?.slug} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">
                        {ppt.place_types?.name}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-purple-600 text-sm font-medium flex items-center gap-1">
                    Detayları Gör <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">Salonlar Yakında Eklenecek</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {cityData.name} bölgesindeki pilates salonları yakında eklenecektir.
            </p>
          </div>
        )}
      </section>

      {/* SEO Content */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="prose max-w-none mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{cityData.name} Pilates Rehberi</h2>
            <p className="text-gray-600 leading-relaxed">
              {cityData.name} pilates salonları arasında reformer pilates, mat pilates, klinik pilates ve aletli pilates stüdyoları bulunmaktadır. PilatesTopu ile {cityData.name} bölgesindeki en iyi pilates salonlarını keşfedebilir, fiyatları karşılaştırabilir ve size en yakın stüdyoyu bulabilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Diğer Şehirler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {otherCities.map((c) => (
              <Link key={c.slug} href={`/p-c/${c.slug}`} className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-all hover:-translate-y-0.5">
                <span className="font-medium text-gray-900">{c.name}</span>
                <span className="block text-sm text-gray-500">{c.studio_count}+ salon</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
  }
