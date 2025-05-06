"use client";

import { useCallback, useMemo, useReducer } from "react";
import ProductContext from "./productContext";
import productReducer from "./productReducer";
import { initialState } from "./initialState";
import { ProductActionTypes, Product, NewProduct, Rating } from "./types";
import { ApiError, useApi } from "@/hooks/useApi";
import { paths } from "@/utils/apiPaths";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactElement;
};

const ProductProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const { get, post, patch } = useApi();
  const router = useRouter();

  const getProductsBySearch = useCallback(
    async (search: string) => {
      try {
        const res = await get<{ success: boolean; products: Product[] }>(
          `${paths.product.search}${encodeURIComponent(search)}`
        );
        dispatch({
          type: ProductActionTypes.SEARCH_PRODUCTS,
          payload: {
            products: res.products,
          },
        });
      } catch (error) {
        const apiError = error as ApiError;
        const errorPayload = {
          hasError: true,
          message: apiError.message || "Error al buscar productos",
          status: apiError.status || 500,
          details: apiError.details || [],
          code: apiError.code || "GET_PRODUCT_ERROR",
        };

        console.error("Error Login:", apiError);

        dispatch({
          type: ProductActionTypes.ERROR,
          payload: errorPayload,
        });

        throw errorPayload;
      }
    },
    [get]
  );

  const uploadImages = useCallback(
    (images: File[]): Promise<{ images: string[] }> => {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      return post<FormData, { success: boolean; images: string[] }>(
        paths.product.uploadImages,
        formData
      );
    },
    [post]
  );

  const createProduct = useCallback(
    async (product: NewProduct) => {
      try {
        const res = await post<
          NewProduct,
          { success: boolean; product: Product }
        >(paths.product.newProduct, product);

        dispatch({
          type: ProductActionTypes.CREATE,
          payload: {
            product: res.product,
          },
        });
        router.push(`/productDetail/${res.product._id}`);
      } catch (error) {
        const apiError = error as ApiError;
        const errorPayload = {
          hasError: true,
          message: apiError.message || "Error al buscar productos",
          status: apiError.status || 500,
          details: apiError.details || [],
          code: apiError.code || "GET_PRODUCT_ERROR",
        };

        console.error("Error Login:", apiError);

        dispatch({
          type: ProductActionTypes.ERROR,
          payload: errorPayload,
        });

        throw errorPayload;
      }
    },
    [post, router]
  );

  const getProductsById = useCallback(
    async (id: string) => {
      try {
        const res = await get<{ success: boolean; product: Product }>(
          `${paths.product.getProductById}${id}`
        );
        dispatch({
          type: ProductActionTypes.GET_PRODUCT_DETAIL,
          payload: {
            product: res.product,
          },
        });
      } catch (error) {
        const apiError = error as ApiError;
        const errorPayload = {
          hasError: true,
          message: apiError.message || "Error al buscar productos",
          status: apiError.status || 500,
          details: apiError.details || [],
          code: apiError.code || "GET_PRODUCT_ERROR",
        };

        console.error("Error Login:", apiError);

        dispatch({
          type: ProductActionTypes.ERROR,
          payload: errorPayload,
        });

        throw errorPayload;
      }
    },
    [get]
  );

  const ratingProduct = useCallback(
    async (id: string, rating: number) => {
      try {
        const res = await patch<{ rating: number }, { rating: Rating }>(
          `${paths.product.getProductById}${id}${paths.product.ratingProduct}`,
          { rating: rating }
        );
        dispatch({
          type: ProductActionTypes.RATING_PRODUCT,
          payload: {
            rating: res.rating,
          },
        });
      } catch (error) {
        const apiError = error as ApiError;
        const errorPayload = {
          hasError: true,
          message: apiError.message || "Error al buscar productos",
          status: apiError.status || 500,
          details: apiError.details || [],
          code: apiError.code || "GET_PRODUCT_ERROR",
        };

        console.error("Error Login:", apiError);

        dispatch({
          type: ProductActionTypes.ERROR,
          payload: errorPayload,
        });

        throw errorPayload;
      }
    },
    [patch]
  );

  const resetStates = useCallback(() => {
    dispatch({
      type: ProductActionTypes.RESET_STATES,
    });
  }, []);

  const memoValue = useMemo(() => {
    return {
      products: state.products,
      productSelected: state.productSelected,
      error: state.error,
      loadingProducts: state.loadingProducts,
      loadingProductDetail: state.loadingProductDetail,
      getProductsBySearch,
      createProduct,
      getProductsById,
      ratingProduct,
      uploadImages,
      resetStates,
    };
  }, [
    state.products,
    state.productSelected,
    state.error,
    state.loadingProducts,
    state.loadingProductDetail,
    getProductsBySearch,
    createProduct,
    getProductsById,
    ratingProduct,
    uploadImages,
    resetStates,
  ]);

  return (
    <ProductContext.Provider value={memoValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
