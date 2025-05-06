import React, { Suspense } from "react";
import ProductListSection from "@/sections/product/ProductListSection";
import SpinnerLoading from "@/ui/SpinnerLoading";

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<SpinnerLoading />}>
      <ProductListSection />
    </Suspense>
  );
}

// import ProductListSection from "@/sections/product/ProductListSection";
// import { getProductsBySearch } from "@/lib/api";

// type Props = {
//   searchParams: {
//     search?: string;
//   };
// };

// export default async function SearchResultsPage({ searchParams }: Props) {
//   const search = searchParams.search || "";
//   const products = await getProductsBySearch(search);

//   return <ProductListSection search={search} products={products} />;
// }
