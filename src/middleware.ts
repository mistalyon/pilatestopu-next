import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// WordPress → Next.js URL redirect haritası
const redirectMap: Record<string, string> = {
  // WordPress kategori sayfaları
  '/category/pilates-egzersizleri': '/blog',
  '/category/pilates-ekipmanlari': '/blog',
  '/category/pilates-turleri': '/blog',
  '/category/saglikli-yasam': '/blog',

  // WordPress sayfa yapısı
  '/pilates-salonlari': '/p-c',
  '/en-yakin-pilates-salonu': '/p-c',
  '/pilates-nedir': '/blog',
  '/reformer-pilates-nedir': '/blog',
  '/mat-pilates-nedir': '/blog',
  '/klinik-pilates-nedir': '/blog',
  '/hamile-pilatesi': '/blog',
  '/pilates-topu-nasil-kullanilir': '/blog',
  
  // WordPress sayfaları
  '/hakkimizda-2': '/hakkimizda',
  '/iletisim-2': '/iletisim',
  '/about': '/hakkimizda',
  '/contact': '/iletisim',
  '/is-birligi': '/is-ortakligi',
  '/privacy-policy': '/gizlilik-politikasi',
  '/terms': '/kullanim-kosullari',
  
  // Feed ve XML
  '/feed': '/sitemap.xml',
  '/feed/': '/sitemap.xml',
  '/wp-sitemap.xml': '/sitemap.xml',
  '/sitemap_index.xml': '/sitemap.xml',
};

// Şehir slug eşleştirmesi (WordPress → Next.js)
const cityRedirects: Record<string, string> = {
  '/istanbul-pilates-salonlari': '/p-c/istanbul',
  '/ankara-pilates-salonlari': '/p-c/ankara',
  '/izmir-pilates-salonlari': '/p-c/izmir',
  '/antalya-pilates-salonlari': '/p-c/antalya',
  '/bursa-pilates-salonlari': '/p-c/bursa',
  '/adana-pilates-salonlari': '/p-c/adana',
  '/konya-pilates-salonlari': '/p-c/konya',
  '/gaziantep-pilates-salonlari': '/p-c/gaziantep',
  '/kayseri-pilates-salonlari': '/p-c/kayseri',
  '/mersin-pilates-salonlari': '/p-c/mersin',
  '/eskisehir-pilates-salonlari': '/p-c/eskisehir',
  '/samsun-pilates-salonlari': '/p-c/samsun',
  '/denizli-pilates-salonlari': '/p-c/denizli',
  '/mugla-pilates-salonlari': '/p-c/mugla',
  '/trabzon-pilates-salonlari': '/p-c/trabzon',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lowercasePath = pathname.toLowerCase();

  // 1. WordPress wp-content, wp-admin, wp-includes engelle
  if (lowercasePath.startsWith('/wp-')) {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }

  // 2. WordPress .php dosyaları engelle
  if (lowercasePath.endsWith('.php')) {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }

  // 3. WordPress author sayfaları
  if (lowercasePath.startsWith('/author/')) {
    return NextResponse.redirect(new URL('/hakkimizda', request.url), 301);
  }

  // 4. WordPress tag sayfaları
  if (lowercasePath.startsWith('/tag/')) {
    return NextResponse.redirect(new URL('/blog', request.url), 301);
  }

  // 5. WordPress page/2, page/3 vs.
  if (/^\/page\/\d+/.test(lowercasePath)) {
    return NextResponse.redirect(new URL('/blog', request.url), 301);
  }

  // 6. Direkt redirect haritası
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  
  if (redirectMap[cleanPath]) {
    return NextResponse.redirect(new URL(redirectMap[cleanPath], request.url), 301);
  }

  // 7. Şehir redirect'leri
  if (cityRedirects[cleanPath]) {
    return NextResponse.redirect(new URL(cityRedirects[cleanPath], request.url), 301);
  }

  // 8. Genel WordPress pilates-salonlari pattern'i
  const cityMatch = cleanPath.match(/^\/([a-z-]+)-pilates-salonlari$/);
  if (cityMatch) {
    return NextResponse.redirect(new URL(`/p-c/${cityMatch[1]}`, request.url), 301);
  }

  // 9. Trailing slash kaldır (SEO)
  if (pathname !== '/' && pathname.endsWith('/')) {
    const newPath = pathname.slice(0, -1);
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
