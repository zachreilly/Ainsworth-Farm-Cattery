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
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <div className="inline-block bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-cream-100 text-sm font-medium tracking-wide">ESTABLISHED 2010 • FAMILY RUN</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 leading-tight">
          A Home Away From Home<br />
          <span className="text-sage-200 bg-gradient-to-r from-sage-200 to-cream-200 bg-clip-text text-transparent">For Your Beloved Cat</span>
        </h1>
        <p className="text-lg md:text-xl mb-12 font-light max-w-3xl mx-auto leading-relaxed text-cream-100">
          Nestled in the tranquil gardens of Ainsworth Farm in Kings Langley, 
          we provide a peaceful sanctuary where your cat's comfort, safety, and wellbeing are our highest priority.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            variant="outline"
            className="bg-white hover:bg-gray-50 text-sage-700 border-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            size="lg"
          >
            <a href="tel:01923264503">
              <Phone className="mr-3 h-5 w-5" />
              Call Now: 01923 264503
            </a>
          </Button>
          <Button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            size="lg"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
