import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&h=1200')`
        }}
      />
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
          A Home Away From Home<br />
          <span className="text-sage-200">For Your Beloved Cat</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto">
          Family-run cattery nestled in the tranquil gardens of Ainsworth Farm, 
          where your cat's comfort and wellbeing are our top priority.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => scrollToSection("availability")}
            className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 text-lg font-semibold"
            size="lg"
          >
            Check Availability
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-white hover:bg-gray-100 text-sage-700 border-white px-8 py-4 text-lg font-semibold"
            size="lg"
          >
            <a href="tel:01923264503">
              <Phone className="mr-2 h-5 w-5" />
              Call: 01923 264503
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
