import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
      <div className="text-center px-4">
        <h1 className="text-8xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Sayfa Bulunamadı</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Anasayfaya Dön
          </Link>
          <Link
            href="/p-c"
            className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium"
          >
            Salonları Keşfet
          </Link>
        </div>
      </div>
    </main>
  );
}
