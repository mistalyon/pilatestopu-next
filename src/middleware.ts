import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// WordPress → Next.js URL redirect haritası
const redirectMap: Record<string, string> = {
  // WordPress kategori sayfaları
  '/category/pilates-egersizleri': '/blog',
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
  '/hakkimizda-2': '/hakkimizda',
  '/feed': '/blog',
  '/wp-sitemap.xml': '/sitemap.xml',
};

// Şehir yönlendirmeleri
const cityRedirects: Record<string, string> = {
  '/istanbul-pilates-salonlari': '/p-c/istanbul',
  '/ankara-pilates-salonlari': '/p-c/ankara',
  '/izmir-pilates-salonlari': '/p-c/izmir',
  '/antalya-pilates-salonlari': '/p-c/antalya',
  '/bursa-pilates-salonlari': '/p-c/bursa',
  '/eskisehir-pilates-salonlari': '/p-c/eskisehir',
  '/konya-pilates-salonlari': '/p-c/konya',
  '/gaziantep-pilates-salonlari': '/p-c/gaziantep',
  '/kayseri-pilates-salonlari': '/p-c/kayseri',
  '/mersin-pilates-salonlari': '/p-c/mersin',
  '/adana-pilates-salonlari': '/p-c/adana',
  '/samsun-pilates-salonlari': '/p-c/samsun',
  '/trabzon-pilates-salonlari': '/p-c/trabzon',
  '/diyarbakir-pilates-salonlari': '/p-c/diyarbakir',
  '/denizli-pilates-salonlari': '/p-c/denizli',
};

// İlçe/Semt yönlendirmeleri (WordPress neighborhood slugları)
const neighborhoodRedirects: Record<string, string> = {
  // İstanbul
  '/akatlar-pilates': '/p-c/istanbul/akatlar',
  '/alibeykoy-pilates': '/p-c/istanbul/alibeykoy',
  '/atakoy-pilates': '/p-c/istanbul/atakoy',
  '/bagcilar-pilates': '/p-c/istanbul/bagcilar',
  '/bahcelievler-pilates': '/p-c/istanbul/bahcelievler',
  '/bahcesehir-pilates': '/p-c/istanbul/bahcesehir',
  '/bakirkoy-pilates': '/p-c/istanbul/bakirkoy',
  '/basaksehir-pilates': '/p-c/istanbul/basaksehir',
  '/bayrampasa-pilates': '/p-c/istanbul/bayrampasa',
  '/besiktas-pilates': '/p-c/istanbul/besiktas',
  '/beylikduzu-pilates': '/p-c/istanbul/beylikduzu',
  '/dudullu-pilates': '/p-c/istanbul/dudullu',
  '/etiler-pilates': '/p-c/istanbul/etiler',
  '/eyup-pilates': '/p-c/istanbul/eyup',
  '/florya-pilates': '/p-c/istanbul/florya',
  '/gokturk-pilates': '/p-c/istanbul/gokturk',
  '/gungoren-pilates': '/p-c/istanbul/gungoren',
  '/idealtepe-pilates': '/p-c/istanbul/idealtepe',
  '/kadikoy-pilates': '/p-c/istanbul/kadikoy',
  '/kemerburgaz-pilates': '/p-c/istanbul/kemerburgaz',
  '/kosuyolu-pilates': '/p-c/istanbul/kosuyolu',
  '/kucukyali-pilates': '/p-c/istanbul/kucukyali',
  '/kurtkoy-pilates': '/p-c/istanbul/kurtkoy',
  '/levent-pilates': '/p-c/istanbul/levent',
  '/maltepe-pilates': '/p-c/istanbul/maltepe',
  '/pendik-pilates': '/p-c/istanbul/pendik',
  '/sariyer-pilates': '/p-c/istanbul/sariyer',
  '/silivri-pilates': '/p-c/istanbul/silivri',
  '/suadiye-pilates': '/p-c/istanbul/suadiye',
  '/tarabya-pilates': '/p-c/istanbul/tarabya',
  '/umraniye-pilates': '/p-c/istanbul/umraniye',
  '/yesilkoy-pilates': '/p-c/istanbul/yesilkoy',
  '/zeytinburnu-pilates': '/p-c/istanbul/zeytinburnu',
  // İzmir
  '/aliaga-pilates': '/p-c/izmir/aliaga',
  '/cigli-pilates': '/p-c/izmir/cigli',
  '/sirinyer-pilates': '/p-c/izmir/sirinyer',
  // Bursa
  '/bursa-yenisehir-pilates': '/p-c/bursa/bursa-yenisehir',
  '/gorukle-pilates': '/p-c/bursa/gorukle',
  '/mudanya-pilates': '/p-c/bursa/mudanya',
  '/nilufer-pilates': '/p-c/bursa/nilufer',
  '/ozluce-pilates': '/p-c/bursa/ozluce',
  '/yildirim-pilates': '/p-c/bursa/yildirim',
  // Diğer
  '/ceyhan-pilates': '/p-c/adana/ceyhan',
  '/akcakoca-pilates': '/p-c/duzce/akcakoca',
  '/iskenderun-pilates': '/p-c/hatay/iskenderun',
  '/mersin-yenisehir-pilates': '/p-c/mersin/mersin-yenisehir',
  '/yerkoey-pilates': '/p-c/yozgat/yerkoey',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Trailing slash kaldır
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  // Statik yönlendirmeler
  if (redirectMap[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = redirectMap[pathname];
    return NextResponse.redirect(url, 301);
  }

  // Şehir yönlendirmeleri
  if (cityRedirects[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = cityRedirects[pathname];
    return NextResponse.redirect(url, 301);
  }

  // İlçe/Semt yönlendirmeleri
  if (neighborhoodRedirects[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = neighborhoodRedirects[pathname];
    return NextResponse.redirect(url, 301);
  }

  // WordPress wp-* yollarını engelle
  if (pathname.startsWith('/wp-admin') || pathname.startsWith('/wp-content') || pathname.startsWith('/wp-includes')) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, 301);
  }

  // .php dosyalarını engelle
  if (pathname.endsWith('.php')) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, 301);
  }

  // /author/* -> /hakkimizda
  if (pathname.startsWith('/author/')) {
    const url = request.nextUrl.clone();
    url.pathname = '/hakkimizda';
    return NextResponse.redirect(url, 301);
  }

  // /tag/* -> /blog
  if (pathname.startsWith('/tag/')) {
    const url = request.nextUrl.clone();
    url.pathname = '/blog';
    return NextResponse.redirect(url, 301);
  }

  // /page/N -> /blog
  if (/^\/page\/\d+$/.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/blog';
    return NextResponse.redirect(url, 301);
  }

  // Genel {sehir}-pilates-salonlari pattern
  const cityMatch = pathname.match(/^\/([a-z-]+)-pilates-salonlari$/);
  if (cityMatch) {
    const url = request.nextUrl.clone();
    url.pathname = `/p-c/${cityMatch[1]}`;
    return NextResponse.redirect(url, 301);
  }

  // Genel {semt}-pilates pattern
  const neighborhoodMatch = pathname.match(/^\/([a-z-]+)-pilates$/);
  if (neighborhoodMatch && !pathname.includes('salonlari')) {
    const url = request.nextUrl.clone();
    url.pathname = '/p-c';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
