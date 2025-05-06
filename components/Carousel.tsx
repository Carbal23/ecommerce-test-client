import { API_HOST } from "@/app/config-global";
import NavigationCarouselButton from "@/ui/NavigationCarouselButton";
import NavigationDots from "@/ui/NavigationDots";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  images: { url: string; alt: string }[];
};

function Carousel({ images }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div data-cy="detalleProducto-carousel" className="mb-8 relative">
      <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gray-100">
        {images?.length > 0 ? (
          <>
            <Image
              src={`${API_HOST}${images[currentImageIndex].url}`}
              alt={images[currentImageIndex].alt}
              fill
              className="h-full w-full object-contain"
            />

            {images.length > 1 && (
              <NavigationCarouselButton
                nextImage={nextImage}
                prevImage={prevImage}
              />
            )}
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            Imagen no disponible
          </div>
        )}
      </div>

      {images?.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_: { url: string; alt: string }, index: number) => (
            <NavigationDots
              key={index}
              index={index}
              currentImageIndex={currentImageIndex}
              handleDotClick={handleDotClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Carousel;
