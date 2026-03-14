import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://pilatestopu.com'),
    title: {
        default: "Türkiye'nin Pilates Rehberi: Salonlar, Dersler & Ekipmanlar",
            template: '%s | PilatesTopu.com',
              },
                description:
                    'Pilates hakkında her şey! Türkiye\'deki en iyi pilates salonları, pilates dersleri (reformer, mat), egzersiz rehberleri ve ekipmanlar için kaynağınız.',
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
                                                            <body className={inter.className}>
                                                                    <Header />
                                                                            <main className="min-h-screen">{children}</main>
                                                                                    <Footer />
                                                                                          </body>
                                                                                              </html>
                                                                                                );
                                                                                                }
