import { Metadata } from "next";

const SITE_URL = "https://pilatestopu-next.vercel.app";

export const metadata: Metadata = {
  title: "İletişim – Bize Ulaşın",
  description:
    "PilatesTopu ile iletişime geçin. Pilates salonunuzu listeleyin, iş ortaklığı başvurusu yapın veya sorularınızı iletin. 7/24 destek.",
  alternates: { canonical: SITE_URL + "/iletisim" },
  openGraph: {
    title: "İletişim – PilatesTopu",
    description:
      "PilatesTopu ile iletişime geçin. Sorularınız, önerileriniz ve iş ortaklığı başvurularınız için bize ulaşın.",
    url: SITE_URL + "/iletisim",
    type: "website",
    siteName: "PilatesTopu",
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "İletişim",
    description: "PilatesTopu iletişim sayfası.",
    url: SITE_URL + "/iletisim",
    isPartOf: { "@type": "WebSite", name: "PilatesTopu", url: SITE_URL },
    mainEntity: {
      "@type": "Organization",
      name: "PilatesTopu",
      url: SITE_URL,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: "Turkish",
      },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "İletişim",
        item: SITE_URL + "/iletisim",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  );
}
