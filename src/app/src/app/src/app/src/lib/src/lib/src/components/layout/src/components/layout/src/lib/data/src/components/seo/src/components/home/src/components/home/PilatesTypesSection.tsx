"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Dumbbell, Users, GraduationCap } from "lucide-react";

const types = [
  { title: "Pilates Stüdyoları", count: 5, icon: Dumbbell, href: "/kategori/pilates-studyolari", color: "bg-primary" },
    { title: "Aletli Pilates Stüdyoları", count: 2, icon: Dumbbell, href: "/kategori/aletli-pilates-studyolari", color: "bg-accent" },
      { title: "Pilates Eğitmenleri", count: 3, icon: Users, href: "/kategori/pilates-egitmenleri", color: "bg-teal" },
      ];

      export function PilatesTypesSection() {
        return (
            <section className="py-16 bg-gray-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
                                    Pilates Türleri: Mat, Reformer Ve Aletli Pilates
                                            </h2>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                              {types.map((type, i) => (
                                                                          <motion.div
                                                                                        key={type.title}
                                                                                                      initial={{ opacity: 0, y: 20 }}
                                                                                                                    whileInView={{ opacity: 1, y: 0 }}
                                                                                                                                  viewport={{ once: true }}
                                                                                                                                                transition={{ delay: i * 0.1 }}
                                                                                                                                                            >
                                                                                                                                                                          <Link href={type.href} className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 group">
                                                                                                                                                                                          <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center mb-4`}>
                                                                                                                                                                                                            <type.icon className="text-white" size={24} />
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">{type.title}</h3>
                                                                                                                                                                                                                                                            <p className="text-sm text-gray-500 mt-1">{type.count} işletme</p>
                                                                                                                                                                                                                                                                          </Link>
                                                                                                                                                                                                                                                                                      </motion.div>
                                                                                                                                                                                                                                                                                                ))}
                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                  </section>
                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                    }