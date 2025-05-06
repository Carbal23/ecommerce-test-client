"use client";

import UnauthorizedView from "@/components/UnauthorizedView";
import { useAuthContext } from "@/context/auth/useAuthContext";
import ProductNewSection from "@/sections/product/ProductNewSection";

export default function CreateProductPage() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <UnauthorizedView />;
  }
  return <ProductNewSection />;
}
