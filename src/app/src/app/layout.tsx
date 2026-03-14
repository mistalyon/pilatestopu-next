import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://pilatestopu.com"),
    title: {
        default: "Türkiye'nin Pilates Rehberi: Salonlar, Dersler & Ekipmanlar | PilatesTopu",
            template: "%s | PilatesTopu",
              },
                description: "Pilates hakkında her şey! Türkiye'deki en iyi pilates salonları, pilates dersleri (reformer, mat), egzersiz rehberleri ve ekipmanlar için kaynağınız.",
                  keywords: ["pilates", "reformer pilates", "aletli pilates", "mat pilates", "pilates salonları", "pilates stüdyoları", "pilates eğitmenleri", "türkiye pilates"],
                    authors: [{ name: "PilatesTopu" }],
                      openGraph: {
                          type: "website",
                              locale: "tr_TR",
                                  siteName: "PilatesTopu",
                                    },
                                      robots: { index: true, follow: true },
                                        alternates: { canonical: "https://pilatestopu.com" },
                                        };

                                        export default function RootLayout({ children }: { children: React.ReactNode }) {
                                          return (
                                              <html lang="tr" className={inter.className}>
                                                    <head>
                                                            <link rel="icon" href="/favicon.png" sizes="32x32" />
                                                                    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                                                                          </head>
                                                                                <body className="min-h-screen flex flex-col">
                                                                                        <Header />
                                                                                                <main className="flex-1">{children}</main>
                                                                                                        <Footer />
                                                                                                              </body>
                                                                                                                  </html>
                                                                                                                    );
                                                                                                                    }