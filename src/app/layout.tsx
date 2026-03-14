import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    metadataBase: new URL('https://pilatestopu.com'),
    title: {
      default: "Turkiye'nin Pilates Rehberi: Salonlar, Dersler & Ekipmanlar",
          template: '%s | PilatesTopu.com',
    },
    description:
          "Pilates hakkinda her sey! Turkiye'deki en iyi pilates salonlari, pilates dersleri (reformer, mat), egzersiz rehberleri ve ekipmanlar icin kaynaginiz.",
    icons: {
          icon: '/favicon.png',
    },
    openGraph: {
          type: 'website',
          locale: 'tr_TR',
          siteName: 'PilatesTopu.com',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
          <html lang="tr">
                <body className="antialiased">
                        <Header />
                        <main className="min-h-screen">{children}</main>main>
                        <Footer />
                </body>body>
          </html>html>
        );
}
