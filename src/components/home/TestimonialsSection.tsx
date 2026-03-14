'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
{ name: 'Gökhan Kırdar', title: 'Fizyoterapist, Fizyoglobal', text: 'PilatesTopu.com sayesinde daha fazla danışana ulaştım. Platform gerçekten işe yarıyor.' },
{ name: 'Yusuf Kızıldağ', title: 'Fizyoterapist, Fizyobes', text: 'Profesyonel bir platform. Pilates alanında referans site olma yolunda.' },
{ name: 'Ammar Canpolat', title: 'Fizyoterapist, M Terapi', text: 'Harika bir hizmet. Danışanlarımız bizi kolayca buluyor.' },
];

export default function TestimonialsSection() {
    return (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Uzmanlar Ne Diyor?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <Quote className="text-primary/30 mb-4" size={32} />
              <p className="text-gray-600 mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
}
