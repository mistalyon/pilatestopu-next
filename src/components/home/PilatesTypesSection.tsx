const types = [
  {
    icon: '🏋️',
    title: 'Reformer Pilates',
    description: 'Reformer aleti ile yapılan, vücudu şekillendiren ve güçlendiren pilates türü.',
  },
  {
    icon: '🧘',
    title: 'Mat Pilates',
    description: 'Mat üzerinde yapılan klasik pilates egzersizleri. Başlangıç için idealdir.',
  },
  {
    icon: '⚕️',
    title: 'Klinik Pilates',
    description: 'Fizyoterapist eşliğinde rehabilitasyon amaçlı pilates uygulamaları.',
  },
];

export default function PilatesTypesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Pilates Türleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {types.map((type) => (
            <div
              key={type.title}
              className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-4xl mb-4">{type.icon}</div>
              <h3 className="text-xl font-bold mb-3">{type.title}</h3>
              <p className="text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
