import React from "react";

type Props = {
    index: number;
    currentImageIndex: number;
    handleDotClick: (index: number) => void;
    };

function NavigationDots({index, currentImageIndex, handleDotClick}: Props) {
  return (
    <div>
      <button
        key={index}
        onClick={() => handleDotClick(index)}
        className={`h-3 w-3 rounded-full ${
          currentImageIndex === index ? "bg-red-500" : "bg-gray-300"
        }`}
        aria-label={`Go to image ${index + 1}`}
      />
    </div>
  );
}

export default NavigationDots;
