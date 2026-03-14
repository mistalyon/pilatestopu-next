"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cities } from "@/lib/data/cities";

export function PopularCitiesSection() {
  const topCities = cities.slice(0, 6);
    return (
        <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Popüler Şehirler</h2>
                              <p className="text-gray-500 mb-8">Popüler şehirlerdeki stüdyo ve eğitmenleri incele.</p>
                                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                                {topCities.map((city, i) => (
                                                            <motion.div key={city.slug} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                                                                          <Link href={`/${city.slug}`} className="block bg-white rounded-xl p-4 border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all text-center group">
                                                                                          <MapPin className="mx-auto text-primary mb-2" size={24} />
                                                                                                          <h3 className="font-semibold text-sm text-gray-900 group-hover:text-primary transition-colors">{city.name}</h3>
                                                                                                                          <p className="text-xs text-gray-400 mt-1">{city.placeCount} işletme</p>
                                                                                                                                        </Link>
                                                                                                                                                    </motion.div>
                                                                                                                                                              ))}
                                                                                                                                                                      </div>
                                                                                                                                                                            </div>
                                                                                                                                                                                </section>
                                                                                                                                                                                  );
                                                                                                                                                                                  }