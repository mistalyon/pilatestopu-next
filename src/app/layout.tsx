import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

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
  metadataBase: new URL('https://www.pilatestopu.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.pilatestopu.com',
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
          <WhatsAppButton />
      </body>
    </html>
  );
}
