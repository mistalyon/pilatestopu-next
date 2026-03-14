import Link from 'next/link';

const cities = [
  { name: 'Istanbul', slug: 'istanbul', count: 150 },
  { name: 'Ankara', slug: 'ankara', count: 85 },
  { name: 'Izmir', slug: 'izmir', count: 72 },
  { name: 'Antalya', slug: 'antalya', count: 58 },
  { name: 'Bursa', slug: 'bursa', count: 45 },
  { name: 'Eskisehir', slug: 'eskisehir', count: 32 },
];

export default function PopularCitiesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Populer Sehirler</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((city) => (
            <Link key={city.slug} href={`/p-c/${city.slug}-pilates`}>
              <div className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1">{city.name}</h3>
                <p className="text-sm text-gray-500">{city.count}+ salon</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
