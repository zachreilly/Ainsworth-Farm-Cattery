import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import AvailabilitySection from "@/components/availability-section";
import GallerySection from "@/components/gallery-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <AvailabilitySection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
