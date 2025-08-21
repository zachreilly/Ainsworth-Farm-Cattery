export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-sage-100 px-4 py-2 rounded-full mb-6">
            <span className="text-sage-700 text-sm font-semibold tracking-wide uppercase">About Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Ainsworth Farm Cattery
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Set in the tranquil gardens of Ainsworth Farm in Kings Langley, your cat's stay with us is our priority 
              and we pride ourselves in caring for your cat as if it were our own.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Cattery viewings, drop-offs and pick-ups can be arranged by appointment. 
              Please ring us to discuss your requirements and ensure the perfect stay for your beloved feline companion.
            </p>
          </div>
        </div>
      </div>
      
      <div className="py-24 bg-gradient-to-br from-cream-50 to-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Why Choose Ainsworth Farm Cattery?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our commitment to exceptional cat care sets us apart. Every detail is designed with your cat's comfort in mind.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-sage-200 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Home-Like Environment</h3>
              <p className="text-gray-600 leading-relaxed">
                Comfortable accommodations designed to feel like a second home for your feline friend.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-sage-200 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Personal Care</h3>
              <p className="text-gray-600 leading-relaxed">
                Individual attention and care tailored to your cat. Standard food supplied, for fancy eaters or prescription food please bring with you with enough for their stay.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-sage-200 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Tranquil Setting</h3>
              <p className="text-gray-600 leading-relaxed">
                Peaceful farm location away from city stress, perfect for sensitive or anxious cats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
