export type ErrorProduct = {
  hasError: boolean;
  message: string | null;
  status: number | null;
  details: Array<{
    field: string;
    error: string;
  }>;
  code: string | null;
};

export type Rating = {
  average: number;
  count: number;
}

export type Images = {
  url: string;
  alt: string;
}

export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: Images[];
  rating: Rating;
  brand: string;
  stock: number;
  createdAt: string;
};

export type NewProduct = Omit<Product, "_id" | "rating" | "createdAt" | "images"> & {
  images: string[];
};

export type ContextType = {
  products: Product[];
  productSelected: Product | null;
  error: ErrorProduct;
  loadingProducts: boolean;
  loadingProductDetail: boolean;
  getProductsBySearch: (search: string) => void;
  getProductsById: (id: string) => void;
  createProduct: (product: NewProduct) => void;
  ratingProduct: (id: string, rating: number) => void;
  uploadImages: (images: File[]) => Promise<{images: string[]}>;
  resetStates: () => void;
};

export type ProductState = {
  products: Product[];
  productSelected: Product | null;
  error: ErrorProduct;
  loadingProducts: boolean;
  loadingProductDetail: boolean;
};

export type ProductAction =
  | { type: "SEARCH_PRODUCTS"; payload: {products: Product[]} }
  | { type: "CREATE"; payload: {product: Product} }
  | { type: "GET_PRODUCT_DETAIL"; payload: {product: Product} }
  | { type: "RATING_PRODUCT"; payload: {rating: Rating} }
  | { type: "ERROR"; payload: ErrorProduct }
  | { type: "CLEAN_ALERT" }
  | { type: "RESET_STATES" };

export enum ProductActionTypes {
  SEARCH_PRODUCTS = "SEARCH_PRODUCTS",
  CREATE = "CREATE",
  GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL",
  RATING_PRODUCT = "RATING_PRODUCT",
  ERROR = "ERROR",
  CLEAN_ALERT = "CLEAN_ALERT",
  RESET_STATES = "RESET_STATES",
}
