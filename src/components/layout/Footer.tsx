import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const footerLinks = {
  "Pilates Rehberi": [
    { name: "İstanbul Pilates", href: "/p-c/istanbul" },
    { name: "Ankara Pilates", href: "/p-c/ankara" },
    { name: "İzmir Pilates", href: "/p-c/izmir" },
    { name: "Antalya Pilates", href: "/p-c/antalya" },
    { name: "Bursa Pilates", href: "/p-c/bursa" },
    { name: "Tüm Şehirler", href: "/p-c" },
  ],
  "Hakkımızda": [
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Blog", href: "/blog" },
    { name: "İş Ortaklığı", href: "/is-ortakligi" },
    { name: "İletişim", href: "/iletisim" },
  ],
  "Destek": [
    { name: "Yardım Merkezi", href: "/yardim" },
    { name: "Kullanım Koşulları", href: "/kullanim-kosullari" },
    { name: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <img
                src="https://www.pilatestopu.com/wp-content/uploads/2025/04/Pilates-Topu.png"
                alt="PilatesTopu"
                className="h-10 brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Türkiye’nin en kapsamlı pilates rehberi. 81 ilde pilates salonları, dersler ve ekipmanlar.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+905446732202" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" /> +90 544 673 22 02
              </a>
              <a href="mailto:info@pilatestopu.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" /> info@pilatestopu.com
              </a>
              <a
                href="https://wa.me/905446732202"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} PilatesTopu. Tüm hakları saklıdır.</p>
            <div className="flex items-center gap-1 text-xs">
              <MapPin className="w-3 h-3" /> Türkiye
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
