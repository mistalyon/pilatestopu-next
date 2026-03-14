'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const posts = [
{ title: 'Pilates Nedir? Temel İlkeleri ve Faydaları', slug: 'pilates-nedir', category: 'Pilates Egzersizleri', date: '2025-04-10' },
{ title: 'Reformer Pilates Nedir? Faydaları ve Fiyatları', slug: 'reformer-pilates-nedir', category: 'Reformer ve Aletli Pilates', date: '2025-04-08' },
{ title: 'Pilates ile Kilo Verme: Gerçekler ve İpuçları', slug: 'pilates-ile-kilo-verme', category: 'Pilates Zayıflama', date: '2025-04-05' },
];

export default function BlogPreviewSection() {
    return (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Blog</h2>
                <Link href="/blog" className="text-primary hover:underline font-medium flex items-center gap-1">
                  Tümünü Gör <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
            >
                    <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl h-48 mb-4 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                  <span className="text-xs text-primary font-semibold uppercase">{post.category}</span>
                  <h3 className="text-lg font-semibold mt-1 group-hover:text-primary transition-colors">{post.title}</h3>
                  <time className="text-sm text-gray-400 mt-2 block">{post.date}</time>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    );
}
