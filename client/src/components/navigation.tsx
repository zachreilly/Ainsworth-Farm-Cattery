import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-sage-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center flex-shrink-0">
            <h1 className="text-2xl lg:text-4xl xl:text-5xl font-serif font-bold text-sage-700 tracking-wide whitespace-nowrap">
              Ainsworth Farm Cattery
            </h1>
          </div>
          
          <div className="hidden lg:block">
            <div className="flex items-baseline space-x-6">
              <button
                onClick={() => scrollToSection("home")}
                className="text-sage-700 hover:text-sage-900 px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-sage-50 rounded-md"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-sage-700 px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-sage-50 rounded-md"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-gray-700 hover:text-sage-700 px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-sage-50 rounded-md"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-gray-700 hover:text-sage-700 px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-sage-50 rounded-md"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("terms")}
                className="text-gray-700 hover:text-sage-700 px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-sage-50 rounded-md"
              >
                Terms
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-sage-700 px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-sage-50 rounded-md"
              >
                Contact
              </button>
            </div>
          </div>
          
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={() => scrollToSection("home")}
                className="block text-sage-700 hover:text-sage-900 px-3 py-2 text-base font-medium transition-colors w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block text-gray-700 hover:text-sage-700 px-3 py-2 text-base font-medium transition-colors w-full text-left"
              >
                About Us
              </button>

              <button
                onClick={() => scrollToSection("pricing")}
                className="block text-gray-700 hover:text-sage-700 px-3 py-2 text-base font-medium transition-colors w-full text-left"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="block text-gray-700 hover:text-sage-700 px-3 py-2 text-base font-medium transition-colors w-full text-left"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-gray-700 hover:text-sage-700 px-3 py-2 text-base font-medium transition-colors w-full text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
