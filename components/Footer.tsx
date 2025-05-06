"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

interface FooterProps {
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  portfolioUrl?: string;
}

const Footer = ({
  githubUrl = "#",
  linkedinUrl = "#",
  twitterUrl = "#",
  portfolioUrl = "#",
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Información básica */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Ecommerce App</h3>
            <p className="text-gray-400">La mejor tienda en línea para tus compras</p>
            <p className="text-gray-400 text-sm mt-2">
              © {currentYear} Ecommerce App. Todos los derechos reservados.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Enlaces rápidos</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/products?search=." className="text-gray-400 hover:text-white transition">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-2xl transition"
                aria-label="GitHub"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-2xl transition"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a 
                href={twitterUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-2xl transition"
                aria-label="Twitter"
                title="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href={portfolioUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-2xl transition"
                aria-label="Portafolio"
                title="Portafolio"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="feather feather-briefcase"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;