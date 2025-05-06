import React from "react";
import { useRouter } from "next/navigation";

function AddToCar() {
  const router = useRouter();

  return (
    <div data-cy="detalleProducto-addCar" className="bg-gray-50 p-4 rounded-lg text-center">
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
          onClick={() => alert("Producto agregado al carrito")}
        >
          Agregar al carrito
        </button>
        <button
          onClick={() => router.back()}
          className="bg-white text-red-500 border border-red-500 px-6 py-2 rounded-md hover:bg-red-50 transition-colors"
        >
          Regresar
        </button>
      </div>
    </div>
  );
}

export default AddToCar;
