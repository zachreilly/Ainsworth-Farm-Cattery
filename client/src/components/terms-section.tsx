export default function TermsSection() {
  return (
    <section id="terms" className="py-24 bg-gradient-to-br from-sage-50 to-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-sage-100 px-4 py-2 rounded-full mb-6">
            <span className="text-sage-700 text-sm font-semibold tracking-wide uppercase">Important Requirements</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Terms & Conditions
          </h2>
          <div className="bg-white p-10 rounded-2xl shadow-xl border-2 border-sage-100">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 bg-sage-100 rounded-full">
              <svg className="w-10 h-10 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              Your furry friend must be fully vaccinated and up to date with their annual boosters before their stay.
            </p>
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-gray-600 leading-relaxed">
                This requirement ensures the health and safety of all cats in our care and maintains a safe environment for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}