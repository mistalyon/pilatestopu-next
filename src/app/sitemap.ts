import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://www.pilatestopu.com';

// Force this route to be dynamically evaluated; revalidate every 1h.
export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages: MetadataRoute.Sitemap = [
      { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
      { url: `${BASE_URL}/p-c`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
      { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
      { url: `${BASE_URL}/urunler`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
      { url: `${BASE_URL}/hakkimizda`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
      { url: `${BASE_URL}/iletisim`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
      { url: `${BASE_URL}/is-ortakligi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
      { url: `${BASE_URL}/yardim`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
      { url: `${BASE_URL}/kullanim-kosullari`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
      { url: `${BASE_URL}/gizlilik-politikasi`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        ];

  let cityPages: MetadataRoute.Sitemap = [];
    try {
          const { data: cities } = await supabase.from('cities').select('slug, created_at');
          cityPages = (cities || []).map((city) => ({
                  url: `${BASE_URL}/p-c/${city.slug}`,
                  lastModified: city.created_at ? new Date(city.created_at) : new Date(),
                  changeFrequency: 'weekly' as const,
                  priority: 0.8,
          }));
    } catch (e) {}

  let neighborhoodPages: MetadataRoute.Sitemap = [];
    try {
          const { data: neighborhoods } = await supabase.from('neighborhoods').select('slug, created_at, cities(slug)');
          neighborhoodPages = (neighborhoods || []).map((n: any) => ({
                  url: `${BASE_URL}/p-c/${n.cities?.slug}/${n.slug}`,
                  lastModified: n.created_at ? new Date(n.created_at) : new Date(),
                  changeFrequency: 'weekly' as const,
                  priority: 0.7,
          }));
    } catch (e) {}

  let salonPages: MetadataRoute.Sitemap = [];
    try {
          const { data: places } = await supabase.from('places').select('slug, created_at');
          salonPages = (places || []).map((place) => ({
                  url: `${BASE_URL}/salon/${place.slug}`,
                  lastModified: place.created_at ? new Date(place.created_at) : new Date(),
                  changeFrequency: 'weekly' as const,
                  priority: 0.7,
          }));
    } catch (e) {}

  // FIX: paginate to bypass Supabase 1000-row default limit and fetch all blog posts.
  let blogPages: MetadataRoute.Sitemap = [];
    try {
          const pageSize = 1000;
          let from = 0;
          let allPosts: Array<{ slug: string; created_at: string; updated_at?: string }> = [];
          while (true) {
                  const { data: posts, error } = await supabase
                    .from('blog_posts')
                    .select('slug, created_at, updated_at')
                    .or('status.eq.published,published.eq.true')
                    .range(from, from + pageSize - 1);
                  if (error || !posts || posts.length === 0) break;
                  allPosts = allPosts.concat(posts as any);
                  if (posts.length < pageSize) break;
                  from += pageSize;
          }
          blogPages = allPosts.map((post) => ({
                  url: `${BASE_URL}/blog/${post.slug}`,
                  lastModified: post.updated_at ? new Date(post.updated_at) : (post.created_at ? new Date(post.created_at) : new Date()),
                  changeFrequency: 'monthly' as const,
                  priority: 0.6,
          }));
    } catch (e) {}

  return [...staticPages, ...cityPages, ...neighborhoodPages, ...salonPages, ...blogPages];
}
