import { useRouter } from "next/navigation";
import React from "react";

function ErrorProductDetail() {
  const router = useRouter();
  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-4xl mx-auto my-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Error al cargar el producto
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => router.refresh()}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Reintentar
        </button>
        <button
          onClick={() => router.back()}
          className="bg-white text-red-500 border border-red-500 hover:bg-red-50 px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
        >
          Regresar
        </button>
      </div>
    </div>
  );
}

export default ErrorProductDetail;
