import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: {
    default: 'Türkiye\'nin Pilates Rehberi: Salonlar, Dersler & Ekipmanlar | PilatesTopu',
    template: '%s | PilatesTopu',
  },
  description: 'Pilates hakkında her şey! Türkiye\'deki en iyi pilates salonları, pilates dersleri (reformer, mat), egzersiz rehberleri ve ekipmanlar için kaynağınız.',
  keywords: ['pilates', 'pilates salonları', 'reformer pilates', 'mat pilates', 'klinik pilates', 'pilates dersleri', 'türkiye pilates'],
  authors: [{ name: 'PilatesTopu.com' }],
  creator: 'PilatesTopu',
  publisher: 'PilatesTopu',
  icons: {
    icon: '/images/favicon.svg',
  },
  metadataBase: new URL('https://pilatestopu.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://pilatestopu.com',
    siteName: 'PilatesTopu',
    title: 'Türkiye\'nin Pilates Rehberi | PilatesTopu',
    description: 'Türkiye\'nin en kapsamlı pilates rehberi. 81 ilde pilates salonları, reformer pilates, mat pilates ve daha fazlası.',
    images: [
      {
        url: '/images/default-blog.svg',
        width: 783,
        height: 1024,
        alt: 'PilatesTopu - Türkiye Pilates Rehberi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Türkiye\'nin Pilates Rehberi | PilatesTopu',
    description: 'Türkiye\'nin en kapsamlı pilates rehberi. 81 ilde pilates salonları.',
    images: ['/images/default-blog.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_ID || '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/905446732202"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-colors"
          aria-label="WhatsApp ile iletişim"
          title="WhatsApp ile iletişim"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.594-.838-6.317-2.236l-.442-.37-3.24 1.085 1.085-3.24-.37-.442A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: {
    default: 'Türkiye\'nin Pilates Rehberi: Salonlar, Dersler & Ekipmanlar | PilatesTopu',
    template: '%s | PilatesTopu',
  },
  description: 'Pilates hakkında her şey! Türkiye\'deki en iyi pilates salonları, pilates dersleri (reformer, mat), egzersiz rehberleri ve ekipmanlar için kaynağınız.',
  keywords: ['pilates', 'pilates salonları', 'reformer pilates', 'mat pilates', 'klinik pilates', 'pilates dersleri', 'türkiye pilates'],
  authors: [{ name: 'PilatesTopu.com' }],
  creator: 'PilatesTopu',
  publisher: 'PilatesTopu',
  icons: {
    icon: 'https://pilatestopu.com/wp-content/uploads/2020/12/cropped-Grup-5-3-32x32.png',
  },
  metadataBase: new URL('https://pilatestopu.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://pilatestopu.com',
    siteName: 'PilatesTopu',
    title: 'Türkiye\'nin Pilates Rehberi | PilatesTopu',
    description: 'Türkiye\'nin en kapsamlı pilates rehberi. 81 ilde pilates salonları, reformer pilates, mat pilates ve daha fazlası.',
    images: [
      {
        url: 'https://pilatestopu.com/wp-content/uploads/2025/04/en-yakin-pilates-salonu-783x1024.png',
        width: 783,
        height: 1024,
        alt: 'PilatesTopu - Türkiye Pilates Rehberi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Türkiye\'nin Pilates Rehberi | PilatesTopu',
    description: 'Türkiye\'nin en kapsamlı pilates rehberi. 81 ilde pilates salonları.',
    images: ['https://pilatestopu.com/wp-content/uploads/2025/04/en-yakin-pilates-salonu-783x1024.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_ID || '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/905446732202"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-colors"
          aria-label="WhatsApp ile iletişim"
          title="WhatsApp ile iletişim"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.594-.838-6.317-2.236l-.442-.37-3.24 1.085 1.085-3.24-.37-.442A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
