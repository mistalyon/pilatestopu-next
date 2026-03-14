'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#F2DFF4' }}>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Side - Text and Search */}
          <div className="w-full md:w-1/2 z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold tracking-wider text-gray-700 mb-4"
            >
              YAKIN PİLATES SALONLARI
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
            >
              Pilates Salonları ve Eğitmenler
            </motion.h1>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-full shadow-lg flex items-center max-w-lg overflow-hidden"
            >
              <div className="flex-1 flex items-center border-r border-gray-200">
                <div className="px-5 py-4 w-full">
                  <span className="text-sm font-semibold text-gray-800">Konum</span>
                  <span className="text-sm text-gray-400 ml-1">seçiniz...</span>
                </div>
              </div>
              <div className="flex-1 flex items-center">
                <div className="px-5 py-4 w-full">
                  <span className="text-sm font-semibold text-gray-800">Kategori</span>
                  <span className="text-sm text-gray-400 ml-1">seçiniz...</span>
                </div>
              </div>
              <button
                className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center mr-1"
                style={{ backgroundColor: '#730EC3' }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* Right Side - Image with Gradient Circle */}
          <div className="w-full md:w-1/2 relative flex justify-center items-center mt-12 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Gradient Circle Behind */}
              <div
                className="absolute inset-0 m-auto w-72 h-72 md:w-96 md:h-96 rounded-full"
                style={{
                  background: 'conic-gradient(from 180deg, #730EC3 0%, #E91E90 50%, #730EC3 100%)',
                }}
              />
              {/* Inner transparent circle to create ring effect */}
              <div
                className="absolute inset-0 m-auto w-52 h-52 md:w-72 md:h-72 rounded-full"
                style={{ backgroundColor: '#F2DFF4' }}
              />
              {/* Hero Image */}
              <div className="relative z-10 w-72 h-96 md:w-80 md:h-[480px]">
                <Image
                  src="https://pilatestopu.com/wp-content/uploads/2025/04/en-yakin-pilates-salonu-783x1024.png"
                  alt="Pilates salonları ve eğitmenler"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
