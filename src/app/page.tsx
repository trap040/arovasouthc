import BlogSection from "@/components/BlogSection";
import WelcomeSection from "@/components/WelcomeSection";
import ExploreSection from "@/components/ExploreSection";
import SuitesSection from "@/components/SuitesSection";
import BookingSection from "@/components/BookingSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
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
      <BookingSection />
      <EventsSection />
      <GallerySection />
      <ServicesSection />
      <BlogSection />
      <MapSection />
      
    </main>
  );
}
