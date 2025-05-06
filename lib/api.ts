import { API_HOST } from "@/app/config-global";
import { Product } from "@/context/product/types";
import { paths } from "@/utils/apiPaths";

export async function getProductsBySearch(search: string): Promise<Product[]> {
  const res = await fetch(`${API_HOST}${paths.product.search}${encodeURIComponent(search)}`, {
    next: { revalidate: 0 }, 
  });

  if (!res.ok) {
    throw new Error("Error fetching products");
  }

  const data = await res.json();
  return data.products; 
}

export async function getProductById(id: string): Promise<Product> {
    const res = await fetch(`${API_HOST}${paths.product.getProductById}${id}`, {
      next: { revalidate: 0 }, 
    });
  
    if (!res.ok) {
      throw new Error("Error fetching product by ID");
    }
  
    const data = await res.json();
    return data.product; 
  }