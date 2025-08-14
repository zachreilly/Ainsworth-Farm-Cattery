import { useState } from "react";
import ImageLightbox from "./image-lightbox";

const facilityImages = [
  {
    src: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Individual cat enclosure"
  },
  {
    src: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Spacious cat room"
  },
  {
    src: "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Outdoor cat play area"
  },
  {
    src: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Cat feeding area"
  },
  {
    src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Cozy cat sleeping area"
  },
  {
    src: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Multi-level cat tower"
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
