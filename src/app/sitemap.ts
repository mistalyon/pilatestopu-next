import { MetadataRoute } from "next";

const BASE_URL = "https://pilatestopu-next.vercel.app";

const cities = [
  "istanbul", "ankara", "izmir", "antalya", "bursa", "eskisehir",
  "konya", "gaziantep", "adana", "mersin", "kayseri", "trabzon",
  "samsun", "denizli", "diyarbakir", "mugla", "sakarya", "balikesir",
  "malatya", "manisa", "hatay", "kahramanmaras", "van", "mardin",
  "aydin", "tekirdag", "elazig", "sivas", "batman", "erzurum",
  "aksaray", "afyonkarahisar", "ordu", "tokat", "giresun", "corum",
  "edirne", "kirklareli", "yalova", "bolu", "duzce", "bilecik",
  "burdur", "isparta", "usak", "kutahya", "canakkale", "kastamonu",
  "amasya", "nigde", "nevsehir", "kirikkale", "kirsehir", "yozgat",
  "karaman", "aksaray", "cankiri", "sinop", "bartin", "karabuk",
  "zonguldak", "rize", "artvin", "gumushane", "bayburt", "erzincan",
  "tunceli", "bingol", "mus", "bitlis", "siirt", "sirnak",
  "hakkari", "agri", "igdir", "kars", "ardahan", "osmaniye",
  "kilis", "adiyaman", "sanliurfa"
];

const blogSlugs = [
  "pilates-ile-zayiflama",
  "reformer-pilates-nedir",
  "hamilelikte-pilates",
  "mat-pilates-egzersizleri",
  "klinik-pilates-nedir",
  "pilates-ve-beslenme",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: BASE_URL + "/blog", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: BASE_URL + "/hakkimizda", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: BASE_URL + "/iletisim", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  const cityPages = cities.map((city) => ({
    url: BASE_URL + "/p-c/" + city,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogPages = blogSlugs.map((slug) => ({
    url: BASE_URL + "/blog/" + slug,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...cityPages, ...blogPages];
}
