import Link from "next/link";
import React from "react";

function UnauthorizedView() {
  return (
    <div data-cy="unAuthorized" className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div
        className="w-full max-w-lg p-8 rounded-lg shadow-lg text-center"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Icono de advertencia */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Texto principal */}
        <h1 className="text-3xl font-bold mb-2">Acceso Denegado</h1>

        {/* Descripción */}
        <p className="text-lg mb-6 opacity-90">
          Debes estar autenticado para acceder a esta sección.
        </p>

        {/* Botón de regreso */}
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-md font-medium transition-all"
          style={{
            backgroundColor: "var(--foreground)",
            color: "var(--background)",
            border: "2px solid transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--foreground)";
            e.currentTarget.style.borderColor = "var(--foreground)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--foreground)";
            e.currentTarget.style.color = "var(--background)";
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default UnauthorizedView;
