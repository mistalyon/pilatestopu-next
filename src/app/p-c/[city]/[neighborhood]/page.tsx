import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Phone, Clock, Star, ChevronRight, Building2, Navigation, ArrowLeft } from 'lucide-react'

const SITE_URL = "https://www.pilatestopu.com";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const revalidate = 3600;

interface Props {
  params: { city: string; neighborhood: string }
}

async function getNeighborhoodData(citySlug: string, neighborhoodSlug: string) {
  const { data: neighborhood } = await supabase
    .from('neighborhoods')
    .select('*, cities(*)')
    .eq('slug', neighborhoodSlug)
    .single()

  if (!neighborhood) return null

  const city = neighborhood.cities
  if (!city || city.slug !== citySlug) return null

  const { data: places } = await supabase
    .from('places')
    .select('*, place_place_types(place_types(name, slug))')
    .eq('city_id', city.id)

  const { data: otherNeighborhoods } = await supabase
    .from('neighborhoods')
    .select('name, slug')
    .eq('city_id', city.id)
    .neq('slug', neighborhoodSlug)
    .order('name')
    .limit(12)

  return { neighborhood, city, places: places || [], otherNeighborhoods: otherNeighborhoods || [] }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getNeighborhoodData(params.city, params.neighborhood)
  if (!data) return { title: 'Bulunamadı' }

  const { neighborhood, city, places } = data
  const placeCount = places.length
  const title = `${neighborhood.name} Pilates Salonları ve Reformer Pilates Stüdyoları (2026) | PilatesTopu`
  const description = `${neighborhood.name}, ${city.name} bölgesindeki ${placeCount > 0 ? placeCount + " " : ""}pilates salonu ve reformer pilates stüdyosunu keşfedin. Mat pilates, aletli pilates, klinik pilates fiyatları ve ücretsiz deneme dersi fırsatları.`
  const pageUrl = `${SITE_URL}/p-c/${params.city}/${params.neighborhood}`

  const keywords = [
    `${neighborhood.name} pilates`,
    `${neighborhood.name} reformer pilates`,
    `${neighborhood.name} pilates salonu`,
    `${neighborhood.name} pilates stüdyosu`,
    `${neighborhood.name} mat pilates`,
    `${neighborhood.name} aletli pilates`,
    `${neighborhood.name} klinik pilates`,
    `${neighborhood.name} pilates fiyatları`,
    `${city.name} ${neighborhood.name} pilates`,
    `${neighborhood.name} pilates dersleri`,
  ]

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'PilatesTopu',
      type: 'website',
      locale: 'tr_TR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: pageUrl,
    },
  }
}

export async function generateStaticParams() {
  const { data: neighborhoods } = await supabase
    .from('neighborhoods')
    .select('slug, cities(slug)')

  return (neighborhoods || []).map((n: any) => ({
    city: n.cities?.slug || '',
    neighborhood: n.slug,
  }))
}

export default async function NeighborhoodPage({ params }: Props) {
  const data = await getNeighborhoodData(params.city, params.neighborhood)
  if (!data) notFound()

  const { neighborhood, city, places, otherNeighborhoods } = data
  const pageUrl = `${SITE_URL}/p-c/${params.city}/${params.neighborhood}`
  const cityUrl = `${SITE_URL}/p-c/${city.slug}`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${neighborhood.name} Pilates Salonları (2026)`,
      description: `${neighborhood.name}, ${city.name} bölgesindeki en iyi pilates salonları ve reformer pilates stüdyoları`,
      url: pageUrl,
      inLanguage: 'tr',
      isPartOf: {
        '@type': 'WebSite',
        name: 'PilatesTopu',
        url: SITE_URL,
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Pilates Salonları', item: `${SITE_URL}/p-c` },
          { '@type': 'ListItem', position: 3, name: city.name, item: cityUrl },
          { '@type': 'ListItem', position: 4, name: neighborhood.name, item: pageUrl },
        ],
      },
      ...(places.length > 0 ? {
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: places.slice(0, 10).map((place: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: place.name,
            url: `${SITE_URL}/salon/${place.slug}`,
          })),
        },
      } : {}),
    },
    ...(places.length > 0 ? [{
      '@context': 'https://schema.org',
      '@type': ['SportsActivityLocation', 'HealthAndBeautyBusiness'],
      name: `${neighborhood.name} Pilates Salonları`,
      description: `${neighborhood.name} bölgesinde pilates ve reformer pilates hizmeti veren stüdyolar`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: neighborhood.name,
        addressRegion: city.name,
        addressCountry: 'TR',
      },
      geo: neighborhood.latitude && neighborhood.longitude ? {
        '@type': 'GeoCoordinates',
        latitude: neighborhood.latitude,
        longitude: neighborhood.longitude,
      } : undefined,
      url: pageUrl,
    }] : []),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `${neighborhood.name} bölgesinde kaç pilates salonu var?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${neighborhood.name} bölgesinde PilatesTopu'da kayıtlı ${places.length} adet pilates salonu bulunmaktadır.`,
          },
        },
        {
          '@type': 'Question',
          name: `${neighborhood.name} pilates fiyatları ne kadar?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${neighborhood.name} bölgesinde pilates fiyatları salonun türüne ve ders tipine göre değişmektedir. Reformer pilates genellikle seans başına 500-1500 TL, mat pilates ise 300-800 TL arasında değişmektedir.`,
          },
        },
        {
          '@type': 'Question',
          name: `${neighborhood.name} bölgesinde reformer pilates yapan yerler nereler?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${neighborhood.name} bölgesindeki reformer pilates stüdyolarını PilatesTopu üzerinden inceleyebilir, fiyatlarını ve hizmetlerini karşılaştırabilirsiniz.`,
          },
        },
      ],
    },
  ]

  const pilatesTypes = [
    { name: 'Reformer Pilates', icon: '🏋️' },
    { name: 'Mat Pilates', icon: '🧘' },
    { name: 'Aletli Pilates', icon: '⚙️' },
    { name: 'Klinik Pilates', icon: '🩺' },
    { name: 'Hamile Pilates', icon: '🤰' },
    { name: 'Grup Dersleri', icon: '👥' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <li><Link href="/" className="hover:text-purple-600">Ana Sayfa</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li><Link href="/p-c" className="hover:text-purple-600">Pilates Salonları</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li><Link href={`/p-c/${city.slug}`} className="hover:text-purple-600">{city.name}</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-purple-700 font-medium">{neighborhood.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href={`/p-c/${city.slug}`}
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{city.name} Salonlarına Dön</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-600 text-white p-3 rounded-xl">
              <Navigation className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {neighborhood.name} <span className="text-purple-600">Pilates Salonları</span>
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {city.name} / {neighborhood.name} Pilates Stüdyoları ve Fiyatları
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-700 max-w-3xl mt-4">
            {neighborhood.name} bölgesindeki en iyi pilates salonlarını keşfedin. {neighborhood.name} reformer pilates, mat pilates ve aletli pilates stüdyolarını karşılaştırın, {neighborhood.name} pilates fiyatlarını inceleyin ve size en uygun salonu seçin.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Pilates Salonu', value: `${places.length}+`, icon: Building2 },
              { label: 'Pilates Türü', value: '6', icon: Star },
              { label: 'Uzman Eğitmen', value: `${places.length * 3}+`, icon: Clock },
              { label: 'Mutlu Üye', value: `${places.length * 50}+`, icon: MapPin },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/80 backdrop-blur rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-700">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilates Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {neighborhood.name} Bölgesinde Pilates Türleri
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pilatesTypes.map((type) => (
              <div
                key={type.name}
                className="bg-purple-50 rounded-xl p-4 text-center hover:bg-purple-100 transition-colors cursor-pointer"
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <div className="text-sm font-medium text-gray-800">{type.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Salon Listings */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {neighborhood.name} Pilates Salonları Listesi
          </h2>

          {places.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place: any) => (
                <Link
                  key={place.id}
                  href={`/salon/${place.slug}`}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 h-32 flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-white/80" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                      {place.name}
                    </h3>
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
                        <span
                          key={ppt.place_types?.slug}
                          className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full"
                        >
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
            <div className="bg-white rounded-2xl p-12 text-center">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                {neighborhood.name} bölgesine salon ekleniyor
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {neighborhood.name} bölgesindeki pilates salonları yakında eklenecektir.
                Şimdilik {city.name} genelindeki salonları inceleyebilirsiniz.
              </p>
              <Link
                href={`/p-c/${city.slug}`}
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl mt-6 hover:bg-purple-700 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                {city.name} Salonlarını İncele
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other Neighborhoods */}
      {otherNeighborhoods.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {city.name} Diğer İlçe ve Semtlerdeki Pilates Salonları
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {otherNeighborhoods.map((n: any) => (
                <Link
                  key={n.slug}
                  href={`/p-c/${city.slug}/${n.slug}`}
                  className="flex items-center gap-2 bg-gray-50 hover:bg-purple-50 rounded-xl px-4 py-3 transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                  <span className="text-gray-700 group-hover:text-purple-700 font-medium">{n.name} Pilates</span>
                  <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-purple-500" />
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href={`/p-c/${city.slug}`}
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Tüm {city.name} Pilates Salonlarını Gör →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SEO Content - Neighborhood Specific */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {neighborhood.name} Pilates Rehberi - {city.name}
          </h2>
          <div className="prose prose-purple max-w-none text-gray-700 space-y-6">
            <p>
              {neighborhood.name}, {city.name} ilinin en popüler bölgelerinden biri olarak pilates tutkunları için geniş bir stüdyo seçeneği sunmaktadır. {neighborhood.name} pilates salonları, modern ekipmanları ve deneyimli eğitmenleri ile bölge sakinlerine kaliteli pilates deneyimi yaşatmaktadır.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8">
              {neighborhood.name} Reformer Pilates Stüdyoları
            </h3>
            <p>
              {neighborhood.name} reformer pilates stüdyoları, özellikle son yıllarda büyük ilgi görmektedir. {neighborhood.name} bölgesindeki reformer pilates salonları, kişiye özel programlar ve küçük grup dersleri ile hem yeni başlayanlar hem de ileri seviye katılımcılar için uygun seçenekler sunmaktadır. {neighborhood.name} reformer pilates fiyatları stüdyoya göre değişiklik gösterse de, bölgede her bütçeye uygun seçenekler mevcuttur.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8">
              {neighborhood.name} Pilates Türleri ve Dersleri
            </h3>
            <p>
              {neighborhood.name} bölgesinde mat pilates, aletli pilates, klinik pilates ve hamile pilatesi gibi farklı pilates türlerinde hizmet veren stüdyolar bulunmaktadır. {neighborhood.name} mat pilates dersleri esneklik ve core güçlendirme odaklı çalışmalar sunarken, {neighborhood.name} klinik pilates hizmetleri bel ağrısı, boyun ağrısı ve duruş bozuklukları gibi sorunlara yönelik rehabilitasyon programları içermektedir.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8">
              {neighborhood.name} Pilates Salonlarının Faydaları
            </h3>
            <p>
              {neighborhood.name} pilates stüdyolarında düzenli egzersiz yapmanın pek çok faydası bulunmaktadır. Esneklik artışı, kas tonusu iyileşmesi, duruş düzeltme, stres azaltma ve genel vücut sağlığının korunması bu faydaların başında gelmektedir. {neighborhood.name} bölgesindeki pilates eğitmenleri, kişisel ihtiyaçlarınıza göre program hazırlayarak en verimli sonuçları almanızı sağlamaktadır.
            </p>

            <p className="font-medium">
              {neighborhood.name} bölgesinde size en uygun pilates salonunu bulmak için yukarıdaki listeyi inceleyebilir, salonların sunduğu hizmetleri ve fiyatları karşılaştırabilirsiniz. Birçok {neighborhood.name} pilates salonu ücretsiz deneme dersi imkanı sunmaktadır.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {neighborhood.name} Pilates Hakkında Sık Sorulan Sorular
          </h2>
          <div className="space-y-4">
            {[
              {
                q: `${neighborhood.name} pilates fiyatları ne kadar?`,
                a: `${neighborhood.name} bölgesindeki pilates fiyatları stüdyoya ve pilates türüne göre değişmektedir. Reformer pilates ders ücretleri genellikle mat pilates derslerinden daha yüksektir. Detaylı fiyat bilgisi için yukarıdaki ${neighborhood.name} pilates salonlarının sayfalarını inceleyebilirsiniz.`,
              },
              {
                q: `${neighborhood.name} yakınlarında reformer pilates yapabileceğim yer var mı?`,
                a: `Evet, ${neighborhood.name} bölgesinde reformer pilates hizmeti sunan birçok stüdyo bulunmaktadır. PilatesTopu üzerinden ${neighborhood.name} reformer pilates salonlarını görüntüleyebilir ve size en yakın stüdyoyu bulabilirsiniz.`,
              },
              {
                q: `${neighborhood.name} pilates salonlarında deneme dersi var mı?`,
                a: `${neighborhood.name} bölgesindeki birçok pilates salonu yeni üyeler için ücretsiz veya indirimli deneme dersi fırsatı sunmaktadır. Detaylı bilgi için ilgilendiğiniz salonun sayfasını ziyaret edebilirsiniz.`,
              },
              {
                q: `${neighborhood.name} bölgesinde hamile pilatesi yapılıyor mu?`,
                a: `${neighborhood.name} bölgesinde hamile pilatesi hizmeti sunan stüdyolar mevcuttur. Hamile pilatesi, gebelik döneminde güvenli egzersiz yapmanızı sağlayan özel bir programdır. Uzman eğitmenler eşliğinde ${neighborhood.name} hamile pilates derslerine katılabilirsiniz.`,
              },
            ].map((faq, i) => (
              <details key={i} className="bg-gray-50 rounded-xl p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-gray-700 mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {neighborhood.name} Pilates Salonunuzu Ekleyin
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            {neighborhood.name} bölgesinde pilates salonu işletiyorsanız,
            PilatesTopu&apos;da ücretsiz olarak yerinizi alın ve yeni üyeler kazanmaya başlayın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/is-ortakligi"
              className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors"
            >
              Ücretsiz Kayıt Ol
            </Link>
            <Link
              href="/iletisim"
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
