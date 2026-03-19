'use client';

import { useState } from 'react';
import Link from 'next/link';

const cities = [
  'Adana','Adıyaman','Afyonkarahisar','Ağrı','Aksaray','Amasya','Ankara','Antalya',
  'Ardahan','Artvin','Aydın','Balıkesir','Bartın','Batman','Bayburt','Bilecik',
  'Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum',
  'Denizli','Diyarbakır','Düzce','Edirne','Elazığ','Erzincan','Erzurum',
  'Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkâri','Hatay',
  'Iğdır','Isparta','İstanbul','İzmir','Kahramanmaraş','Karabük',
  'Karaman','Kars','Kastamonu','Kayseri','Kırıkkale','Kırklareli','Kırşehir',
  'Kilis','Kocaeli','Konya','Kütahya','Malatya','Manisa','Mardin','Mersin','Muğla',
  'Muş','Nevşehir','Niğde','Ordu','Osmaniye','Rize','Sakarya','Samsun','Siirt',
  'Sinop','Sivas','Tekirdağ','Tokat','Trabzon','Tunceli','Şanlıurfa','Şırnak',
  'Uşak','Van','Yalova','Yozgat','Zonguldak'
];

const pilatesTypes = [
  'Reformer Pilates',
  'Mat Pilates',
  'Klinik Pilates',
  'Hamile Pilatesi',
  'Online Pilates',
  'Bireysel Pilates',
  'Grup Pilates',
];

export default function NotFound() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [pilatesType, setPilatesType] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [];
    lines.push('Merhaba, pilates randevusu almak istiyorum.');
    if (name) lines.push('Ad: ' + name);
    if (phone) lines.push('Telefon: ' + phone);
    if (city) lines.push('Şehir: ' + city);
    if (pilatesType) lines.push('Pilates Türü: ' + pilatesType);
    if (message) lines.push('Not: ' + message);
    const text = encodeURIComponent(lines.join('\n'));
    window.open('https://wa.me/905446732202?text=' + text, '_blank');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Aradığınız sayfa taşınmış olabilir
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Size En Uygun Pilates Salonu Bulalım
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Formu doldurun, size en yakın ve en uygun pilates salonunu önerelim. Ücretsiz danışmanlık için hemen başvurun!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Ad Soyad */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Ad Soyad *
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınızı girin"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Telefon */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Telefon *
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05XX XXX XX XX"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Şehir */}
            <div>
              <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                Şehir *
              </label>
              <select
                id="city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-900 bg-white"
              >
                <option value="">Şehir seçiniz</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Pilates Türü */}
            <div>
              <label htmlFor="pilatesType" className="block text-sm font-semibold text-gray-700 mb-2">
                Pilates Türü
              </label>
              <select
                id="pilatesType"
                value={pilatesType}
                onChange={(e) => setPilatesType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-900 bg-white"
              >
                <option value="">Seçiniz (opsiyonel)</option>
                {pilatesTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mesaj */}
          <div className="mb-8">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Ek Not (opsiyonel)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Varsa eklemek istediğiniz bilgiler..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-900 placeholder-gray-400 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.594-.838-6.317-2.236l-.442-.37-3.24 1.085 1.085-3.24-.37-.442A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            WhatsApp ile Gönder
          </button>
        </form>

        {/* Alt linkler */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 mb-4">Belki bunlar işinize yarar:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-purple-300 hover:text-purple-600 transition-all hover:shadow-sm">
              Anasayfa
            </Link>
            <Link href="/p-c" className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-purple-300 hover:text-purple-600 transition-all hover:shadow-sm">
              Salonları Keşfet
            </Link>
            <Link href="/blog" className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-purple-300 hover:text-purple-600 transition-all hover:shadow-sm">
              Blog
            </Link>
            <Link href="/iletisim" className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-purple-300 hover:text-purple-600 transition-all hover:shadow-sm">
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
