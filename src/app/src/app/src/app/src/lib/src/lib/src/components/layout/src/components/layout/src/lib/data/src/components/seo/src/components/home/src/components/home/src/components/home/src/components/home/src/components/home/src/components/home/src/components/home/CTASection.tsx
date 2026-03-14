"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export function CTASection() {
  return (
      <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                              className="bg-hero-gradient rounded-3xl p-8 md:p-12 text-center text-white">
                                        <h2 className="text-2xl md:text-3xl font-bold mb-3">Bilgi ve randevu için bize ulaşın</h2>
                                                  <p className="text-white/80 mb-8">Size en uygun saatlerde dönüş sağlıyoruz</p>
                                                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                                        <a href="https://wa.me/905446732202" target="_blank" rel="noopener noreferrer"
                                                                                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all">
                                                                                                    <MessageCircle size={20} /> WhatsApp&apos;tan Yaz
                                                                                                                </a>
                                                                                                                            <a href="tel:+905446732202"
                                                                                                                                          className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all">
                                                                                                                                                        <Phone size={20} /> Hemen Ara
                                                                                                                                                                    </a>
                                                                                                                                                                              </div>
                                                                                                                                                                                      </motion.div>
                                                                                                                                                                                            </div>
                                                                                                                                                                                                </section>
                                                                                                                                                                                                  );
                                                                                                                                                                                                  }