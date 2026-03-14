import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const popularCities = [
  'istanbul', 'ankara', 'izmir', 'antalya', 'bursa', 'eskisehir',
  'konya', 'gaziantep', 'adana', 'mersin', 'kayseri', 'samsun',
  'trabzon', 'denizli', 'mugla',
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">PilatesTopu</h3>
            <p className="text-sm leading-relaxed mb-4">
              Turkiye&apos;nin en kapsamli pilates rehberi. En iyi pilates salonlarini kesfedin.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:info@pilatestopu.com" className="flex items-center gap-2 hover:text-white">
                <Mail size={16} /> info@pilatestopu.com
              </a>
              <a href="tel:+905446732202" className="flex items-center gap-2 hover:text-white">
                <Phone size={16} /> +90 544 673 22 02
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={16} /> Fatih, Istanbul
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Sayfalar</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/hakkimizda" className="hover:text-white">Hakkimizda</Link></li>
              <li><Link href="/iletisim" className="hover:text-white">Iletisim</Link></li>
              <li><Link href="/is-ortakligi" className="hover:text-white">Is Ortakligi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Populer Sehirler</h4>
            <ul className="space-y-2 text-sm">
              {popularCities.slice(0, 8).map((city) => (
                <li key={city}>
                  <Link href={`/p-c/${city}-pilates`} className="hover:text-white capitalize">
                    {city} Pilates
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Yasal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/kullanim-kosullari" className="hover:text-white">Kullanim Kosullari</Link></li>
              <li><Link href="/gizlilik-politikasi" className="hover:text-white">Gizlilik Politikasi</Link></li>
              <li><Link href="/yardim-merkezi" className="hover:text-white">Yardim Merkezi</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PilatesTopu.com - Tum haklari saklidir.</p>
        </div>
      </div>
    </footer>
  );
}
