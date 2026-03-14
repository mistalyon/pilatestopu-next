'use client';

import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';

  export default function HeroSection() {
    return (
          <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20 lg:py-28">
            <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Türkiye&apos;nin{' '}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Pilates Rehberi
            </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-10">
                  En iyi pilates salonlarını keşfedin, uzman eğitmenleri bulun ve sağlıklı yaşamınıza başlayın.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-3 max-w-2xl mx-auto flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl">
              <MapPin className="text-primary" size={20} />
                    <input
                      type="text"
                      placeholder="Şehir veya ilçe ara..."
                      className="w-full bg-transparent outline-none text-gray-700"
                    />
                  </div>
                  <button className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 font-medium">
                    <Search size={20} />
                    Ara
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                  <span>Popüler:</span>
      {['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa'].map((city) => (
                    <a key={city} href={`/p-c/${city.toLowerCase()}-pilates`} className="text-primary hover:underline">
  {city}
              </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
}
