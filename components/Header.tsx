"use client";

import Image from "next/image";
import React from "react";
import { ButtonData } from "@/utils/componentsData";
import dynamic from "next/dynamic";
import { useAuthContext } from "@/context/auth/useAuthContext";
import { useRouter } from "next/navigation";
const NavButton = dynamic(() => import("@/ui/NavButton"));

const Header = () => {
  const router = useRouter();
  const { loading, isAuthenticated, user, userLogout } = useAuthContext();

  const homeRedirecting = () => {
    router.push("/");
  };

  const LoadingComponent = () => {
    if (loading) {
      return null;
    }

    const handlerLogout = () => {
      homeRedirecting();
      userLogout();
    };

    return (
      <>
        {user && isAuthenticated ? (
          <div
            data-cy="user-auth"
            className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-lg shadow-md"
          >
            <span className="text-xl mr-2">👤</span>
            <p className="text-gray-800 font-medium mr-2">{`Bienvenido ${user?.name}`}</p>
            <button
              data-cy="cerrar-sesion"
              className="bg-black px-4 py-2 rounded-lg text-white font-bold uppercase hover:bg-gray-600 transition"
              type="button"
              onClick={handlerLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="flex flex-row">
            {ButtonData.map((button) => (
              <NavButton
                key={button.name}
                link={button.link}
                bg={button.bg}
                h={button.h}
              >
                {button.name}
              </NavButton>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <header className="py-4 flex flex-col items-center md:flex-row justify-between">
      <Image
        className="mb-6 md:mb-0 md:ml-2 cursor-pointer"
        alt="Logo"
        src="/ecommerce2.png"
        width={256}
        height={56}
        onClick={homeRedirecting}
      />
      <LoadingComponent />
    </header>
  );
};

export default Header;
