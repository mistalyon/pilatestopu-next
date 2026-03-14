"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const posts = [
  { title: "Reformer Pilates Nedir? Faydaları, Hareketleri ve Fiyatları", slug: "reformer-pilates", category: "Reformer ve Aletli Pilates" },
    { title: "Pilates Nedir? Temel İlkeleri, Faydaları ve Başlangıç Rehberi", slug: "pilates-nedir", category: "Pilates Rehberi" },
      { title: "Pilates ile Kilo Verme: Gerçekler, Yöntemler ve İpuçları", slug: "pilates-ile-kilo-verme", category: "Pilates Zayıflama" },
      ];

      export function BlogPreviewSection() {
        return (
            <section className="py-16 bg-gray-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                          <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Kapsamlı Pilates Rehberleri</h2>
                                              <Link href="/blog" className="text-primary hover:text-primary-700 flex items-center gap-1 text-sm font-medium">
                                                          Tümünü Gör <ArrowRight size={16} />
                                                                    </Link>
                                                                            </div>
                                                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                                              {posts.map((post, i) => (
                                                                                                          <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                                                                                                        <Link href={`/blog/${post.slug}`} className="block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                                                                                                                        <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10" />
                                                                                                                                                        <div className="p-5">
                                                                                                                                                                          <span className="text-xs font-medium text-primary uppercase">{post.category}</span>
                                                                                                                                                                                            <h3 className="font-semibold text-gray-900 mt-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                          </Link>
                                                                                                                                                                                                                                      </motion.div>
                                                                                                                                                                                                                                                ))}
                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                  </section>
                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                    }