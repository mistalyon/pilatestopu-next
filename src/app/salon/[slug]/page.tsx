import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

async function getPlace(slug: string) {
  const { data, error } = await supabase
    .from("places")
    .select("*, cities(name, slug)")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return data;
}

async function getPlaceTypes(placeId: string) {
  const { data } = await supabase
    .from("place_place_types")
    .select("place_types(name, slug)")
    .eq("place_id", placeId);
  return data?.map((d: any) => d.place_types) || [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const place = await getPlace(slug);
  if (!place) {
    return { title: "Salon Bulunamadı - PilatesTopu" };
  }
  const cityName = place.cities?.name || "";
  return {
    title: place.meta_title || `${place.name} - ${cityName} Pilates Salonu | PilatesTopu`,
    description: place.meta_description || `${place.name}, ${cityName} pilates salonu. Adres, telefon ve detaylı bilgi.`,
  };
}

export default async function SalonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const place = await getPlace(slug);

  if (!place) {
    notFound();
  }

  const placeTypes = await getPlaceTypes(place.id);
  const cityName = place.cities?.name || "";
  const citySlug = place.cities?.slug || "";

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-purple-200 mb-4">
            <Link href="/" className="hover:text-white">Anasayfa</Link>
            <span className="mx-2">/</span>
            <Link href="/p-c" className="hover:text-white">Salonlar</Link>
            <span className="mx-2">/</span>
            {citySlug && (
              <>
                <Link href={`/p-c/${citySlug}`} className="hover:text-white">{cityName}</Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-white">{place.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{place.name}</h1>
          {place.address && (
            <p className="text-purple-100 text-lg">{place.address}</p>
          )}
          {placeTypes.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {placeTypes.map((pt: any) => (
                <span key={pt.slug} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                  {pt.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Hakkında</h2>
              {place.description ? (
                <div className="prose max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: place.description }} />
              ) : (
                <p className="text-gray-500">Bu salon hakkında detaylı bilgi yakında eklenecektir.</p>
              )}
            </div>

            {place.rating && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Değerlendirme</h2>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-purple-600">{place.rating}</span>
                  <div>
                    <div className="flex text-yellow-500 text-xl">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < Math.round(Number(place.rating)) ? "★" : "☆"}</span>
                      ))}
                    </div>
                    {place.review_count && (
                      <p className="text-gray-500 text-sm">{place.review_count} değerlendirme</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">İletişim Bilgileri</h3>
              <div className="space-y-3">
                {place.address && (
                  <div className="flex items-start gap-3">
                    <span className="text-purple-600 mt-1">📍</span>
                    <span className="text-gray-600">{place.address}</span>
                  </div>
                )}
                {place.phone && (
                  <div className="flex items-center gap-3">
                    <span className="text-purple-600">📞</span>
                    <a href={`tel:${place.phone}`} className="text-purple-600 hover:text-purple-700">{place.phone}</a>
                  </div>
                )}
                {place.website && (
                  <div className="flex items-center gap-3">
                    <span className="text-purple-600">🌐</span>
                    <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 truncate">
                      Web Sitesi
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <p className="text-gray-700 font-medium mb-3">Bu salonu ziyaret ettiniz mi?</p>
              <a
                href={`https://wa.me/905446732202?text=Merhaba, ${place.name} hakkında bilgi almak istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                WhatsApp ile İletişime Geç
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
