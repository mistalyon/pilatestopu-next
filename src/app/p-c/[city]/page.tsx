import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { MapPin, ChevronRight, Building2, Phone, Navigation } from "lucide-react";
import EmptyStudioForm from "@/components/EmptyStudioForm";

export const revalidate = 3600;

const SITE_URL = "https://www.pilatestopu.com";
const DEFAULT_IMG = "/images/default-blog.svg";

interface CityData {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    meta_title: string | null;
    meta_description: string | null;
    studio_count: number;
    content: string | null;
}

/* ── Bölge haritası (SEO metinleri için) ── */
const cityRegionMap: Record<string, string> = {
    istanbul: "Marmara", bursa: "Marmara", kocaeli: "Marmara", balikesir: "Marmara",
    tekirdag: "Marmara", sakarya: "Marmara", edirne: "Marmara", kirklareli: "Marmara",
    canakkale: "Marmara", yalova: "Marmara", bilecik: "Marmara",
    ankara: "İç Anadolu", konya: "İç Anadolu", eskisehir: "İç Anadolu", kayseri: "İç Anadolu",
    sivas: "İç Anadolu", kirsehir: "İç Anadolu", nevsehir: "İç Anadolu", nigde: "İç Anadolu",
    aksaray: "İç Anadolu", yozgat: "İç Anadolu", karaman: "İç Anadolu", kirikkale: "İç Anadolu",
    cankiri: "İç Anadolu",
    izmir: "Ege", manisa: "Ege", denizli: "Ege", aydin: "Ege", mugla: "Ege",
    afyonkarahisar: "Ege", kutahya: "Ege", usak: "Ege",
    antalya: "Akdeniz", mersin: "Akdeniz", adana: "Akdeniz", hatay: "Akdeniz",
    kahramanmaras: "Akdeniz", osmaniye: "Akdeniz", isparta: "Akdeniz", burdur: "Akdeniz",
    trabzon: "Karadeniz", samsun: "Karadeniz", ordu: "Karadeniz", giresun: "Karadeniz",
    rize: "Karadeniz", artvin: "Karadeniz", zonguldak: "Karadeniz", kastamonu: "Karadeniz",
    sinop: "Karadeniz", amasya: "Karadeniz", tokat: "Karadeniz", corum: "Karadeniz",
    bolu: "Karadeniz", duzce: "Karadeniz", bartin: "Karadeniz", karabuk: "Karadeniz",
    gumushane: "Karadeniz", bayburt: "Karadeniz",
    erzurum: "Doğu Anadolu", van: "Doğu Anadolu", malatya: "Doğu Anadolu",
    elazig: "Doğu Anadolu", erzincan: "Doğu Anadolu", agri: "Doğu Anadolu",
    kars: "Doğu Anadolu", igdir: "Doğu Anadolu", mus: "Doğu Anadolu",
    bitlis: "Doğu Anadolu", hakkari: "Doğu Anadolu", tunceli: "Doğu Anadolu",
    bingol: "Doğu Anadolu", ardahan: "Doğu Anadolu",
    gaziantep: "Güneydoğu Anadolu", sanliurfa: "Güneydoğu Anadolu",
    diyarbakir: "Güneydoğu Anadolu", mardin: "Güneydoğu Anadolu",
    batman: "Güneydoğu Anadolu", siirt: "Güneydoğu Anadolu",
    sirnak: "Güneydoğu Anadolu", adiyaman: "Güneydoğu Anadolu", kilis: "Güneydoğu Anadolu",
};

/* ── Veri çekme fonksiyonları ── */
async function getCity(slug: string): Promise<CityData | null> {
    const { data, error } = await supabase.from("cities").select("*").eq("slug", slug).single();
    if (error || !data) return null;
    return data;
}

async function getPlacesInCity(cityId: string) {
    const { data } = await supabase.from("places").select("*, place_place_types(place_types(name, slug))").eq("city_id", cityId);
    return data || [];
}

async function getCities() {
    const { data } = await supabase.from("cities").select("name, slug, studio_count").order("name");
    return data || [];
}

async function getNeighborhoods(cityId: string) {
    const { data } = await supabase.from("neighborhoods").select("name, slug").eq("city_id", cityId).order("name");
    return data || [];
}

/* ── SEO: generateMetadata ── */
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
    const { city } = await params;
    const cityData = await getCity(city);
    if (!cityData) return { title: "Bulunamadı | PilatesTopu" };

  const region = cityRegionMap[city] || "";
    const count = cityData.studio_count || 0;

  const title = cityData.meta_title
      || cityData.name + " Pilates Salonları ve Reformer Pilates Stüdyoları (2026)";

  const description = cityData.meta_description
      || cityData.name + " pilates salonları, reformer pilates, mat pilates ve klinik pilates stüdyoları. "
      + cityData.name + " ilindeki " + count + "+ pilates merkezini karşılaştırın, fiyatları inceleyin ve size en yakın stüdyoyu bulun.";

  const keywords = [
        cityData.name + " pilates",
        cityData.name + " pilates salonları",
        cityData.name + " reformer pilates",
        cityData.name + " mat pilates",
        cityData.name + " klinik pilates",
        cityData.name + " pilates fiyatları",
        cityData.name + " pilates stüdyoları",
        cityData.name + " aletli pilates",
        "pilates " + cityData.name,
      ];

  return {
        title,
        description,
        keywords,
        alternates: { canonical: SITE_URL + "/p-c/" + city },
        openGraph: {
                title: cityData.name + " Pilates Salonları | " + count + "+ Stüdyo | PilatesTopu",
                description,
                url: SITE_URL + "/p-c/" + city,
                type: "website",
                siteName: "PilatesTopu",
                locale: "tr_TR",
        },
        twitter: {
                card: "summary_large_image",
                title: cityData.name + " Pilates Salonları | PilatesTopu",
                description,
        },
  };
}

/* ── Sayfa bileşeni ── */
export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params;
    const cityData = await getCity(city);
    if (!cityData) notFound();

  const [places, allCities, neighborhoods] = await Promise.all([
        getPlacesInCity(cityData.id),
        getCities(),
        getNeighborhoods(cityData.id),
      ]);

  const otherCities = allCities.filter(function(c) { return c.slug !== city; }).slice(0, 12);
    const region = cityRegionMap[city] || "";

  /* JSON-LD Structured Data */
  /* JSON-LD Structured Data - Zengin Schema */
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: cityData.name + " Pilates Salonları",
      description: cityData.name + " ilindeki pilates salonları, reformer pilates ve mat pilates stüdyoları rehberi.",
      url: SITE_URL + "/p-c/" + city,
      isPartOf: {
        "@type": "WebSite",
        name: "PilatesTopu",
        url: SITE_URL,
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: places.slice(0, 10).map(function(place, index) {
          return {
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "SportsActivityLocation",
              name: place.name,
              url: SITE_URL + "/salon/" + place.slug,
              address: place.address ? {
                "@type": "PostalAddress",
                streetAddress: place.address,
                addressLocality: cityData.name,
                addressCountry: "TR",
              } : undefined,
              telephone: place.phone || undefined,
            },
          };
        }),
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Pilates Salonları", item: SITE_URL + "/p-c" },
          { "@type": "ListItem", position: 3, name: cityData.name + " Pilates Salonları" },
        ],
      },
      numberOfItems: places.length,
      about: {
        "@type": "City",
        name: cityData.name,
        containedInPlace: {
          "@type": "Country",
          name: "Türkiye",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      "@id": SITE_URL + "/p-c/" + city + "#aggregate",
      name: cityData.name + " Pilates Salonları",
      description: cityData.name + " ilindeki " + (cityData.studio_count || 0) + "+ pilates salonu ve reformer pilates stüdyosu.",
      url: SITE_URL + "/p-c/" + city,
      address: {
        "@type": "PostalAddress",
        addressLocality: cityData.name,
        addressCountry: "TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        addressCountry: "TR",
      },
      additionalType: "https://schema.org/HealthAndBeautyBusiness",
      knowsAbout: [
        "Reformer Pilates",
        "Mat Pilates",
        "Klinik Pilates",
        "Aletli Pilates",
        "Hamile Pilatesi",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: cityData.name + " pilates salonları fiyatları ne kadar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: cityData.name + " ilindeki pilates salonlarında aylık üyelik fiyatları stüdyoya ve pilates türüne göre değişmektedir. Reformer pilates genellikle mat pilatese göre daha yüksek fiyatlıdır. Güncel fiyatlar için salon detay sayfalarını inceleyebilirsiniz.",
          },
        },
        {
          "@type": "Question",
          name: cityData.name + " en iyi pilates salonu hangisi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: cityData.name + " ilinde " + (cityData.studio_count || 0) + "+ pilates salonu bulunmaktadır. En iyi salonu seçerken eğitmen deneyimi, salon donanımı, konum ve fiyat gibi kriterleri değerlendirmenizi öneririz. PilatesTopu üzerinden tüm salonları karşılaştırabilirsiniz.",
          },
        },
        {
          "@type": "Question",
          name: cityData.name + " reformer pilates yapılan yerler neresi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: cityData.name + " genelinde birçok stüdyoda reformer pilates dersleri verilmektedir. Reformer pilates, özel aletler kullanılarak yapılan ve kas tonusu, esneklik ile duruş düzeltme konusunda etkili bir pilates türüdür.",
          },
        },
      ],
    },
  ];

  return (
        <>
              <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                      />
        
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
                      
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                  {cityData.name} Pilates Salonları
                                </h1>
                                <p className="text-xl text-purple-100 max-w-2xl">
                                  {cityData.description || cityData.name + " pilates salonları, reformer pilates stüdyoları ve fiyatları"}
                                </p>
                      
                                <div className="mt-6 flex items-center gap-4 flex-wrap">
                                            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                                              {cityData.studio_count}+ Stüdyo
                                            </span>
                                  {neighborhoods.length > 0 && (
                        <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                          {neighborhoods.length} İlçe/Semt
                        </span>
                                            )}
                                </div>
                      </div>
              </section>
        
          {/* İlçeler */}
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
                                          {neighborhoods.map(function(n: any) {
                                    return (
                                                        <Link key={n.slug} href={"/p-c/" + city + "/" + n.slug}
                                                                              className="flex items-center gap-3 bg-purple-50 hover:bg-purple-100 rounded-xl px-4 py-3 transition-all group">
                                                                            <MapPin className="w-4 h-4 text-purple-400 group-hover:text-purple-600 flex-shrink-0" />
                                                                            <span className="text-gray-700 group-hover:text-purple-700 font-medium text-sm">{n.name}</span>
                                                                            <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-purple-500" />
                                                        </Link>
                                                      );
                  })}
                                        </div>
                            </div>
                  </section>
              )}
        
          {/* Salon Listesi */}
              <section className="max-w-7xl mx-auto px-4 py-16">
                      <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        {cityData.name} Pilates Salonları
                      </h2>
              
                {places.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {places.map(function(place: any) {
                                    return (
                                                      <Link key={place.id} href={"/salon/" + place.slug}
                                                                          className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group border border-gray-100">
                                                                        <div className="relative h-40 w-full">
                                                                                            <Image src={place.image_url || DEFAULT_IMG} alt={place.name + " - " + cityData.name + " Pilates Salonu"} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                                                                        </div>
                                                                        <div className="p-5">
                                                                                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600">{place.name}</h3>
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
                                                                                            <div className="mt-4 text-purple-600 text-sm font-medium flex items-center gap-1">
                                                                                                                  Detayları Gör <ChevronRight className="w-4 h-4" />
                                                                                              </div>
                                                                        </div>
                                                      </Link>
                                                    );
                    })}
                    </div>
                  ) : (
                    <EmptyStudioForm locationName={cityData.name} />
                      )}
              </section>
        
            {/* SEO İçerik Bölümü */}
            <section className="bg-white py-16">
                <div className="max-w-4xl mx-auto px-4">
                    {cityData.content ? (
                        <div className="prose prose-purple prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: cityData.content }} />
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">{cityData.name} Pilates Rehberi</h2>
                            <div className="prose prose-purple max-w-none text-gray-700 space-y-4">
                                <p>
                                    {cityData.name}, {region ? region + " Bölgesi'nin önemli şehirlerinden biri olarak" : "Türkiye'nin gelişen illerinden biri olarak"} pilates alanında giderek büyüyen bir stüdyo ağına sahiptir. Şehirde {cityData.studio_count}+ pilates salonu ile reformer pilates, mat pilates, klinik pilates ve aletli pilates gibi farklı branşlarda profesyonel eğitim imkânı sunulmaktadır.
                                </p>
                                <p>
                                    {cityData.name} pilates salonları, sertifikalı eğitmenler eşliğinde birebir özel dersler ve grup seansları düzenlemektedir. İster duruş bozukluğunu düzeltmek, ister core kaslarını güçlendirmek, ister doğum sonrası toparlanma ya da rehabilitasyon amaçlı olsun, {cityData.name} ilindeki stüdyolar her seviyeye uygun programlar sunmaktadır.
                                </p>
                                <p>
                                    PilatesTopu olarak {cityData.name} ilindeki en iyi pilates salonlarını, fiyat bilgilerini ve kullanıcı değerlendirmelerini bir araya getiriyoruz. Size en uygun {cityData.name} pilates salonunu bulmak için yukarıdaki listeyi inceleyebilir, stüdyoları karşılaştırabilirsiniz.
                                    {neighborhoods.length > 0 ? " " + cityData.name + " ilçelerindeki salonları görmek için yukarıdaki ilçe bağlantılarını kullanabilirsiniz." : ""}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </section>
        
          {/* Diğer Şehirler */}
              <section className="bg-gray-50 py-16">
                      <div className="max-w-7xl mx-auto px-4">
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">Diğer Şehirler</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                  {otherCities.map(function(c: any) {
                        return (
                                          <Link key={c.slug} href={"/p-c/" + c.slug}
                                                              className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-all">
                                                            <span className="font-medium text-gray-900">{c.name}</span>
                                                            <span className="block text-sm text-gray-500">{c.studio_count}+ salon</span>
                                          </Link>
                                        );
        })}
                                </div>
                      </div>
              </section>
        </>
      );
}
