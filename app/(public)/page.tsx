import Hero from "@/components/page/Home/Hero";
import { CuriosityCarousel } from "@/components/page/Home/CuriosityCarousel";

export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <CuriosityCarousel />
    </div>
  );
}
