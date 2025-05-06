"use client";

import { useAuthContext } from "@/context/auth/useAuthContext";
import Link from "next/link";
import { useState } from "react";

export default function CreateProductButton() {
  const { isAuthenticated } = useAuthContext();
  const [showTooltip, setShowTooltip] = useState(false);

  if (!isAuthenticated) return null;

  return (
    <div data-cy="newProduct-button" className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap">
            Crear nuevo producto
            <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-gray-800 border-l-transparent border-r-transparent"></div>
          </div>
        )}
        <Link
          href="/newProduct"
          className="flex items-center justify-center w-14 h-14 bg-red-500/75 hover:bg-red-600/80 text-white rounded-full shadow-lg transition-all transform hover:scale-110 backdrop-blur-sm"
          aria-label="Crear nuevo producto"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}