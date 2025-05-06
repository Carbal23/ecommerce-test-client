import { ProductState } from "./types";

export const initialState: ProductState = {
  products: [],
  productSelected: null,
  error: {
    hasError: false,
    message: null,
    status: null,
    details: [],
    code: null,
  },
  loadingProducts: true,
  loadingProductDetail: true,
};
