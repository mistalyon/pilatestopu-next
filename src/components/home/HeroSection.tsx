'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const turkishToSlug = (text: string): string => {
  const charMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I', 'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U',
  };
  // First replace Turkish chars, then lowercase
  const replaced = text
    .split('')
    .map((char) => charMap[char] || char)
    .join('');
  return replaced
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

const popularCities = [
  'İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa',
  'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Eskişehir',
  'Kayseri', 'Samsun', 'Denizli', 'Muğla', 'Trabzon',
];

const pilatesTypes = [
  'Reformer Pilates', 'Mat Pilates', 'Klinik Pilates',
  'Hamile Pilatesi', 'Çocuk Pilatesi', 'Hava Pilatesi',
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [cityQuery, setCityQuery] = useState('');
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [showTypeSuggestions, setShowTypeSuggestions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCities = popularCities.filter((city) =>
    city.toLowerCase().includes(cityQuery.toLowerCase())
  );

  const handleSearch = () => {
    if (cityQuery.trim()) {
      const slug = turkishToSlug(cityQuery.trim());
      router.push(`/p-c/${slug}`);
    } else {
      router.push('/p-c');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#F2DFF4' }}>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 z-10">
            <p
              className="text-sm font-semibold tracking-wider text-gray-700 mb-4 transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              YAKIN PİLATES SALONLARI
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight transition-all duration-700 delay-100"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              Pilates Salonları ve Eğitmenler
            </h1>

            <div
              className="relative bg-white rounded-full shadow-lg flex items-center max-w-lg overflow-visible transition-all duration-700 delay-200"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <div className="relative flex-1 border-r border-gray-200">
                <div className="px-5 py-3">
                  <label className="text-xs font-semibold text-gray-800 block">Şehir</label>
                  <input
                    type="text"
                    value={cityQuery}
                    onChange={(e) => {
                      setCityQuery(e.target.value);
                      setShowCitySuggestions(true);
                    }}
                    onFocus={() => setShowCitySuggestions(true)}
                    onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
                    onKeyDown={handleKeyDown}
                    placeholder="Şehir seçiniz..."
                    className="text-sm text-gray-600 w-full outline-none bg-transparent placeholder-gray-400"
                  />
                </div>
                {showCitySuggestions && filteredCities.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-48 overflow-y-auto z-50">
                    {filteredCities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-purple-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setCityQuery(city);
                          setShowCitySuggestions(false);
                        }}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative flex-1">
                <div className="px-5 py-3">
                  <label className="text-xs font-semibold text-gray-800 block">Kategori</label>
                  <input
                    type="text"
                    value={selectedType}
                    onFocus={() => setShowTypeSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowTypeSuggestions(false), 200)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tür seçiniz..."
                    className="text-sm text-gray-600 w-full outline-none bg-transparent placeholder-gray-400 cursor-pointer"
                    readOnly
                  />
                </div>
                {showTypeSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-48 overflow-y-auto z-50">
                    {pilatesTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-purple-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSelectedType(type);
                          setShowTypeSuggestions(false);
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleSearch}
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-1 hover:opacity-90 transition-opacity cursor-pointer"
                style={{ backgroundColor: '#730EC3' }}
                aria-label="Pilates salonu ara"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            <div
              className="mt-6 flex flex-wrap gap-2 transition-all duration-700 delay-300"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <span className="text-xs text-gray-500 mr-1 self-center">Popüler:</span>
              {['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa'].map((city) => (
                <a
                  key={city}
                  href={`/p-c/${turkishToSlug(city)}`}
                  className="text-xs px-3 py-1.5 bg-white/70 hover:bg-white rounded-full text-gray-700 hover:text-purple-700 transition-colors"
                >
                  {city}
                </a>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 relative flex justify-center items-center mt-12 md:mt-0">
            <div
              className="relative transition-all duration-1000 delay-300"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'scale(1)' : 'scale(0.8)',
              }}
            >
              <div
                className="absolute inset-0 m-auto w-72 h-72 md:w-96 md:h-96 rounded-full"
                style={{
                  background: 'conic-gradient(from 180deg, #730EC3 0%, #E91E90 50%, #730EC3 100%)',
                }}
              />
              <div
                className="absolute inset-0 m-auto w-52 h-52 md:w-72 md:h-72 rounded-full"
                style={{ backgroundColor: '#F2DFF4' }}
              />
              <div className="relative z-10 w-72 h-96 md:w-80 md:h-[480px]">
                <Image
                  src="https://pilatestopu.com/wp-content/uploads/2025/04/en-yakin-pilates-salonu-783x1024.png"
                  alt="Pilates salonları ve eğitmenler - Türkiye'nin en kapsamlı pilates rehberi"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 288px, 320px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
