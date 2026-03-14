import Link from 'next/link';

const cities = [
  { name: 'İstanbul', slug: 'istanbul', count: 120 },
  { name: 'Ankara', slug: 'ankara', count: 85 },
  { name: 'İzmir', slug: 'izmir', count: 65 },
  { name: 'Antalya', slug: 'antalya', count: 55 },
  { name: 'Bursa', slug: 'bursa', count: 42 },
  { name: 'Eskişehir', slug: 'eskisehir', count: 35 },
  { name: 'Konya', slug: 'konya', count: 30 },
  { name: 'Gaziantep', slug: 'gaziantep', count: 28 },
  { name: 'Kayseri', slug: 'kayseri', count: 25 },
  { name: 'Mersin', slug: 'mersin', count: 22 },
  { name: 'Adana', slug: 'adana', count: 20 },
  { name: 'Samsun', slug: 'samsun', count: 18 },
];

export default function PopularCitiesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Popüler Şehirler</h2>
        <p className="text-gray-600 text-center mb-12">
          Şehrine göre en yakın pilates salonlarını bul
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/p-c/${city.slug}`}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 group border border-gray-100"
            >
              <h3 className="font-bold text-lg group-hover:text-purple-700 transition-colors">
                {city.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{city.count}+ salon</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/p-c"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-700 text-white rounded-full font-semibold hover:bg-purple-800 transition-colors"
          >
            Tüm 81 İli Görüntüle
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
