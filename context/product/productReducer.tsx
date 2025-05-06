import { ProductAction, ProductState } from "./types";

const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "SEARCH_PRODUCTS":
      return {
        ...state,
        products: action.payload.products,
        error: {
          hasError: false,
          message: null,
          status: null,
          details: [],
          code: null,
        },
        loadingProducts: false,
        loadingProductDetail: true,
      };
    case "CREATE":
      return {
        ...state,
        productSelected: action.payload.product,
        error: {
          hasError: false,
          message: null,
          status: null,
          details: [],
          code: null,
        },
      };
    case "GET_PRODUCT_DETAIL":
      return {
        ...state,
        productSelected: action.payload.product,
        error: {
          hasError: false,
          message: null,
          status: null,
          details: [],
          code: null,
        },
        loadingProductDetail: false,
        loadingProducts: true,
      };
    case "RATING_PRODUCT":
      return {
        ...state,
        productSelected: state.productSelected
          ? {
              ...state.productSelected,
              rating: {
                count: action.payload.rating.count,
                average: action.payload.rating.average,
              },
            }
          : null,
        error: {
          hasError: false,
          message: null,
          status: null,
          details: [],
          code: null,
        },
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        loadingProductDetail: false,
        loadingProducts: false,
      };
    case "CLEAN_ALERT":
      return {
        ...state,
        error: {
          hasError: false,
          message: null,
          status: null,
          details: [],
          code: null,
        },
        loadingProductDetail: false,
        loadingProducts: false,
      };
    case "RESET_STATES":
      return {
        ...state,
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
      };
    default:
      return state;
  }
};

export default productReducer;
