import { Metadata } from "next";

const SITE_URL = "https://pilatestopu-next.vercel.app";

export const metadata: Metadata = {
  title: "İş Ortaklığı – Pilates Salönunuzu Listeleyin",
  description:
    "Pilates stüdyonuzu PilatesTopu platformuna ekleyin. Türkiye'nin en büyük pilates rehberinde yerinizi alın, binlerce potansiyel müşteriye ulaşın.",
  alternates: { canonical: SITE_URL + "/is-ortakligi" },
  openGraph: {
    title: "İş Ortaklığı – PilatesTopu",
    description:
      "Pilates stüdyonuzu platformumuza ekleyerek binlerce potansiyel müşteriye ulaşın.",
    url: SITE_URL + "/is-ortakligi",
    type: "website",
    siteName: "PilatesTopu",
  },
};

export default function IsOrtakligiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "İş Ortaklığı",
        item: SITE_URL + "/is-ortakligi",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  );
}
