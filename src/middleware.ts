import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redirectMap: Record<string, string> = {
  '/category/pilates-egersizleri': '/blog',
  '/category/pilates-ekipmanlari': '/blog',
  '/category/pilates-turleri': '/blog',
  '/category/saglikli-yasam': '/blog',
  '/pilates-salonlari': '/p-c',
  '/en-yakin-pilates-salonu': '/p-c',
  '/hakkimizda-2': '/hakkimizda',
  '/feed': '/blog',
  '/wp-sitemap.xml': '/sitemap.xml',
  // Blog yazıları - eski URL -> yeni URL
  '/pilates-nedir': '/blog/pilates-nedir-temel-ilkeleri-faydalari-ve-baslangic-rehberi',
  '/reformer-pilates-nedir': '/blog/reformer-pilates-nedir',
  '/mat-pilates-nedir': '/blog/mat-pilates-egzersizleri',
  '/klinik-pilates-nedir': '/blog/klinik-pilates-nedir',
  '/hamile-pilatesi': '/blog/hamile-pilatesi-rehberi',
  '/pilates-topu-nasil-kullanilir': '/blog/pilates-topu-hareketleri-rehberi',
  '/boyun-duzlesmesi-nedenleri-belirtileri-egzersizleri': '/blog/boyun-duzlesmesi-nedenleri-belirtileri-egzersizleri',
  '/pilates-etkinlikleri-icin-saglikli-ikramlar-catering-ipuclari': '/blog/pilates-etkinlikleri-icin-saglikli-ikramlar-catering-ipuclari',
  '/pilates-lastigi-hareketleri-evde-tum-vucut-antrenmani': '/blog/pilates-lastigi-hareketleri-evde-tum-vucut-antrenmani',
  '/reformer-pilates-oncesi-sonrasi': '/blog/reformer-pilates-oncesi-sonrasi',
  '/reformer-pilates-sonrasi-agri': '/blog/reformer-pilates-sonrasi-agri',
  '/pilates-topu-hareketleri-rehberi': '/blog/pilates-topu-hareketleri-rehberi',
  '/pilates-ile-kilo-verme': '/blog/pilates-ile-zayiflama',
  '/pilates-yaparken-beslenme': '/blog/pilates-ve-beslenme',
};

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

const neighborhoodRedirects: Record<string, string> = {
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
  '/aliaga-pilates': '/p-c/izmir/aliaga',
  '/cigli-pilates': '/p-c/izmir/cigli',
  '/sirinyer-pilates': '/p-c/izmir/sirinyer',
  '/gorukle-pilates': '/p-c/bursa/gorukle',
  '/mudanya-pilates': '/p-c/bursa/mudanya',
  '/nilufer-pilates': '/p-c/bursa/nilufer',
  '/ozluce-pilates': '/p-c/bursa/ozluce',
  '/yildirim-pilates': '/p-c/bursa/yildirim',
  '/ceyhan-pilates': '/p-c/adana/ceyhan',
  '/iskenderun-pilates': '/p-c/hatay/iskenderun',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }
  if (redirectMap[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = redirectMap[pathname];
    return NextResponse.redirect(url, 301);
  }
  if (cityRedirects[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = cityRedirects[pathname];
    return NextResponse.redirect(url, 301);
  }
  if (neighborhoodRedirects[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = neighborhoodRedirects[pathname];
    return NextResponse.redirect(url, 301);
  }
  if (pathname.startsWith('/wp-admin') || pathname.startsWith('/wp-content') || pathname.startsWith('/wp-includes')) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, 301);
  }
  if (pathname.endsWith('.php')) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, 301);
  }
  if (pathname.startsWith('/author/')) {
    const url = request.nextUrl.clone();
    url.pathname = '/hakkimizda';
    return NextResponse.redirect(url, 301);
  }
  if (pathname.startsWith('/tag/')) {
    const url = request.nextUrl.clone();
    url.pathname = '/blog';
    return NextResponse.redirect(url, 301);
  }
  const cityMatch = pathname.match(/^\/([a-z-]+)-pilates-salonlari$/);
  if (cityMatch) {
    const url = request.nextUrl.clone();
    url.pathname = '/p-c/' + cityMatch[1];
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
