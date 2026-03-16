"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Anasayfa", href: "/" },
  { name: "Salonlar", href: "/p-c" },
  { name: "Blog", href: "/blog" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const slug = searchQuery.trim().toLowerCase()
        .replace(/ı/g, "i").replace(/ü/g, "u").replace(/ş/g, "s")
        .replace(/ö/g, "o").replace(/ç/g, "c").replace(/ğ/g, "g")
        .replace(/İ/g, "i").replace(/Ü/g, "u").replace(/Ş/g, "s")
        .replace(/Ö/g, "o").replace(/Ç/g, "c").replace(/Ğ/g, "g")
        .replace(/\s+/g, "-");
      router.push(`/p-c/${slug}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src="/images/logo.svg"
            alt="PilatesTopu"
            className="h-8"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-[#730EC3] transition-colors font-medium text-sm"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Ara"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3">
          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Şehir adı yazın... (örn: İstanbul, Ankara)"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#730EC3]/30 focus:border-[#730EC3] text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="bg-[#730EC3] hover:bg-[#5a0b9a] text-white px-4 py-2 rounded-xl transition-colors text-sm font-medium"
            >
              Ara
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#730EC3] transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Anasayfa", href: "/" },
  { name: "Salonlar", href: "/p-c" },
  { name: "Blog", href: "/blog" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const slug = searchQuery.trim().toLowerCase()
        .replace(/ı/g, "i").replace(/ü/g, "u").replace(/ş/g, "s")
        .replace(/ö/g, "o").replace(/ç/g, "c").replace(/ğ/g, "g")
        .replace(/İ/g, "i").replace(/Ü/g, "u").replace(/Ş/g, "s")
        .replace(/Ö/g, "o").replace(/Ç/g, "c").replace(/Ğ/g, "g")
        .replace(/\s+/g, "-");
      router.push(`/p-c/${slug}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src="https://www.pilatestopu.com/wp-content/uploads/2025/04/Pilates-Topu.png"
            alt="PilatesTopu"
            className="h-8"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-[#730EC3] transition-colors font-medium text-sm"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Ara"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3">
          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Şehir adı yazın... (örn: İstanbul, Ankara)"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#730EC3]/30 focus:border-[#730EC3] text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="bg-[#730EC3] hover:bg-[#5a0b9a] text-white px-4 py-2 rounded-xl transition-colors text-sm font-medium"
            >
              Ara
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#730EC3] transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
