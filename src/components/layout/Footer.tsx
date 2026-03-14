import Link from 'next/link';

const popularCities = [
  { name: 'İstanbul', slug: 'istanbul' },
  { name: 'Ankara', slug: 'ankara' },
  { name: 'İzmir', slug: 'izmir' },
  { name: 'Antalya', slug: 'antalya' },
  { name: 'Bursa', slug: 'bursa' },
  { name: 'Eskişehir', slug: 'eskisehir' },
];

const footerLinks = {
  kurumsal: [
    { href: '/hakkimizda', label: 'Hakkımızda' },
    { href: '/iletisim', label: 'İletişim' },
    { href: '/is-ortakligi', label: 'İş Ortaklığı' },
    { href: '/blog', label: 'Blog' },
  ],
  yasal: [
    { href: '/kullanim-kosullari', label: 'Kullanım Koşulları' },
    { href: '/gizlilik-politikasi', label: 'Gizlilik Politikası' },
    { href: '/yardim-merkezi', label: 'Yardım Merkezi' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold text-white">
              PilatesTopu
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Türkiye&apos;nin en kapsamlı pilates rehberi. En iyi pilates salonlarını, eğitmenleri ve dersleri keşfedin.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="mailto:info@pilatestopu.com" className="hover:text-white transition-colors">
                info@pilatestopu.com
              </a>
            </div>
            <p className="mt-2 text-sm">+90 544 673 22 02</p>
            <p className="text-sm">Balat, Fatih / İstanbul</p>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popüler Şehirler</h3>
            <ul className="space-y-2">
              {popularCities.map((city) => (
                <li key={city.slug}>
                  <Link href={`/p-c/${city.slug}`} className="text-sm hover:text-white transition-colors">
                    {city.name} Pilates Salonları
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kurumsal</h3>
            <ul className="space-y-2">
              {footerLinks.kurumsal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Yasal</h3>
            <ul className="space-y-2">
              {footerLinks.yasal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PilatesTopu. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
