"use client";

import { useState } from "react";
import { Building2, Users, TrendingUp, MessageCircle, Mail, Send, CheckCircle } from "lucide-react";

const features = [
  {
    icon: "building",
    title: "Salonunuzu Listeleyin",
    desc: "Türkiye’nin en büyük pilates rehberinde yerinizi alın ve binlerce potansiyel müşteriye ulaşın.",
  },
  {
    icon: "users",
    title: "Müşteri Tabanınızı Genişletin",
    desc: "Her ay binlerce kişi PilatesTopu üzerinden salon arıyor. Doğru hedef kitleye ulaşın.",
  },
  {
    icon: "trending",
    title: "Online Görünürlüğünüzü Artırın",
    desc: "SEO optimize profil sayfanız ile Google’da daha üst sıralarda yer alın.",
  },
];

const iconMap: Record<string, any> = {
  building: Building2,
  users: Users,
  trending: TrendingUp,
};

export default function IsOrtakligiPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", studio_name: "", city: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `İş Ortaklığı: ${form.studio_name} - ${form.city}`,
          message: form.message || `${form.studio_name} salonu için iş ortaklığı başvurusu.`,
        }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <section className="bg-gradient-to-r from-[#730EC3] via-purple-600 to-[#E91E90] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">İş Ortaklığı</h1>
          <p className="text-xl text-purple-100">Pilates salonunuzu Türkiye’nin en büyük rehberine ekleyin</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((f) => {
            const Icon = iconMap[f.icon];
            return (
              <div key={f.title} className="bg-white rounded-2xl shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-[#730EC3]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-[#730EC3]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Neden PilatesTopu?</h2>
            <div className="space-y-4 text-gray-600">
              <p>PilatesTopu, Türkiye genelinde pilates salonlarını arayan binlerce kişiye hizmet vermektedir. Platformumuza katılarak salonunuzun görünürlüğünü artırabilir ve yeni müşteriler kazanabilirsiniz.</p>
              <p>Kayıt tamamen ücretsizdir. Başvurunuzu aldıktan sonra ekibimiz sizinle iletişime geçecektir.</p>
            </div>
            <div className="mt-6 space-y-3">
              <a
                href="https://wa.me/905446732202?text=Merhaba, salonumuzu PilatesTopu'na eklemek istiyoruz."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 font-medium hover:underline"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp ile ulaşın
              </a>
              <a href="mailto:info@pilatestopu.com" className="flex items-center gap-2 text-[#730EC3] font-medium hover:underline">
                <Mail className="w-5 h-5" /> info@pilatestopu.com
              </a>
            </div>
          </div>

          <div>
            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Başvurunuz Alındı!</h3>
                <p className="text-gray-600">En kısa sürede sizinle iletişime geçeceğiz.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border p-6 space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Ücretsiz Başvuru</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#730EC3]/30 focus:border-[#730EC3] text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-posta *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#730EC3]/30 focus:border-[#730EC3] text-sm" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#730EC3]/30 focus:border-[#730EC3] text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Şehir</label>
                    <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#730EC3]/30 focus:border-[#730EC3] text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salon Adı *</label>
                  <input type="text" required value={form.studio_name} onChange={(e) => setForm({ ...form, studio_name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#730EC3]/30 focus:border-[#730EC3] text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mesaj</label>
                  <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#730EC3]/30 focus:border-[#730EC3] text-sm resize-none" />
                </div>
                <button type="submit" disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 bg-[#730EC3] hover:bg-[#5a0b9a] disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-xl transition-colors w-full">
                  <Send className="w-4 h-4" /> {status === "loading" ? "Gönderiliyor..." : "Başvuru Yap"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
