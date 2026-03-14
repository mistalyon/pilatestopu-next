"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  { name: "Gökhan Kırdar", role: "Fizyoterapist", company: "Fizyoglobal", text: "PilatesTopu.com'daki profilimiz, potansiyel danışanların doğru ve güncel bilgilere erişmesine olanak tanıyor." },
    { name: "Yusuf Kızıldağ", role: "Fizyoterapist", company: "Fizyobes", text: "Platformun profesyonel profilleri detaylı bir şekilde sunması ve hizmet alanlarını netleştirmesi kullanışlı bir yapı oluşturmuş." },
      { name: "Ammar Canpolat", role: "Fizyoterapist", company: "M Terapi", text: "İnsanların ihtiyaç duydukları uzmanlığa sahip terapistleri bulmalarına yardımcı oluyor." },
      ];

      export function TestimonialsSection() {
        return (
            <section className="py-16 bg-gray-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">Onlar Ne Diyor?</h2>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {testimonials.map((t, i) => (
                                                        <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                                                      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                                                                    <Quote size={24} className="text-primary/30 mb-3" />
                                                                                                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.text}</p>
                                                                                                                <div>
                                                                                                                                <p className="font-semibold text-gray-900">{t.name}</p>
                                                                                                                                                <p className="text-xs text-gray-500">{t.role} - {t.company}</p>
                                                                                                                                                              </div>
                                                                                                                                                                          </motion.div>
                                                                                                                                                                                    ))}
                                                                                                                                                                                            </div>
                                                                                                                                                                                                  </div>
                                                                                                                                                                                                      </section>
                                                                                                                                                                                                        );
                                                                                                                                                                                                        }