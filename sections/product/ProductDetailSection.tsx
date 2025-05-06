import React from "react";
import { useEffect } from "react";
import SpinnerLoading from "@/ui/SpinnerLoading";
import ErrorProductDetail from "@/components/ErrorProductDetail";
import Carousel from "@/components/Carousel";
import ProductInfo from "@/components/ProductInfo";
import ProductRating from "@/components/ProductRating";
import AuthToBuy from "@/components/AuthToBuy";
import AddToCar from "@/components/AddToCar";
import { useAuthContext } from "@/context/auth/useAuthContext";
import { useProductContext } from "@/context/product/useProductContext";

type Porps = {
  id: string;
};

function ProductDetailSection({ id }: Porps) {
  const { isAuthenticated } = useAuthContext();
  const { productSelected, loadingProductDetail, error, getProductsById } =
    useProductContext();

  useEffect(() => {
    if (id) {
      getProductsById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loadingProductDetail) {
    return <SpinnerLoading />;
  }

  if (error.hasError || !productSelected) return <ErrorProductDetail />;

  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-4xl mx-auto my-1">
      <div className="mb-2 border-b pb-4">
        <h1
          data-cy="detalleProducto-titulo"
          className="text-3xl font-bold text-gray-800"
        >
          {productSelected.title}
        </h1>
        <p data-cy="detalleProducto-descripcion" className="text-gray-600 mt-2">
          {productSelected.description}
        </p>
      </div>

      <Carousel images={productSelected.images} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ProductInfo product={productSelected} />
        <ProductRating
          key={productSelected._id}
          id={id}
          rating={productSelected.rating}
        />
      </div>

      {isAuthenticated ? <AddToCar /> : <AuthToBuy />}
    </div>
  );
}

export default ProductDetailSection;

// "use client"

// import React from "react";
// import SpinnerLoading from "@/ui/SpinnerLoading";
// import ErrorProductDetail from "@/components/ErrorProductDetail";
// import Carousel from "@/components/Carousel";
// import ProductInfo from "@/components/ProductInfo";
// import ProductRating from "@/components/ProductRating";
// import AuthToBuy from "@/components/AuthToBuy";
// import AddToCar from "@/components/AddToCar";
// import { useAuthContext } from "@/context/auth/useAuthContext";
// import { Product } from "@/context/product/types";

// type Props = {
//   product: Product;
// };

// function ProductDetailSection({ product }: Props) {
//   const { isAuthenticated } = useAuthContext();

//   // if (loadingProductDetail) {
//   //       return <SpinnerLoading />;
//   //     }

//   //     if (error.hasError || !productSelected) return <ErrorProductDetail />;

//   return (
//     <div className="bg-white shadow-md rounded-md p-6 max-w-4xl mx-auto my-1">
//       <div className="mb-2 border-b pb-4">
//         <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
//         <p className="text-gray-600 mt-2">{product.description}</p>
//       </div>

//       <Carousel images={product.images} />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <ProductInfo product={product} />
//         <ProductRating key={product._id} id={product._id} rating={product.rating} />
//       </div>

//       {isAuthenticated ? <AddToCar /> : <AuthToBuy />}
//     </div>
//   );
// }

// export default ProductDetailSection;
