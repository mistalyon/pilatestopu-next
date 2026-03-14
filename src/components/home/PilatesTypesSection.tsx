'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const types = [
  { title: 'Reformer Pilates', desc: 'Reformer aleti ile yapılan, kas gücünü artıran pilates türü.', href: '/blog/reformer-pilates-nedir', icon: '🏋️' },
  { title: 'Mat Pilates', desc: 'Mat üzerinde yapılan, temel güç ve esneklik odaklı egzersizler.', href: '/blog/pilates-nedir', icon: '🧘' },
  { title: 'Klinik Pilates', desc: 'Fizyoterapist eşliğinde rehabilitasyon amaçlı pilates.', href: '/blog', icon: '⚕️' },
  ];

export default function PilatesTypesSection() {
    return (
          <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Pilates Türleri</h2>h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {types.map((type, i) => (
                        <motion.div
                                        key={type.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                      >
                                      <Link href={type.href} className="block p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all group">
                                                      <span className="text-4xl mb-4 block">{type.icon}</span>span>
                                                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{type.title}</h3>h3>
                                                      <p className="text-gray-600">{type.desc}</p>p>
                                      </Link>Link>
                        </motion.div>motion.div>
                      ))}
                        </div>div>
                </div>div>
          </section>section>
        );
}</section>
