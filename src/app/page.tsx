import BlogSection from "@/components/BlogSection";
import WelcomeSection from "@/components/WelcomeSection";
import ExploreSection from "@/components/ExploreSection";
import SuitesSection from "@/components/SuitesSection";
import ServicesSection from "@/components/ServicesSection";
import MapSection from "@/components/MapSection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WelcomeSection />
      <ExploreSection />
      <SuitesSection />
      <ServicesSection />
      <BlogSection />
      <MapSection />
    </main>
  );
}
