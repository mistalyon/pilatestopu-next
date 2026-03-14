'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
{ href: '/', label: 'Ana Sayfa' },
{ href: '/blog', label: 'Blog' },
{ href: '/hakkimizda', label: 'Hakkımızda' },
{ href: '/iletisim', label: 'İletişim' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            PilatesTopu
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
{navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
{link.label}
            </Link>
          ))}
          <Link
            href="/iletisim"
            className="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary/90 transition-colors font-medium"
          >
            Salon Ekle
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
{mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
{navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-primary py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
{link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
