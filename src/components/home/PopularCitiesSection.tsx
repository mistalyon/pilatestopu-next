'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

const cities = [
{ name: 'İstanbul', slug: 'istanbul', count: 150 },
  { name: 'Ankara', slug: 'ankara', count: 85 },
  { name: 'İzmir', slug: 'izmir', count: 65 },
  { name: 'Antalya', slug: 'antalya', count: 45 },
  { name: 'Bursa', slug: 'bursa', count: 40 },
  { name: 'Eskişehir', slug: 'eskisehir', count: 25 },
];

export default function PopularCitiesSection() {
    return (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Popüler Şehirler</h2>
        <p className="text-center text-gray-600 mb-12">81 ilde pilates salonlarını keşfedin</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cities.map((city, i) => (
                  <motion.div
                    key={city.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
            >
                    <Link
                      href={`/p-c/${city.slug}-pilates`}
                className="block text-center p-6 bg-white rounded-xl hover:shadow-lg transition-all group border border-gray-100"
                                >
                                  <MapPin className="mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" size={28} />
                                  <h3 className="font-semibold text-gray-900">{city.name}</h3>
                                  <p className="text-sm text-gray-500">{city.count}+ salon</p>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                          <div className="text-center mt-8">
                            <Link href="/sehirler" className="text-primary hover:underline font-medium">
                              Tüm şehirleri gör &rarr;
          </Link>
                    </div>
                  </div>
                </section>
              );
}
