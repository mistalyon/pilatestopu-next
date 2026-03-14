const testimonials = [
  {
    name: 'Gokhan Kirdar',
    role: 'Fizyoglobal',
    quote: 'PilatesTopu sayesinde studyomuzun gorunurlugu artti ve yeni ogrenciler kazandik.',
  },
  {
    name: 'Yusuf Kizildag',
    role: 'Fizyobes',
    quote: 'Platform uzerinden gelen danisanlarimiz ciddi oranda artti. Harika bir hizmet.',
  },
  {
    name: 'Ammar Canpolat',
    role: 'M Terapi',
    quote: 'Profesyonel ve guvenilir bir platform. Tavsiye ederim.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Referanslarimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <p className="text-gray-600 italic mb-4">&quot;{t.quote}&quot;</p>
              <div>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
