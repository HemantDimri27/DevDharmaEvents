import HeroSection from "@/componants/HeroSection";
import OurServices from "@/componants/OurServices";
import Testimonials from "@/componants/Testimonials";
import WhyChooseUs from "@/componants/WhyChooseUs";


export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection/>
      <OurServices/>
      <WhyChooseUs/>
      <Testimonials/>
    </main>
  );
}