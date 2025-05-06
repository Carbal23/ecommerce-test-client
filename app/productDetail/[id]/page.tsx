"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProductDetailSection from "@/sections/product/ProductDetailSection";

const ProductDetailPage = () => {
  const { id } = useParams();

  if (typeof id !== "string") {
    return;
  }

  return <ProductDetailSection id={id} />;
};

export default ProductDetailPage;

// import { Product } from "@/context/product/types";
// import { getProductById } from "@/lib/api";
// import ProductDetailSection from "@/sections/product/ProductDetailSection";
// import { notFound } from "next/navigation";

// interface Props {
//   params: { id: string };
// }

// export default async function ProductDetailPage({ params }: Props) {
//   const id = params.id;

//   let product: Product | null = null;

//   try {
//     product = await getProductById(id);
//   } catch (error) {
//     console.error("Error fetching product detail:", error);
//     return notFound(); // muestra página 404
//   }

//   if (!product) return notFound();

//   return <ProductDetailSection product={product} />;
// }

