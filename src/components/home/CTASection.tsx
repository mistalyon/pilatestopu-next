'use client';

import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

  export default function CTASection() {
    return (
          <section className="py-16 bg-gradient-to-r from-primary to-secondary">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Pilates Salonunuzu Listeleyin</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Binlerce potansiyel danışana ulaşın. Salonunuzu veya stüdyonuzu ücretsiz ekleyin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/905446732202"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <MessageCircle size={20} />
                    WhatsApp ile İletişim
            </a>
                  <a
                    href="tel:+905446732202"
                    className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors border border-white/30"
                  >
                    <Phone size={20} />
                    +90 544 673 22 02
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        );
}
