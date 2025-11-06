import Hero from "@/components/Hero";
import BrandIntroduction from "@/components/BrandIntroduction";
import MenuTeaser from "@/components/MenuTeaser";
import Philosophy from "@/components/Philosophy";
import GalleryTeaser from "@/components/GalleryTeaser";
import Reviews from "@/components/Reviews";
import ContactLocation from "@/components/ContactLocation";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <BrandIntroduction />
      <MenuTeaser />
      <Philosophy />
      <GalleryTeaser />
      <Reviews />
      <ContactLocation />
    </div>
  );
}
