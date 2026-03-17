import HeroSection from '@/components/home/HeroSection';
import PilatesTypesSection from '@/components/home/PilatesTypesSection';
import FeaturedStudios from '@/components/home/FeaturedStudios';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PopularCitiesSection from '@/components/home/PopularCitiesSection';
import BlogPreviewSection from '@/components/home/BlogPreviewSection';
import CTASection from '@/components/home/CTASection';
import SeoContentSection from '@/components/home/SeoContentSection';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PilatesTopu.com',
  url: 'https://www.pilatestopu.com',
  description: 'Türkiye\'nin en kapsamlı pilates rehberi. Salonlar, dersler ve ekipmanlar.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.pilatestopu.com/ara?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PilatesTopu',
  url: 'https://www.pilatestopu.com',
  logo: '/images/logo.svg',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+90-544-673-22-02',
    contactType: 'customer service',
    areaServed: 'TR',
    availableLanguage: 'Turkish',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Balat',
    addressLocality: 'Fatih',
    addressRegion: 'İstanbul',
    addressCountry: 'TR',
  },
  sameAs: [],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Anasayfa',
      item: 'https://www.pilatestopu.com',
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <HeroSection />
      <PilatesTypesSection />
      <FeaturedStudios />
      <TestimonialsSection />
      <PopularCitiesSection />
      <BlogPreviewSection />
      <CTASection />
      <SeoContentSection />
    </>
  );
}
