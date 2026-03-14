"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle } from "lucide-react";

export default function IletisimPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Bir hata oluştu.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  };

  return (
    <>
      <section className="bg-gradient-to-b from-[#F2DFF4] to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">İletişim</h1>
          <p className="text-gray-600">Sorularınız ve önerileriniz için bize ulaşın</p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-5xl py-12">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">İletişim Bilgileri</h2>
              <div className="space-y-4">
                <a href="tel:+905446732202" className="flex items-center gap-3 text-gray-600 hover:text-[#730EC3] transition-colors">
                  <div className="w-10 h-10 bg-[#730EC3]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#730EC3]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Telefon</p>
                    <p className="font-medium">+90 544 673 22 02</p>
                  </div>
                </a>
                <a href="mailto:info@pilatestopu.com" className="flex items-center gap-3 text-gray-600 hover:text-[#730EC3] transition-colors">
                  <div className="w-10 h-10 bg-[#730EC3]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#730EC3]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">E-posta</p>
                    <p className="font-medium">info@pilatestopu.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 bg-[#730EC3]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#730EC3]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Konum</p>
                    <p className="font-medium">Türkiye</p>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="https://wa.me/905446732202?text=Merhaba, bilgi almak istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-xl transition-colors w-full"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp ile Ulaşın
            </a>
          </div>

          <div className="md:col-span-3">
            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mesajınız Gönderildi!</h3>
                <p className="text-gray-600 mb-4">En kısa sürede size dönüş yapacağız.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-[#730EC3] font-medium hover:underline"
                >
                  Yeni mesaj gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Mesaj Gönderin</h2>
                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">{errorMsg}</div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#730EC3]/30 focus:border-[#730EC3] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-posta *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#730EC3]/30 focus:border-[#730EC3] text-sm"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#730EC3]/30 focus:border-[#730EC3] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Konu</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#730EC3]/30 focus:border-[#730EC3] text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mesaj *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#730EC3]/30 focus:border-[#730EC3] text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 bg-[#730EC3] hover:bg-[#5a0b9a] disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-xl transition-colors w-full"
                >
                  <Send className="w-4 h-4" />
                  {status === "loading" ? "Gönderiliyor..." : "Mesaj Gönder"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
