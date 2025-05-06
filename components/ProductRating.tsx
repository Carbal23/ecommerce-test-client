import { useAuthContext } from "@/context/auth/useAuthContext";
import { useProductContext } from "@/context/product/useProductContext";
import React, { useState } from "react";

type Props = {
  id: string;
  rating: {
    average: number | null;
    count: number | null;
  };
};
function ProductRating({ id, rating }: Props) {
  const { isAuthenticated } = useAuthContext();
  const { ratingProduct } = useProductContext();
  const [ratingError, setRatingError] = useState("");
  const [isRating, setIsRating] = useState(false);

  const handleRate = async (value: number) => {
    if (!isAuthenticated) {
      setRatingError("Inicia sesión para calificar productos");
      return;
    }

    setIsRating(true);
    setRatingError("");
    ratingProduct(id, value);
  };

  return (
    <div data-cy="detalleProducto-rating">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Calificaciones
      </h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <div className="text-3xl font-bold text-gray-800 mr-2">
            {rating?.average?.toFixed(1) || "0.0"}
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">
                {i < Math.floor(rating?.average || 0) ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className="text-gray-500 ml-2">
            ({rating?.count || 0} votos)
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-gray-700 font-medium">Califica este producto:</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                onClick={() => handleRate(val)}
                disabled={isRating}
                className={`px-3 py-1 rounded-md transition-colors ${
                  isRating
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-yellow-100 text-gray-800"
                }`}
              >
                {val}★
              </button>
            ))}
          </div>
          {ratingError && (
            <div className="text-red-500 text-sm mt-1">{ratingError}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductRating;
