import { HeroSection } from "@/components/home/HeroSection";
import { PilatesTypesSection } from "@/components/home/PilatesTypesSection";
import { FeaturedStudios } from "@/components/home/FeaturedStudios";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PopularCitiesSection } from "@/components/home/PopularCitiesSection";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";
import { CTASection } from "@/components/home/CTASection";
import { SeoContentSection } from "@/components/home/SeoContentSection";
import { JsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  const jsonLd = {
      "@context": "https://schema.org",
          "@type": "WebSite",
              name: "PilatesTopu",
                  url: "https://pilatestopu.com",
                      description: "Türkiye'nin en kapsamlı pilates rehberi. Salonlar, dersler ve ekipmanlar.",
                          potentialAction: {
                                "@type": "SearchAction",
                                      target: "https://pilatestopu.com/ara?q={search_term_string}",
                                            "query-input": "required name=search_term_string",
                                                },
                                                  };

                                                    return (
                                                        <>
                                                              <JsonLd data={jsonLd} />
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