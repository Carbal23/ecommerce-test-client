"use client";

import { useProductContext } from "@/context/product/useProductContext";
import CreateButton from "@/ui/CreateButton";
import SearchBar from "@/ui/SearchBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeSection() {
  const router = useRouter();
  const { resetStates } = useProductContext();

  useEffect(() => {
    resetStates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (value: string) => {
    if (!value.trim()) return;
    router.push(`/products?search=${encodeURIComponent(value)}`);
  };

  return (
    <div className="md:w-4/5 xl:w-3/5 mx-auto my-12">
      <div className="bg-white shadow-md rounded-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Bienvenido a <span className="text-red-500">Ecommerce App</span>
        </h1>
        <SearchBar onSubmit={handleSubmit} />
      </div>
      <CreateButton />
    </div>
  );
}
