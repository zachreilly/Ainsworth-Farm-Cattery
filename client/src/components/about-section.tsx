export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              About Ainsworth Farm Cattery
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p className="mb-6">
                Set in the tranquil gardens of Ainsworth Farm, your cat's stay with us is our priority 
                and we pride ourselves in caring for your cat as if it were our own.
              </p>
              <p className="mb-6">
                Cattery viewings, drop-offs and pick-ups can be arranged by appointment. 
                Please ring us to discuss your requirements.
              </p>
            </div>
          </div>

        </div>
      </div>
      
      <div className="py-20 bg-cream-100 mt-20">
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
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-home text-sage-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Home-Like Environment</h3>
              <p className="text-gray-600">
                Comfortable accommodations designed to feel like a second home for your feline friend.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-heart text-sage-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Care</h3>
              <p className="text-gray-600">
                Individual attention and care tailored to your cat's specific needs and personality.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-leaf text-sage-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tranquil Setting</h3>
              <p className="text-gray-600">
                Peaceful farm location away from city stress, perfect for sensitive or anxious cats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
