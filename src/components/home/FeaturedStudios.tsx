'use client';

import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';

  const studios = [
{ name: 'MWellness Kadıköy', city: 'İstanbul', rating: 5.0, type: 'Pilates Stüdyosu' },
{ name: 'SF Bahçeşehir Pilates', city: 'Antalya', rating: 4.9, type: 'Pilates Stüdyosu' },
{ name: 'Dünya Tajik', city: 'Bursa', rating: 4.8, type: 'Pilates Eğitmeni' },
{ name: 'Fatma Baştuğ', city: 'İstanbul', rating: 4.9, type: 'Pilates Eğitmeni' },
{ name: 'Hüma Toktaş', city: 'Antalya', rating: 4.7, type: 'Fizyoterapist' },
{ name: 'Yusuf Kızıldağ', city: 'Eskişehir', rating: 4.8, type: 'Fizyoterapist' },
];

export default function FeaturedStudios() {
    return (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Öne Çıkan Stüdyolar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {studios.map((studio, i) => (
                  <motion.div
                    key={studio.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{studio.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-medium">{studio.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-primary font-medium mb-2">{studio.type}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={14} /> {studio.city}
              </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
}
