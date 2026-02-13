import Hero from "@/components/page/Home/Hero";
import { CuriosityCarousel } from "@/components/page/Home/CuriosityCarousel";
import { Testimonials } from "@/components/page/Home/Testimonials";
import { TurrimCTA } from "@/components/page/Home/TurrimCTA";
import { PlayroomSection } from "@/components/page/Home/PlayroomSection";

export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <CuriosityCarousel />
      <PlayroomSection />
      <Testimonials />
      <TurrimCTA />
    </div>
  );
}
