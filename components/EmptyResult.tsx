"use client";

import Link from "next/link";
import { FaSearch, FaHome, FaBoxOpen } from "react-icons/fa";

export default function EmptyResults({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto text-center">
      <div className="flex justify-center mb-6">
        <FaBoxOpen className="text-gray-400 text-6xl" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        No encontramos resultados para{" "}
        <span className="text-red-500">&quot;{searchQuery}&quot;</span>
      </h2>
      <p className="text-gray-600 mb-6">
        Lo sentimos, no pudimos encontrar productos que coincidan con tu
        búsqueda.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/"
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
        >
          <FaHome /> Volver al inicio
        </Link>
        <Link
          href="/products?search=."
          className="bg-white text-red-500 border border-red-500 hover:bg-red-50 px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
        >
          <FaSearch /> Ver todos los productos
        </Link>
      </div>

      <div className="mt-8 text-left bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Sugerencias:</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Revisa la ortografía de tu búsqueda</li>
          <li>Usa términos más genéricos o menos específicos</li>
          <li>Prueba con otras categorías de productos</li>
        </ul>
      </div>
    </div>
  );
}
