import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { MapPin, Phone, Globe, Star, MessageCircle, ChevronRight } from "lucide-react";

const SITE_URL = "https://www.pilatestopu.com";

export const revalidate = 3600;

async function getPlace(slug: string) {
  const { data } = await supabase
    .from("places")
    .select("*, cities(name, slug)")
    .eq("slug", slug)
    .single();
  return data;
}

async function getPlaceTypes(placeId: number) {
  const { data } = await supabase
    .from("place_place_types")
    .select("place_types(name, slug)")
    .eq("place_id", placeId);
  return data?.map((d: any) => d.place_types).filter(Boolean) || [];
}

async function getRelatedPlaces(cityId: number, currentSlug: string) {
  const { data } = await supabase
    .from("places")
    .select("name, slug, rating, review_count, address")
    .eq("city_id", cityId)
    .neq("slug", currentSlug)
    .limit(3);
  return data || [];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const place = await getPlace(slug);
  if (!place) return { title: "Salon Bulunamadı" };

  const cityName = place.cities?.name || "";
  const title = place.meta_title || `${place.name} - ${cityName} Pilates Salonu | PilatesTopu`;
  const description = place.meta_description || `${place.name}, ${cityName} bölgesinde hizmet veren pilates salonu. Adres, telefon, fiyatlar ve değerlendirme bilgileri.`;
  const pageUrl = `${SITE_URL}/salon/${slug}`;
  const placeTypes = await getPlaceTypes(place.id);
  const typeNames = placeTypes.map((pt: any) => pt.name).join(", ");

  const keywords = [
    place.name,
    `${place.name} pilates`,
    `${cityName} pilates salonu`,
    `${cityName} reformer pilates`,
    ...(typeNames ? typeNames.split(", ") : []),
    `${place.name} fiyatları`,
    `${place.name} yorumları`,
  ];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      type: "website",
      url: pageUrl,
      siteName: "PilatesTopu",
      locale: "tr_TR",
      images: place.featured_image ? [place.featured_image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SalonDetailPage({ params }: Props) {
  const { slug } = await params;
  const place = await getPlace(slug);
  if (!place) notFound();

  const placeTypes = await getPlaceTypes(place.id);
  const relatedPlaces = await getRelatedPlaces(place.city_id, slug);
  const cityName = place.cities?.name || "";
  const citySlug = place.cities?.slug || "";
  const pageUrl = `${SITE_URL}/salon/${slug}`;

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "HealthAndBeautyBusiness"],
    name: place.name,
    description: place.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: place.address,
      addressLocality: cityName,
      addressCountry: "TR",
    },
    telephone: place.phone || undefined,
    url: place.website || pageUrl,
    image: place.featured_image || undefined,
    aggregateRating: place.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: place.rating,
          reviewCount: place.review_count || 1,
          bestRating: 5,
        }
      : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Salonlar", item: `${SITE_URL}/p-c` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${cityName} Pilates`,
        item: `${SITE_URL}/p-c/${citySlug}`,
      },
      { "@type": "ListItem", position: 4, name: place.name, item: pageUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-gradient-to-b from-[#F2DFF4] to-white py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-[#730EC3]">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/p-c" className="hover:text-[#730EC3]">Salonlar</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/p-c/${citySlug}`} className="hover:text-[#730EC3]">{cityName}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#730EC3] font-medium">{place.name}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{place.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {place.rating && (
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(place.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-1 font-medium">{place.rating}</span>
                {place.review_count && (
                  <span className="text-gray-400">({place.review_count} değerlendirme)</span>
                )}
              </div>
            )}
            {placeTypes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {placeTypes.map((pt: any) => (
                  <span
                    key={pt.slug}
                    className="bg-[#730EC3]/10 text-[#730EC3] px-2 py-0.5 rounded-full text-xs font-medium"
                  >
                    {pt.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {place.featured_image && (
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={place.featured_image}
                  alt={place.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            {place.description && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Hakkında</h2>
                <p className="text-gray-600 leading-relaxed">{place.description}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4 border">
              <h3 className="font-bold text-gray-900 text-lg">İletişim Bilgileri</h3>
              {place.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#730EC3] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{place.address}</span>
                </div>
              )}
              {place.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#730EC3] flex-shrink-0" />
                  <a
                    href={`tel:${place.phone}`}
                    className="text-gray-600 text-sm hover:text-[#730EC3]"
                  >
                    {place.phone}
                  </a>
                </div>
              )}
              {place.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#730EC3] flex-shrink-0" />
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#730EC3] hover:underline truncate"
                  >
                    {place.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              <a
                href={`https://wa.me/905446732202?text=Merhaba, ${place.name} hakkında bilgi almak istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-xl transition-colors w-full mt-4"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp ile Ulaş
              </a>
            </div>

            <div className="bg-[#F2DFF4]/50 rounded-xl p-6 border border-[#730EC3]/10">
              <h3 className="font-bold text-gray-900 mb-2">İşletme Sahibi misiniz?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Salon bilgilerinizi güncelleyin ve daha fazla müşteriye ulaşın.
              </p>
              <Link
                href="/is-ortakligi"
                className="text-sm text-[#730EC3] font-medium hover:underline"
              >
                Detaylı Bilgi &rarr;
              </Link>
            </div>
          </div>
        </div>

        {relatedPlaces.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {cityName} Bölgesindeki Diğer Salonlar
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPlaces.map((rp: any) => (
                <Link
                  key={rp.slug}
                  href={`/salon/${rp.slug}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#730EC3] transition-colors">
                    {rp.name}
                  </h3>
                  {rp.address && (
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {rp.address}
                    </p>
                  )}
                  {rp.rating && (
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{rp.rating}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
