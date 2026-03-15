import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { MapPin, ChevronRight, Building2, Phone, Navigation } from "lucide-react";

export const revalidate = 3600;

const DEFAULT_IMG = "https://www.pilatestopu.com/wp-content/uploads/2022/06/aletli-pilates.png";

interface CityData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  studio_count: number;
}

async function getCity(slug: string): Promise<CityData | null> {
  const { data, error } = await supabase.from("cities").select("*").eq("slug", slug).single();
  if (error || !data) return null;
  return data;
}

async function getPlacesInCity(cityId: string) {
  const { data } = await supabase.from("places").select("*, place_place_types(place_types(name, slug))").eq("city_id", cityId);
  return data || [];
}

async function getCities() {
  const { data } = await supabase.from("cities").select("name, slug, studio_count").order("name");
  return data || [];
}

async function getNeighborhoods(cityId: string) {
  const { data } = await supabase.from("neighborhoods").select("name, slug").eq("city_id", cityId).order("name");
  return data || [];
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const cityData = await getCity(city);
  if (!cityData) return { title: "Bulunamadı | PilatesTopu" };
  return {
    title: cityData.meta_title || cityData.name + " Pilates Salonları | En İyi Stüdyolar",
    description: cityData.meta_description || cityData.description || cityData.name + " pilates salonları",
    alternates: { canonical: "/p-c/" + city },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = await getCity(city);
  if (!cityData) notFound();
  const [places, allCities, neighborhoods] = await Promise.all([
    getPlacesInCity(cityData.id),
    getCities(),
    getNeighborhoods(cityData.id),
  ]);
  const otherCities = allCities.filter(function(c) { return c.slug !== city; }).slice(0, 12);

  return (
    <>
      <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-purple-200 mb-4 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white">Anasayfa</Link>
            <span className="mx-2">/</span>
            <Link href="/p-c" className="hover:text-white">Salonlar</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{cityData.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {cityData.name} Pilates Salonları
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl">
            {cityData.description || cityData.name + " pilates salonları, reformer pilates stüdyoları ve fiyatları"}
          </p>
          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
              {cityData.studio_count}+ Stüdyo
            </span>
            {neighborhoods.length > 0 && (
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                {neighborhoods.length} İlçe/Semt
              </span>
            )}
          </div>
        </div>
      </section>

      {neighborhoods.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Navigation className="w-6 h-6 text-purple-600" />
              {cityData.name} İlçe ve Semtler
            </h2>
            <p className="text-gray-600 mb-6">
              {cityData.name} ilindeki pilates salonlarını ilçe ve semtlere göre keşfedin.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {neighborhoods.map(function(n: any) {
                return (
                  <Link key={n.slug} href={"/p-c/" + city + "/" + n.slug} className="flex items-center gap-3 bg-purple-50 hover:bg-purple-100 rounded-xl px-4 py-3 transition-all group">
                    <MapPin className="w-4 h-4 text-purple-400 group-hover:text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700 group-hover:text-purple-700 font-medium text-sm">{n.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-purple-500" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          {cityData.name} Pilates Salonları
        </h2>
        {places.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map(function(place: any) {
              return (
                <Link key={place.id} href={"/salon/" + place.slug} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group border border-gray-100">
                  <div className="relative h-40 w-full">
                    <Image src={place.image_url || DEFAULT_IMG} alt={place.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600">{place.name}</h3>
                    {place.address && (
                      <p className="text-gray-500 text-sm mt-2 flex items-start gap-1">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {place.address}
                      </p>
                    )}
                    {place.phone && (
                      <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        {place.phone}
                      </p>
                    )}
                    <div className="mt-4 text-purple-600 text-sm font-medium flex items-center gap-1">
                      Detayları Gör <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">Salonlar Yakında Eklenecek</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {cityData.name} bölgesindeki pilates salonları yakında eklenecektir.
            </p>
          </div>
        )}
      </section>

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{cityData.name} Pilates Rehberi</h2>
          <p className="text-gray-600 leading-relaxed">
            {cityData.name} pilates salonları arasında reformer pilates, mat pilates, klinik pilates ve aletli pilates stüdyoları bulunmaktadır.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Diğer Şehirler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {otherCities.map(function(c: any) {
              return (
                <Link key={c.slug} href={"/p-c/" + c.slug} className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-all">
                  <span className="font-medium text-gray-900">{c.name}</span>
                  <span className="block text-sm text-gray-500">{c.studio_count}+ salon</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
