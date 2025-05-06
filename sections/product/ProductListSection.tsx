"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import EmptyResults from "@/components/EmptyResult";
import ListProducts from "@/components/ListProducts";
import ProductListByCategory from "@/components/ProductListByCategory";
import ToolBar from "@/components/ToolBar";
import { useProductContext } from "@/context/product/useProductContext";
import SearchBar from "@/ui/SearchBar";
import SpinnerLoading from "@/ui/SpinnerLoading";
import { filter, groupByCategory } from "@/utils/toolBarUtils";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

function ProductListSection() {
  const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
  const { products, loadingProducts, getProductsBySearch } =
    useProductContext();
  const [groupByCat, setGroupByCat] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortBy, setSortBy] = useState<"" | "name" | "price" | "rating">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (!search) return;
    getProductsBySearch(search);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSubmit = (value: string) => {
    if (!value.trim()) return;
    router.push(`/products?search=${encodeURIComponent(value)}`);
  };

  const filteredProducts = filter(
    products,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder
  );
  const grouped = groupByCategory(filteredProducts);

  if (loadingProducts) {
    return <SpinnerLoading />;
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="md:w-4/5 xl:w-3/5 mx-auto mt-12">
        <div className="mb-8">
          <SearchBar onSubmit={handleSubmit} />
        </div>
        <EmptyResults searchQuery={search} />
      </div>
    );
  }

  return (
    <div className="md:w-4/5 xl:w-3/5 mx-auto mt-12">
      <div className="mb-8">
        <SearchBar onSubmit={handleSubmit} />
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Resultados de búsqueda para:{" "}
        <span className="text-red-500">&quot;{search}&quot;</span>
      </h1>

      <p className="text-center mb-6 text-gray-600">
        {filteredProducts.length} resultado(s) encontrado(s)
      </p>

      <ToolBar
        groupByCat={groupByCat}
        minPrice={minPrice}
        maxPrice={maxPrice}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onGroupByCatChange={setGroupByCat}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onSortByChange={setSortBy}
        onSortOrderChange={setSortOrder}
      />

      {groupByCat ? (
        Object.entries(grouped).map(([category, products]) => (
          <ProductListByCategory key={category} category={category}>
            {products.map((product) => (
              <Card key={product._id} {...product} />
            ))}
          </ProductListByCategory>
        ))
      ) : (
        <ListProducts>
          {filteredProducts.map((product) => (
            <Card key={product._id} {...product} />
          ))}
        </ListProducts>
      )}
    </div>
  );
}

export default ProductListSection;

// "use client";

// import React, { useState } from "react";
// import Card from "@/components/Card";
// import EmptyResults from "@/components/EmptyResult";
// import ListProducts from "@/components/ListProducts";
// import ProductListByCategory from "@/components/ProductListByCategory";
// import ToolBar from "@/components/ToolBar";
// import SearchBar from "@/ui/SearchBar";
// import { filter, groupByCategory } from "@/utils/toolBarUtils";
// import { useRouter } from "next/navigation";
// import { Product } from "@/context/product/types";

// type Props = {
//   search: string;
//   products: Product[];
// };

// export default function ProductListSection({ search, products }: Props) {
//   const router = useRouter();
//   const [groupByCat, setGroupByCat] = useState(true);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(Infinity);
//   const [sortBy, setSortBy] = useState<"" | "name" | "price" | "rating">("");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

//   const filteredProducts = filter(
//     products,
//     minPrice,
//     maxPrice,
//     sortBy,
//     sortOrder
//   );
//   const grouped = groupByCategory(filteredProducts);

//   const handleSubmit = (value: string) => {
//     if (!value.trim()) return;
//     router.push(`/products?search=${encodeURIComponent(value)}`);
//   };

//   if (filteredProducts.length === 0) {
//     return (
//       <div className="md:w-4/5 xl:w-3/5 mx-auto mt-12">
//         <div className="mb-8">
//           <SearchBar onSubmit={handleSubmit} />
//         </div>
//         <EmptyResults searchQuery={search} />
//       </div>
//     );
//   }

//   return (
//     <div className="md:w-4/5 xl:w-3/5 mx-auto mt-12">
//       <div className="mb-8">
//         <SearchBar onSubmit={handleSubmit} />
//       </div>

//       <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//         Resultados de búsqueda para:{" "}
//         <span className="text-red-500">&quot;{search}&quot;</span>
//       </h1>

//       <p className="text-center mb-6 text-gray-600">
//         {filteredProducts.length} resultado(s) encontrado(s)
//       </p>

//       <ToolBar
//         groupByCat={groupByCat}
//         minPrice={minPrice}
//         maxPrice={maxPrice}
//         sortBy={sortBy}
//         sortOrder={sortOrder}
//         onGroupByCatChange={setGroupByCat}
//         onMinPriceChange={setMinPrice}
//         onMaxPriceChange={setMaxPrice}
//         onSortByChange={setSortBy}
//         onSortOrderChange={setSortOrder}
//       />

//       {groupByCat ? (
//         Object.entries(grouped).map(([category, products]) => (
//           <ProductListByCategory key={category} category={category}>
//             {products.map((product) => (
//               <Card key={product._id} {...product} />
//             ))}
//           </ProductListByCategory>
//         ))
//       ) : (
//         <ListProducts>
//           {filteredProducts.map((product) => (
//             <Card key={product._id} {...product} />
//           ))}
//         </ListProducts>
//       )}
//     </div>
//   );
// }
