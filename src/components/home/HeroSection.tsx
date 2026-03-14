'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-purple-700 via-purple-600 to-pink-500 text-white py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Turkiye&apos;nin Pilates Rehberi
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 text-purple-100 max-w-2xl mx-auto"
        >
          En iyi pilates salonlarini kesfedin, uzman egitmenler ile tanisIn.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-xl mx-auto"
        >
          <div className="flex bg-white rounded-full shadow-lg overflow-hidden">
            <input
              type="text"
              placeholder="Sehir veya salon ara..."
              className="flex-1 px-6 py-4 text-gray-800 outline-none"
            />
            <button className="bg-pink-500 hover:bg-pink-600 px-6 py-4 transition-colors">
              <Search size={24} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
