import { useState } from "react";
import ImageLightbox from "./image-lightbox";

import facility1 from "@assets/54b7ae58-f356-4eda-8753-73909f0b616e_1755723650395.jpeg";
import facility2 from "@assets/4663a8e6-4378-4ef9-9b41-53fb18a77770_1755723650397.jpeg";
import facility3 from "@assets/b54c6817-6649-40dc-a5aa-9b546afffa83_1755723650398.jpeg";
import facility4 from "@assets/c2bf3de2-1071-43f3-a6a5-d4a7e4797748_1755723650399.jpeg";
import facility5 from "@assets/ed369d28-0dfd-4a7b-9c3d-b9b063fef678_1755723650400.jpeg";
import facility6 from "@assets/love cats_1755730601503.jpeg";

const facilityImages = [
  {
    src: facility1,
    alt: "Cattery facility"
  },
  {
    src: facility2,
    alt: "Cattery interior"
  },
  {
    src: facility3,
    alt: "Cat accommodation"
  },
  {
    src: facility4,
    alt: "Facility room"
  },
  {
    src: facility5,
    alt: "Cattery space"
  },
  {
    src: facility6,
    alt: "Cats enjoying their stay"
  }
];

import catPhoto1 from "@assets/PHOTO-2025-08-20-22-11-31_1755724709732.jpg";
import catPhoto2 from "@assets/3b27bbc2-8c33-41de-b1c4-3be03a1c4f16_1755724721798.jpeg";

const catImages = [
  {
    src: catPhoto1,
    alt: "Cats in their accommodation"
  },
  {
    src: catPhoto2,
    alt: "Happy cats at the cattery"
  }
];

export default function GallerySection() {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = (image: { src: string; alt: string }) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <section id="gallery" className="py-24 bg-gradient-to-br from-cream-50 to-sage-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-sage-100 px-4 py-2 rounded-full mb-6">
            <span className="text-sage-700 text-sm font-semibold tracking-wide uppercase">Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Our Facilities & Happy Guests
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            View the relaxing environment where your cat will be staying and see some of our happy guests enjoying their time with us.
          </p>
        </div>
        
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Cattery Facilities</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {facilityImages.map((image, index) => (
              <div
                key={index}
                className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
                onClick={() => openLightbox(image)}
              >
                <div className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="rounded-xl w-full h-64 object-cover"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-gray-700 font-medium">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Happy Guests</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {catImages.map((image, index) => (
              <div
                key={index}
                className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
                onClick={() => openLightbox(image)}
              >
                <div className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="rounded-xl w-full h-80 object-cover"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-gray-700 font-medium">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {lightboxImage && (
        <ImageLightbox
          image={lightboxImage}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}
