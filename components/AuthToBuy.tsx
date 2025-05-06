import React from "react";
import Link from "next/link";


function AuthToBuy() {
  return (
    <div data-cy="detalleProducto-authBuy" className="bg-gray-50 p-4 rounded-lg text-center">
      <p className="text-gray-700 mb-2">
        Para comprar o calificar este producto, necesitas una cuenta.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/login"
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/signup"
          className="bg-white text-red-500 border border-red-500 px-6 py-2 rounded-md hover:bg-red-50 transition-colors"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}

export default AuthToBuy;
