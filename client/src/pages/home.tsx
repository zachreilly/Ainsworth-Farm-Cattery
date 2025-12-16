import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AnnouncementSection from "@/components/announcement-section";
import AboutSection from "@/components/about-section";
import AvailabilitySection from "@/components/availability-section";
import PricingSection from "@/components/pricing-section";
import GallerySection from "@/components/gallery-section";
import TermsSection from "@/components/terms-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AnnouncementSection />
      <GallerySection />
{/* <AvailabilitySection /> */}
      <PricingSection />
      <AboutSection />
      <TermsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
