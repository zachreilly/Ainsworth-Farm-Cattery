import { Sparkles } from "lucide-react";

export default function AnnouncementSection() {
  return (
    <section className="py-8 bg-gradient-to-r from-sage-100 to-cream-100 border-y border-sage-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="h-6 w-6 text-sage-600" />
          <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900">
            Exciting News!
          </h2>
          <Sparkles className="h-6 w-6 text-sage-600" />
        </div>
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4" data-testid="text-refurbishment-notice">
            We are having a refurbishment in January to upgrade our accommodation.
          </p>
          <div className="bg-white rounded-xl p-6 shadow-md inline-block">
            <p className="text-lg font-semibold text-gray-900 mb-2" data-testid="text-new-rates-heading">
              Our daily rates from 1st February 2026:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-sage-50 px-6 py-3 rounded-lg" data-testid="text-rate-one-cat">
                <span className="text-sage-700 font-bold text-xl">£20.00</span>
                <span className="text-gray-600 ml-2">for 1 cat</span>
              </div>
              <div className="bg-sage-50 px-6 py-3 rounded-lg" data-testid="text-rate-two-cats">
                <span className="text-sage-700 font-bold text-xl">£35.00</span>
                <span className="text-gray-600 ml-2">for 2 cats sharing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
