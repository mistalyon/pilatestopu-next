import { Metadata } from "next";
import Link from "next/link";
import { Target, Users, MapPin, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | PilatesTopu - Türkiye'nin Pilates Rehberi",
  description: "PilatesTopu, Türkiye genelinde pilates salonlarını, eğitmenlerini ve ekipmanlarını keşfetmenizi sağlayan ücretsiz bir rehber platformudur.",
  alternates: { canonical: "https://pilatestopu-next.vercel.app/hakkimizda" },
};

const stats = [
  { icon: MapPin, value: "81", label: "İl" },
  { icon: Users, value: "500+", label: "Salon" },
  { icon: Target, value: "9", label: "Pilates Türü" },
  { icon: Heart, value: "7/24", label: "Destek" },
];

export default function HakkimizdaPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#F2DFF4] to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Hakkımızda</h1>
          <p className="text-gray-600 text-lg">Türkiye’nin en kapsamlı pilates rehberi</p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-4xl py-12">
        <div className="grid sm:grid-cols-4 gap-6 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-sm border p-6 text-center">
              <s.icon className="w-8 h-8 text-[#730EC3] mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            PilatesTopu, Türkiye genelinde pilates ile ilgilenen herkese yardımcı olmayı amaçlayan ücretsiz bir dijital platformdur.
            81 ilde pilates salonlarını, eğitmenlerini, ders türlerini ve ekipmanları keşfetmenize olanak sağlıyoruz.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ne Yapıyoruz?</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Reformer pilates, mat pilates, klinik pilates, hamile pilatesi gibi farklı pilates türlerinde hizmet veren salonları
            bir araya getirerek, kullanıcıların en uygun salonu kolayca bulmalarını sağlıyoruz. Ayrıca blogumuzda
            pilates hakkında faydalı rehber yazıları ve egzersiz önerileri paylaşıyoruz.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">İşletme Sahipleri İçin</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Pilates salonunuzu platformumuza ücretsiz olarak ekleyebilirsiniz. Binlerce potansiyel müşteriye ulaşmak
            ve online görünürlüğünüzü artırmak için hemen başvurun.
          </p>
          <Link
            href="/is-ortakligi"
            className="inline-block bg-[#730EC3] hover:bg-[#5a0b9a] text-white font-medium py-3 px-6 rounded-xl transition-colors no-underline"
          >
            İş Ortaklığı Başvurusu &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
