import { Check, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PricingSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-cream-50 to-sage-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-sage-100 px-4 py-2 rounded-full mb-6">
            <span className="text-sage-700 text-sm font-semibold tracking-wide uppercase">Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Simple, Fair Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            One daily rate that includes everything your cat needs for a comfortable stay.
          </p>
        </div>
        
        <Card className="bg-white shadow-xl border-2 border-sage-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sage-500 to-sage-600"></div>
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-sage-100 rounded-full mb-6">
                <Heart className="text-sage-600 h-10 w-10" />
              </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-6">
                <div className="bg-sage-50 px-8 py-6 rounded-xl">
                  <div className="text-5xl font-bold text-sage-700 mb-2">£20</div>
                  <div className="text-lg text-gray-600 font-medium">per day for 1 cat</div>
                </div>
                <div className="bg-sage-50 px-8 py-6 rounded-xl">
                  <div className="text-5xl font-bold text-sage-700 mb-2">£35</div>
                  <div className="text-lg text-gray-600 font-medium">per day for 2 cats sharing</div>
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                All-inclusive daily rate covering accommodation, meals, care, 
                and both drop-off and collection days.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">What's Included</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-3">
                  <Check className="text-sage-600 h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Comfortable, spacious accommodation</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-sage-600 h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Daily meals and fresh water</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-sage-600 h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Drop-off day included</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-sage-600 h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Collection day included</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-sage-600 h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Personal attention and care</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-sage-600 h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Tranquil garden setting</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 text-lg font-semibold mr-4"
                size="lg"
              >
                Book Your Cat's Stay
              </Button>
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Have questions about pricing or special requirements? 
                  <button 
                    onClick={() => scrollToSection("contact")}
                    className="text-sage-600 hover:text-sage-700 ml-1 underline"
                  >
                    Get in touch
                  </button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Opening Hours</h4>
            <div className="text-gray-700">
              <p className="mb-2">
                <strong>Monday - Saturday:</strong> 9:00 AM - 11:00 AM & 4:00 PM - 6:00 PM
              </p>
              <p className="text-sage-600 font-medium">
                <strong>Sunday:</strong> Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}