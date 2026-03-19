'use client';

import { useState } from 'react';

const pilatesTypes = [
  'Reformer Pilates',
  'Mat Pilates',
  'Klinik Pilates',
  'Hamile Pilatesi',
  'Online Pilates',
  'Bireysel Pilates',
  'Grup Pilates',
];

interface EmptyStudioFormProps {
  locationName: string;
}

export default function EmptyStudioForm({ locationName }: EmptyStudioFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pilatesType, setPilatesType] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [];
    lines.push('Merhaba, ' + locationName + ' bölgesinde pilates salonu arıyorum.');
    if (name) lines.push('Ad: ' + name);
    if (phone) lines.push('Telefon: ' + phone);
    lines.push('Lokasyon: ' + locationName);
    if (pilatesType) lines.push('Pilates Türü: ' + pilatesType);
    if (message) lines.push('Not: ' + message);
    const text = encodeURIComponent(lines.join('\n'));
    window.open('https://wa.me/905446732202?text=' + text, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-8 text-center text-white">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-full mb-4">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">{locationName} için Salon Arıyorsunuz?</h3>
        <p className="text-white/80 text-sm max-w-md mx-auto">
          Bu bölgede henüz kayıtlı salon bulunmuyor. Formu doldurun, size en yakın salonu önerelim!
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="es-name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Ad Soyad *
            </label>
            <input
              id="es-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adınız"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-sm text-gray-900 placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="es-phone" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Telefon *
            </label>
            <input
              id="es-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="05XX XXX XX XX"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-sm text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Lokasyon
            </label>
            <div className="w-full px-4 py-2.5 rounded-lg border border-gray-100 bg-gray-50 text-sm text-gray-700 flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {locationName}
            </div>
          </div>
          <div>
            <label htmlFor="es-type" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Pilates Türü
            </label>
            <select
              id="es-type"
              value={pilatesType}
              onChange={(e) => setPilatesType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-sm text-gray-900 bg-white"
            >
              <option value="">Seçiniz (opsiyonel)</option>
              {pilatesTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="es-msg" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Mesajınız (opsiyonel)
          </label>
          <textarea
            id="es-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Eklemek istediğiniz bilgiler..."
            rows={2}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-sm text-gray-900 placeholder-gray-400 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-sm"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.594-.838-6.317-2.236l-.442-.37-3.24 1.085 1.085-3.24-.37-.442A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
          </svg>
          WhatsApp ile Salon Önerisi Al
        </button>
      </form>
    </div>
  );
}
