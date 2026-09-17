import Hero from "@/components/page/Home/Hero";
import { CuriosityCarousel } from "@/components/page/Home/CuriosityCarousel";
import { Testimonials } from "@/components/page/Home/Testimonials";
import { TurrimCTA } from "@/components/shared/TurrimCTA";
import { PlayroomSection } from "@/components/shared/PlayroomSection";
import { TurrimInfoSection } from "@/components/page/Home/TurrimInfoSection";
import { ProductsSection } from "@/components/page/Home/ProductsSection";

export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <CuriosityCarousel />
      <PlayroomSection />
      <ProductsSection />
      <TurrimInfoSection />
      <Testimonials />
      <TurrimCTA />
    </div>
  );
}
