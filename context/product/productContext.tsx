import { createContext } from "react";
import { ContextType } from "./types";

const defatulContext: ContextType = {
  products: [],
  productSelected: null,
  error: {
    hasError: false,
    message: null,
    status: null,
    details: [],
    code: null,
  },
  loadingProductDetail: true,
  loadingProducts: true,
  getProductsBySearch: () => {},
  getProductsById: () => {},
  createProduct: () => {},
  ratingProduct: () => {},
  uploadImages: async () => {
    return { images: [] };
  },
  resetStates: () => {},
};

const productContext = createContext(defatulContext);

export default productContext;
