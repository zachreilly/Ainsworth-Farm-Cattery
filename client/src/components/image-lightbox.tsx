import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageLightboxProps {
  image: {
    src: string;
    alt: string;
  };
  onClose: () => void;
}

export default function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-full p-4">
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-full object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl"
          onClick={onClose}
        >
          <X className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
