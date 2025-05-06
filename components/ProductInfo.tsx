import { Product } from "@/context/product/types";
import React from "react";

type Props = {
  product: Product;
};

function ProductInfo({ product }: Props) {
  console.log(product);
  return (
    <div data-cy="detalleProducto-info">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Detalles del producto
      </h2>
      <ul className="space-y-3">
        <li className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Precio:</span>
          <span className="font-bold text-red-500">
            ${product.price?.toLocaleString()}
          </span>
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Marca:</span>
          <span className="font-medium">{product.brand}</span>
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Categoría:</span>
          <span className="font-medium">{product.category}</span>
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Disponibilidad:</span>
          <span
            className={`font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? `En stock (${product.stock})` : "Agotado"}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default ProductInfo;
