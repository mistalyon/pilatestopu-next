import Link from 'next/link';

const studios = [
  { name: 'Dünya Tajik Pilates', city: 'Bursa', type: 'Reformer Pilates', rating: 4.9 },
  { name: 'Fatma Baştuğ Pilates', city: 'İstanbul', type: 'Mat Pilates', rating: 4.8 },
  { name: 'MWellness Kadıköy', city: 'İstanbul', type: 'Klinik Pilates', rating: 4.7 },
  { name: 'SF Bahçeşehir Pilates', city: 'Antalya', type: 'Reformer Pilates', rating: 4.8 },
  { name: 'Hüma Toktaş Pilates', city: 'Antalya', type: 'Mat Pilates', rating: 4.6 },
  { name: 'Yusuf Kızıldağ Pilates', city: 'Eskişehir', type: 'Klinik Pilates', rating: 4.7 },
];

export default function FeaturedStudios() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Öne Çıkan Pilates Salonları</h2>
        <p className="text-gray-600 text-center mb-12">Türkiye&apos;nin en çok tercih edilen pilates salonları</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio) => (
            <div key={studio.name} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                  {studio.type}
                </span>
                <span className="text-sm text-yellow-600 font-semibold">⭐ {studio.rating}</span>
              </div>
              <h3 className="text-lg font-bold mb-1">{studio.name}</h3>
              <p className="text-gray-500 text-sm">{studio.city}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/p-c/istanbul" className="inline-flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900">
            Tüm Salonları Görüntüle →
          </Link>
        </div>
      </div>
    </section>
  );
}
