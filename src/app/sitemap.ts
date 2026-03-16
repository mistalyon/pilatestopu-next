import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://pilatestopu.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/p-c`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/hakkimizda`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/iletisim`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/is-ortakligi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/yardim`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/kullanim-kosullari`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/gizlilik-politikasi`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  let cityPages: MetadataRoute.Sitemap = [];
  try {
    const { data: cities } = await supabase
      .from('cities')
      .select('slug, created_at');
    cityPages = (cities || []).map((city) => ({
      url: `${BASE_URL}/p-c/${city.slug}`,
      lastModified: city.created_at ? new Date(city.created_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (e) {}

  let neighborhoodPages: MetadataRoute.Sitemap = [];
  try {
    const { data: neighborhoods } = await supabase
      .from('neighborhoods')
      .select('slug, created_at, cities(slug)');
    neighborhoodPages = (neighborhoods || []).map((n: any) => ({
      url: `${BASE_URL}/p-c/${n.cities?.slug}/${n.slug}`,
      lastModified: n.created_at ? new Date(n.created_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (e) {}

  let salonPages: MetadataRoute.Sitemap = [];
  try {
    const { data: places } = await supabase
      .from('places')
      .select('slug, created_at');
    salonPages = (places || []).map((place) => ({
      url: `${BASE_URL}/salon/${place.slug}`,
      lastModified: place.created_at ? new Date(place.created_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (e) {}

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, created_at')
      .eq('status', 'published');
    blogPages = (posts || []).map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.created_at ? new Date(post.created_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (e) {}

  return [...staticPages, ...cityPages, ...neighborhoodPages, ...salonPages, ...blogPages];
}
