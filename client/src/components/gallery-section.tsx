import { useState } from "react";
import ImageLightbox from "./image-lightbox";

import facility1 from "@assets/54b7ae58-f356-4eda-8753-73909f0b616e_1755723650395.jpeg";
import facility2 from "@assets/4663a8e6-4378-4ef9-9b41-53fb18a77770_1755723650397.jpeg";
import facility3 from "@assets/b54c6817-6649-40dc-a5aa-9b546afffa83_1755723650398.jpeg";
import facility4 from "@assets/c2bf3de2-1071-43f3-a6a5-d4a7e4797748_1755723650399.jpeg";
import facility5 from "@assets/ed369d28-0dfd-4a7b-9c3d-b9b063fef678_1755723650400.jpeg";

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
  }
];

const gardenImages = [
  {
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Lush garden with paths"
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Peaceful garden pond"
  },
  {
    src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Colorful flower garden"
  },
  {
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Serene farm landscape"
  }
];

const catImages = [
  {
    src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Content orange tabby cat"
  },
  {
    src: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Peaceful gray cat napping"
  },
  {
    src: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Playful black and white cat"
  },
  {
    src: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Relaxed calico cat"
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
    <section id="gallery" className="py-20 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Our Facilities & Happy Guests
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take a virtual tour of our cattery and see the comfortable spaces where your cat will stay.
          </p>
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Cattery Facilities</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {facilityImages.map((image, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => openLightbox(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="rounded-lg shadow-lg w-full h-64 object-cover group-hover:shadow-xl transition-shadow"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Garden Setting</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gardenImages.map((image, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => openLightbox(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="rounded-lg shadow-lg w-full h-48 object-cover group-hover:shadow-xl transition-shadow"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Happy Guests</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {catImages.map((image, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => openLightbox(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="rounded-lg shadow-lg w-full h-48 object-cover group-hover:shadow-xl transition-shadow"
                />
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
