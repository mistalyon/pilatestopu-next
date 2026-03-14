import HeroSection from '@/components/home/HeroSection';
import PilatesTypesSection from '@/components/home/PilatesTypesSection';
import FeaturedStudios from '@/components/home/FeaturedStudios';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PopularCitiesSection from '@/components/home/PopularCitiesSection';
import BlogPreviewSection from '@/components/home/BlogPreviewSection';
import CTASection from '@/components/home/CTASection';
import SeoContentSection from '@/components/home/SeoContentSection';
import JsonLd from '@/components/seo/JsonLd';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PilatesTopu.com',
  url: 'https://pilatestopu.com',
  description: 'Turkiye\'nin en kapsamli pilates rehberi',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://pilatestopu.com/ara?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />
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
