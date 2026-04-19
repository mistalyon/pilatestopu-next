import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redirectMap: Record<string, string> = {
        '/category/pilates-egersizleri': '/blog',
        '/category/pilates-ekipmanlari': '/blog',
        '/category/pilates-turleri': '/blog',
        '/category/saglikli-yasam': '/blog',
        '/category/diger': '/blog',
        '/category/fizyoterapi': '/blog',
        '/category/hamile-pilatesi': '/blog/hamile-pilatesi-rehberi',
        '/category/reformer-ve-aletli-pilates': '/blog/reformer-pilates-nedir',
        '/category/pilates-egzersizleri': '/blog',
        '/category/pilates-zayiflama': '/blog/pilates-ile-zayiflama',
        '/pilates-salonlari': '/p-c',
        '/en-yakin-pilates-salonu': '/p-c',
        '/hakkimizda-2': '/hakkimizda',
        '/feed': '/blog',
        '/wp-sitemap.xml': '/sitemap.xml',
        // WP blog post slugs -> new blog slugs
        '/pilates-nedir': '/blog/pilates-nedir-temel-ilkeleri-faydalari-ve-baslangic-rehberi',
        '/reformer-pilates-nedir': '/blog/reformer-pilates-nedir',
        '/mat-pilates-nedir': '/blog/mat-pilates-egzersizleri',
        '/klinik-pilates-nedir': '/blog/klinik-pilates-nedir',
        '/hamile-pilatesi': '/blog/hamile-pilatesi-rehberi',
        '/pilates-topu-nasil-kullanilir': '/blog/pilates-topu-hareketleri-rehberi',
        '/reformer-pilates-sonrasi-agri': '/blog/reformer-pilates-sonrasi-agri',
        '/pilates-topu-hareketleri-rehberi': '/blog/pilates-topu-hareketleri-rehberi',
        '/pilates-ile-kilo-verme': '/blog/pilates-ile-zayiflama',
        '/pilates-yaparken-beslenme': '/blog/pilates-ve-beslenme',
        '/pilates-yaparken-nasil-beslenmeliyiz': '/blog/pilates-ve-beslenme',
        '/reformer-pilates': '/blog/reformer-pilates-nedir',
        '/reformer-pilates-oncesi-sonrasi': '/blog/reformer-pilates-oncesi-sonrasi',
        '/resimli-ve-videolu-pilates-topu-hareketleri': '/blog/pilates-topu-hareketleri-rehberi',
        '/boyun-duzlesmesi-nedenleri-belirtileri-egzersizleri': '/blog/boyun-duzlesmesi-nedenleri-belirtileri-egzersizleri',
        '/pilates-etkinlikleri-saglikli-ikramlar-catering': '/blog/pilates-etkinlikleri-icin-saglikli-ikramlar-catering-ipuclari',
        '/pilates-lastigi-hareketleri': '/blog/pilates-lastigi-hareketleri-evde-tum-vucut-antrenmani',
        // Legacy pilates type pages -> blog
        '/p-t/hamile-pilatesi': '/blog/hamile-pilatesi-rehberi',
        '/p-t/klinik-pilates': '/blog/klinik-pilates-nedir',
        '/p-t/cocuk-pilatesi': '/blog',
        '/p-t/egitmenlik-egitimi': '/blog',
        // Legacy city slug (root-level)
        '/samsun-pilates': '/p-c/samsun',
        // WP system pages -> redirect to appropriate pages
        '/faqs': '/yardim',
        '/isletme-ekle': '/is-ortakligi',
        '/shop': '/',
        '/shop-2': '/',
        '/cart': '/',
        '/cart-2': '/',
        '/checkout': '/',
        '/checkout-2': '/',
        '/my-account': '/',
        '/my-account-2': '/',
        '/my-account-3': '/',
        '/login': '/',
        '/lost-password': '/',
        '/membership-registration': '/',
        '/membership-pricing': '/',
        '/membership-thankyou': '/',
        '/payment': '/',
        '/payment-completed': '/',
        '/packages': '/',
        '/package': '/',
        '/package/premium': '/',
        '/my-booking': '/',
        '/my-wishlist': '/',
        '/my-profile': '/',
        '/my-places': '/',
        '/yonetim-paneli': '/',
        '/randevular': '/',
        '/bookings': '/',
        '/baslangic': '/',
        '/contact': '/iletisim',
        '/new-place': '/is-ortakligi',
        '/user_package': '/',
        '/maintainance': '/',
        '/maintain': '/',
        '/coming-soon': '/',
        '/country': '/p-c',
        '/yardim-merkezi': '/yardim',
        '/gizlilik-politikasi-ve-kisisel-verilerin-korunmasi': '/gizlilik-politikasi',
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

// Full neighborhood redirect map: slug-pilates -> /p-c/{city}/{neighborhood}
// Derived from sitemap (47 total neighborhoods) + legacy indexed slugs
const neighborhoodRedirects: Record<string, string> = {
        // Istanbul neighborhoods (33)
        '/akatlar-pilates': '/p-c/istanbul/akatlar',
        '/adalar-pilates': '/p-c/istanbul/adalar',
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
        '/kucukcekmece-pilates': '/p-c/istanbul/kucukcekmece',
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
        // Izmir neighborhoods (3)
        '/aliaga-pilates': '/p-c/izmir/aliaga',
        '/cigli-pilates': '/p-c/izmir/cigli',
        '/sirinyer-pilates': '/p-c/izmir/sirinyer',
        // Bursa neighborhoods (6)
        '/bursa-yenisehir-pilates': '/p-c/bursa/bursa-yenisehir',
        '/gorukle-pilates': '/p-c/bursa/gorukle',
        '/mudanya-pilates': '/p-c/bursa/mudanya',
        '/nilufer-pilates': '/p-c/bursa/nilufer',
        '/ozluce-pilates': '/p-c/bursa/ozluce',
        '/yildirim-pilates': '/p-c/bursa/yildirim',
        // Adana (1), Hatay (1), Duzce (1), Mersin (1), Yozgat (1)
        '/ceyhan-pilates': '/p-c/adana/ceyhan',
        '/iskenderun-pilates': '/p-c/hatay/iskenderun',
        '/akcakoca-pilates': '/p-c/duzce/akcakoca',
        '/mersin-yenisehir-pilates': '/p-c/mersin/mersin-yenisehir',
        '/yerkoy-pilates': '/p-c/yozgat/yerkoy',
};

// Legacy WP city profile pages /sehir/{slug} -> /p-c/{slug}
const sehirRedirects: Record<string, string> = {
        '/sehir/adiyaman': '/p-c/adiyaman',
        '/sehir/afyonkarahisar': '/p-c/afyonkarahisar',
        '/sehir/aksaray': '/p-c/aksaray',
        '/sehir/ankara': '/p-c/ankara',
        '/sehir/aydin': '/p-c/aydin',
        '/sehir/balikesir': '/p-c/balikesir',
        '/sehir/bayburt': '/p-c/bayburt',
        '/sehir/bitlis': '/p-c/bitlis',
        '/sehir/corum': '/p-c/corum',
        '/sehir/denizli': '/p-c/denizli',
        '/sehir/duzce': '/p-c/duzce',
        '/sehir/eskisehir': '/p-c/eskisehir',
        '/sehir/giresun': '/p-c/giresun',
        '/sehir/igdir': '/p-c/igdir',
        '/sehir/karabuk': '/p-c/karabuk',
        '/sehir/kilis': '/p-c/kilis',
        '/sehir/kutahya': '/p-c/kutahya',
        '/sehir/mugla': '/p-c/mugla',
        '/sehir/mus': '/p-c/mus',
        '/sehir/siirt': '/p-c/siirt',
};

// Legacy WP salon profile pages /p/{slug} -> related city page
const salonRedirects: Record<string, string> = {
        '/p/dunya-tajik': '/p-c/bursa',
        '/p/fatma-bastug': '/p-c/istanbul',
        '/p/huma-toktas': '/p-c/antalya',
        '/p/sf-bahcesehir-pilates-studio': '/p-c/antalya',
        '/p/yusuf-kizildag': '/p-c/eskisehir',
        '/p/gokhan-kirdar': '/p-c',
        '/p/mwellness-kadikoy': '/p-c/istanbul/kadikoy',
        '/p/fatma-bastug-pilates': '/p-c/istanbul',
};

export function middleware(request: NextRequest) {
        const pathname = request.nextUrl.pathname;
        const lowPath = pathname.toLowerCase();

    // Trailing slash removal
    if (pathname.length > 1 && pathname.endsWith('/')) {
                const url = request.nextUrl.clone();
                url.pathname = pathname.slice(0, -1);
                return NextResponse.redirect(url, 301);
    }

    if (redirectMap[lowPath]) {
                const url = request.nextUrl.clone();
                url.pathname = redirectMap[lowPath];
                return NextResponse.redirect(url, 301);
    }

    if (cityRedirects[lowPath]) {
                const url = request.nextUrl.clone();
                url.pathname = cityRedirects[lowPath];
                return NextResponse.redirect(url, 301);
    }

    if (neighborhoodRedirects[lowPath]) {
                const url = request.nextUrl.clone();
                url.pathname = neighborhoodRedirects[lowPath];
                return NextResponse.redirect(url, 301);
    }

    if (sehirRedirects[lowPath]) {
                const url = request.nextUrl.clone();
                url.pathname = sehirRedirects[lowPath];
                return NextResponse.redirect(url, 301);
    }

    if (salonRedirects[lowPath]) {
                const url = request.nextUrl.clone();
                url.pathname = salonRedirects[lowPath];
                return NextResponse.redirect(url, 301);
    }

    // Legacy /p-n/{slug}-pilates -> use neighborhoodRedirects mapping by stripping prefix
    const pnPilatesMatch = pathname.match(/^\/p-n\/([a-z0-9-]+?)-pilates$/);
        if (pnPilatesMatch) {
                    const key = '/' + pnPilatesMatch[1] + '-pilates';
                    if (neighborhoodRedirects[key]) {
                                    const url = request.nextUrl.clone();
                                    url.pathname = neighborhoodRedirects[key];
                                    return NextResponse.redirect(url, 301);
                    }
        }

    // Legacy /p-n/{slug} (without -pilates suffix) -> /p-c/... if we know the mapping
    const pnPlainMatch = pathname.match(/^\/p-n\/([a-z0-9-]+)$/);
        if (pnPlainMatch) {
                    const key = '/' + pnPlainMatch[1] + '-pilates';
                    if (neighborhoodRedirects[key]) {
                                    const url = request.nextUrl.clone();
                                    url.pathname = neighborhoodRedirects[key];
                                    return NextResponse.redirect(url, 301);
                    }
        }

    // Legacy /h/pilates/s/{city} -> /p-c/{city}
    const hPilatesCityMatch = pathname.match(/^\/h\/pilates\/s\/([a-z0-9-]+)$/);
        if (hPilatesCityMatch) {
                    const url = request.nextUrl.clone();
                    url.pathname = '/p-c/' + hPilatesCityMatch[1];
                    return NextResponse.redirect(url, 301);
        }

    // Legacy /h/pilates/s/{city}/{nbhd} -> /p-c/{city}/{nbhd}
    const hPilatesCityNbhdMatch = pathname.match(/^\/h\/pilates\/s\/([a-z0-9-]+)\/([a-z0-9-]+)$/);
        if (hPilatesCityNbhdMatch) {
                    const url = request.nextUrl.clone();
                    url.pathname = '/p-c/' + hPilatesCityNbhdMatch[1] + '/' + hPilatesCityNbhdMatch[2];
                    return NextResponse.redirect(url, 301);
        }

    // Legacy deep /h/pilates/s/{city}/{district}/{nbhd} -> /p-c/{city}/{nbhd}
    const hPilatesDeepMatch = pathname.match(/^\/h\/pilates\/s\/([a-z0-9-]+)\/[a-z0-9-]+\/([a-z0-9-]+)$/);
        if (hPilatesDeepMatch) {
                    const url = request.nextUrl.clone();
                    url.pathname = '/p-c/' + hPilatesDeepMatch[1] + '/' + hPilatesDeepMatch[2];
                    return NextResponse.redirect(url, 301);
        }

    // Other legacy /h/* -> homepage
    if (pathname.startsWith('/h/')) {
                const url = request.nextUrl.clone();
                url.pathname = '/';
                return NextResponse.redirect(url, 301);
    }

    // Legacy /ilan-kategori/* -> homepage
    if (pathname.startsWith('/ilan-kategori/')) {
                const url = request.nextUrl.clone();
                url.pathname = '/';
                return NextResponse.redirect(url, 301);
    }

    // Legacy /p-a/* (attributes) -> homepage
    if (pathname.startsWith('/p-a/')) {
                const url = request.nextUrl.clone();
                url.pathname = '/';
                return NextResponse.redirect(url, 301);
    }

    // Legacy /rezervasyon/* -> homepage
    if (pathname.startsWith('/rezervasyon/')) {
                const url = request.nextUrl.clone();
                url.pathname = '/';
                return NextResponse.redirect(url, 301);
    }

    if (pathname.startsWith('/wp-admin') || pathname.startsWith('/wp-content') || pathname.startsWith('/wp-includes') || pathname.startsWith('/wp-json')) {
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

    var cityMatch = pathname.match(/^\/([a-z-]+)-pilates-salonlari$/);
        if (cityMatch) {
                    const url = request.nextUrl.clone();
                    url.pathname = '/p-c/' + cityMatch[1];
                    return NextResponse.redirect(url, 301);
        }

    // Legacy SEO URLs: /p-c/{slug}-pilates -> /p-c/{slug}
    const pcCityPilatesMatch = pathname.match(/^\/p-c\/([a-z0-9-]+?)-pilates$/);
        if (pcCityPilatesMatch) {
                    const url = request.nextUrl.clone();
                    url.pathname = '/p-c/' + pcCityPilatesMatch[1];
                    return NextResponse.redirect(url, 301);
        }

    // Legacy SEO URLs: /p-c/{city}/{nbhd}-pilates -> /p-c/{city}/{nbhd}
    const pcCityNbhdPilatesMatch = pathname.match(/^\/p-c\/([a-z0-9-]+)\/([a-z0-9-]+?)-pilates$/);
        if (pcCityNbhdPilatesMatch) {
                    const url = request.nextUrl.clone();
                    url.pathname = '/p-c/' + pcCityNbhdPilatesMatch[1] + '/' + pcCityNbhdPilatesMatch[2];
                    return NextResponse.redirect(url, 301);
        }

    return NextResponse.next();
}

export const config = {
        matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
