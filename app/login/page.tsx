"use client"

import Alert from "@/components/Alert";
import { useAuthContext } from "@/context/auth/useAuthContext";
import LoginSection from "@/sections/auth/LoginSection";
import React from "react";

const LoginPage = () => {
  const { error } = useAuthContext();
    const type = error.hasError ? "error" : "success";
  return (
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      <h2 data-cy="login-titulo" className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
        Iniciar Sesión
      </h2>
      <Alert  msg={error.message} type={type} />
      <LoginSection />
    </div>
  );
};

export default LoginPage;
