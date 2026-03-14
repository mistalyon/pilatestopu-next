import Link from 'next/link';

const cities = [
  { name: 'İstanbul', slug: 'istanbul', count: 45 },
  { name: 'Ankara', slug: 'ankara', count: 28 },
  { name: 'İzmir', slug: 'izmir', count: 22 },
  { name: 'Antalya', slug: 'antalya', count: 18 },
  { name: 'Bursa', slug: 'bursa', count: 15 },
  { name: 'Eskişehir', slug: 'eskisehir', count: 12 },
];

export default function PopularCitiesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Popüler Şehirler</h2>
        <p className="text-gray-600 text-center mb-12">Şehrine göre en yakın pilates salonlarını bul</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/p-c/${city.slug}`}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
            >
              <h3 className="font-bold text-lg group-hover:text-purple-700 transition-colors">{city.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{city.count} salon</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/p-c/istanbul" className="inline-flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900">
            Tüm Şehirleri Görüntüle →
          </Link>
        </div>
      </div>
    </section>
  );
}
