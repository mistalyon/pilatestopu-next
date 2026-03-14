const testimonials = [
  {
    name: 'Gökhan Kırdar',
    company: 'Fizyoglobal',
    text: 'PilatesTopu sayesinde kliniğimize yönlendirilen hasta sayısı önemli ölçüde arttı.',
  },
  {
    name: 'Yusuf Kızıldağ',
    company: 'Fizyobes',
    text: 'Platform üzerinden gelen danışanlarla iş hacmimiz büyüdü.',
  },
  {
    name: 'Ammar Canpolat',
    company: 'M Terapi',
    text: 'Çok profesyonel bir ekip. Dijital varlığımızı güçlendirdi.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Referanslarımız</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-purple-50 rounded-2xl p-8">
              <p className="text-gray-700 mb-6 italic">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="font-bold text-gray-900">{t.name}</p>
                <p className="text-sm text-purple-700">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
