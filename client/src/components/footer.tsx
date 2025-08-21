import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6 text-sage-200">Ainsworth Farm Cattery</h3>
            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
              A family-run cattery providing exceptional care for your beloved cats in the tranquil 
              gardens of Ainsworth Farm in Kings Langley.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-sage-300 transition-all duration-300 transform hover:scale-110">
                <Facebook className="h-7 w-7" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sage-300 transition-all duration-300 transform hover:scale-110">
                <Instagram className="h-7 w-7" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-6 text-sage-200">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection("home")} 
                  className="text-gray-300 hover:text-sage-200 transition-colors duration-300 text-base"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("about")} 
                  className="text-gray-300 hover:text-sage-200 transition-colors duration-300 text-base"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("pricing")} 
                  className="text-gray-300 hover:text-sage-200 transition-colors duration-300 text-base"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("gallery")} 
                  className="text-gray-300 hover:text-sage-200 transition-colors duration-300 text-base"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("terms")} 
                  className="text-gray-300 hover:text-sage-200 transition-colors duration-300 text-base"
                >
                  Terms
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className="text-gray-300 hover:text-sage-200 transition-colors duration-300 text-base"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <i className="fas fa-phone text-sage-400"></i>
                <a href="tel:01923264503" className="hover:text-white transition-colors">
                  01923 264503
                </a>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-sage-400 mt-1"></i>
                <div>
                  Ainsworth Farm<br />
                  Bucks Hill<br />
                  Kings Langley WD4 9AP
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Ainsworth Farm Cattery. All rights reserved.</p>
          <p className="text-xs mt-2">Made by <a href="https://wrwebsites.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">wrwebsites.com</a></p>
        </div>
      </div>
    </footer>
  );
}
