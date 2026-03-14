import Link from 'next/link';

const pilatesTypes = [
  {
    title: 'Reformer Pilates',
    description: 'Reformer aleti ile yapilan, vucudu sekillendirir ve guclendirir.',
    href: '/pilates-turleri/reformer-pilates',
    icon: '🏋️',
  },
  {
    title: 'Mat Pilates',
    description: 'Mat uzerinde yapilan klasik pilates egzersizleri.',
    href: '/pilates-turleri/mat-pilates',
    icon: '🧘',
  },
  {
    title: 'Klinik Pilates',
    description: 'Fizyoterapist esliginde rehabilitasyon amacli pilates.',
    href: '/pilates-turleri/klinik-pilates',
    icon: '⚕️',
  },
];

export default function PilatesTypesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Pilates Turleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pilatesTypes.map((type) => (
            <Link key={type.title} href={type.href}>
              <div className="p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all text-center group">
                <span className="text-5xl mb-4 block">{type.icon}</span>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-purple-700">
                  {type.title}
                </h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
