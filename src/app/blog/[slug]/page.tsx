import type { Metadata } from "next";
import Link from "next/link";

const blogData: Record<string, {
  title: string;
  description: string;
  category: string;
  date: string;
  content: string[];
}> = {
  "pilates-ile-zayiflama": {
    title: "Pilates ile Zayiflama: Bilmeniz Gereken Her Sey",
    description: "Pilates ile kilo vermenin en etkili yollari. Hangi pilates turleri zayiflamaya yardimci olur? Detayli rehber.",
    category: "Pilates Zayiflama",
    date: "2025-03-10",
    content: [
      "Pilates, Joseph Pilates tarafindan gelistirilen bir egzersiz sistemidir ve son yillarda zayiflama amacli olarak buyuk ilgi gormektedir. Peki pilates ile gercekten kilo verebilir misiniz?",
      "Pilates, ozellikle core kaslarini guclendiren, esnekligi artiran ve vucut farkindaligin gelistiren bir egzersiz formudur. Duzenli pilates yapan kisiler, metabolizmalarinin hizlandigini ve vucutlarinin sikilasitigini fark ederler.",
      "Zayiflama icin en etkili pilates turleri arasinda reformer pilates, HIIT pilates ve mat pilates yer almaktadir. Reformer pilates, aletli olarak yapildigi icin daha yogun bir calisma saglar.",
      "Haftada 3-4 gun pilates yapmaniz ve bunu dengeli bir beslenme programi ile desteklemeniz, kilo verme surecinde onemli sonuclar almanizi saglayacaktir.",
    ],
  },
  "reformer-pilates-nedir": {
    title: "Reformer Pilates Nedir? Faydalari Nelerdir?",
    description: "Reformer pilates hakkinda tum detaylar. Reformer pilates nasil yapilir, faydalari nelerdir, kimler yapabilir?",
    category: "Reformer ve Aletli Pilates",
    date: "2025-03-08",
    content: [
      "Reformer pilates, ozel olarak tasarlanmis reformer aleti uzerinde yapilan bir pilates turudur. Joseph Pilates tarafindan icat edilen bu alet, yaylar ve kayar platform sistemiyle calisir.",
      "Reformer pilatesin en buyuk avantaji, her seviyeye uyarlanabilir olmasidir. Yay direncini ayarlayarak baslangic seviyesinden ileri seviyeye kadar farkli zorluk derecelerinde calisabilirsiniz.",
      "Reformer pilatesin faydalari arasinda kas guclendirme, esneklik artirma, posturu duzeltme, bel ve siirt agrilarini azaltma, stres yonetimi ve genel vucut tonusu sayilabilir.",
      "Reformer pilates dersleri genellikle 50-55 dakika surer ve bir egitmen esliginde yapilmasi onerilir. Turkiye genelinde birck pilates studyosunda reformer pilates dersleri verilmektedir.",
    ],
  },
  "hamilelikte-pilates": {
    title: "Hamilelikte Pilates Yapilir mi?",
    description: "Hamilelikte pilates yapmanin faydalari, dikkat edilmesi gerekenler ve uzman onerileri.",
    category: "Hamile Pilatesi",
    date: "2025-03-05",
    content: [
      "Hamilelik doneminde pilates yapmak, doktor onayiyla guvelle uygulanabilecek en faydali egzersiz turlerinden biridir. Hamile pilatesi, normal pilates hareketlerinin hamilelige uyarlanmis halidir.",
      "Hamilelikte pilates yapmanin faydalari arasinda bel agrilarinin azalmasi, doguma hazirlk, pelvik taban kaslarinin guclenmesi, daha iyi uyku kalitesi ve stres azalmasi yer alir.",
      "Hamile pilatesi yaparken dikkat edilmesi gereken bazi noktalar vardir: Sirt ustu yatarak yapilan hareketlerden kacinilmali, asiri gerilmeden sakiniilmali ve her zaman nefes kontrolune dikkat edilmelidir.",
      "Hamile pilatesi dersleri, uzmanlasmis egitmenler tarafindan verilmelidir. PilatesTopu.com uzerinden sehrinizde hamile pilatesi dersi veren studyolari bulabilirsiniz.",
    ],
  },
  "mat-pilates-egzersizleri": {
    title: "Evde Yapilabilecek 10 Mat Pilates Egzersizi",
    description: "Evde kolayca yapabileceginiz mat pilates egzersizleri. Baslangic seviyesinden ileri seviyeye.",
    category: "Pilates Egzersizleri",
    date: "2025-02-28",
    content: [
      "Mat pilates, herhangi bir alete ihtiyac duymadan sadece bir mat uzerinde yapilabilen pilates turudur. Evde kolayca uygulanabilmesi en buyuk avantajidir.",
      "Baslangic seviyesi icin onerilen hareketler: The Hundred, Roll Up, Single Leg Circle, Rolling Like a Ball ve Single Leg Stretch. Bu hareketler core kaslarini guclendirmeye yardimci olur.",
      "Orta seviye hareketler: Double Leg Stretch, Spine Stretch Forward, Saw, Swan ve Side Kick serisi. Bu hareketler esnekligi ve kas dayanikliligini arttirir.",
      "Ileri seviye hareketler: Teaser, Jackknife, Hip Circle ve Boomerang. Bu hareketleri denemeden once temel hareketlerde ustalasmis olmaniz onemlidir.",
    ],
  },
  "klinik-pilates-nedir": {
    title: "Klinik Pilates Nedir? Kimlere Uygulanir?",
    description: "Klinik pilates hakkinda detayli bilgi. Fizyoterapist esliginde rehabilitasyon amacli pilates.",
    category: "Fizyoterapi",
    date: "2025-02-25",
    content: [
      "Klinik pilates, fizyoterapist veya uzman saglik profesyonelleri esliginde uygulanan, tedavi amacli pilates programidir. Normal pilatesin aksine, klinik pilates belirli saglik sorunlarina yonelik ozel olarak tasarlanir.",
      "Klinik pilates ozellikle su durumlarda uygulanir: Bel fitigi, disk kaymalari, skolyoz, kifoz, omuz problemleri, diz sorunlari, boyun fitigi ve ameliyat sonrasi rehabilitasyon.",
      "Klinik pilates seanslari genellikle bire bir olarak yapilir ve fizyoterapist hastanin durumuna gore ozel bir program hazirlar. Tedavi sureci hastanin durumuna gore degisir.",
      "Turkiyede klinik pilates hizmeti veren fizyoterapi merkezlerini PilatesTopu.com uzerinden bulabilirsiniz. Sehrinize gore arama yaparak size en yakin merkezleri kesfedebilirsiniz.",
    ],
  },
  "pilates-ve-beslenme": {
    title: "Pilates Yaparken Nasil Beslenmeli?",
    description: "Pilates oncesi ve sonrasi beslenme onerileri. Performansinizi artirmak icin dogru besinler.",
    category: "Pilates ve Beslenme",
    date: "2025-02-20",
    content: [
      "Pilates yaparken dogru beslenme, performansinizi ve sonuclarinizi onemli olcude etkiler. Pilates oncesi ve sonrasi ne yemeniz gerektigini bilmek, antrenmalarinizdan maksimum verim almanizi saglar.",
      "Pilates oncesi beslenme: Antrenmaninizdan 1-2 saat once hafif bir ogun tuketin. Kompleks karbonhidratlar ve protein iceren besinler tercih edin. Ornegin yulaf ezmesi, muz veya tam tahilli tost.",
      "Pilates sonrasi beslenme: Antrenmaninizdan sonraki 30-60 dakika icinde protein agirlikli bir ogun tuketin. Kas onarimi icin protein, enerji yenileme icin karbonhidrat onemlidir.",
      "Su tuketimi pilates yaparken cok onemlidir. Antrenman oncesi, sirasi ve sonrasinda yeterli su icmeye dikkat edin. Gunluk en az 2-2.5 litre su tuketmeniz onerilir.",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(blogData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData[slug];
  if (!post) {
    return { title: "Yazi Bulunamadi - PilatesTopu" };
  }
  return {
    title: post.title + " - PilatesTopu",
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogData[slug];

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Yazi Bulunamadi</h1>
          <Link href="/blog" className="text-purple-600 hover:text-purple-700">Blog sayfasina don</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/blog" className="text-purple-200 hover:text-white mb-4 inline-block">&larr; Blog</Link>
          <span className="block text-sm font-medium text-purple-200 mb-2">{post.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
          <time className="text-purple-200">{post.date}</time>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-6 leading-relaxed">{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 p-6 bg-purple-50 rounded-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Pilates Studyosu mu Ariyorsunuz?</h3>
          <p className="text-gray-600 mb-4">Turkiye genelinde en iyi pilates studyolarini kesfedin.</p>
          <Link href="/" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Studyolari Incele
          </Link>
        </div>
      </article>
    </main>
  );
}
