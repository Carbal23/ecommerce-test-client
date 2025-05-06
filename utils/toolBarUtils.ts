import { Product } from "@/context/product/types";


export const groupByCategory = (products: Product[]) => {
  return products.reduce((groups: Record<string, Product[]>, product) => {
    const category = product.category || "Sin categoría";
    if (!groups[category]) groups[category] = [];
    groups[category].push(product);
    return groups;
  }, {});
};

export const filter = (
  products: Product[],
  minPrice: number,
  maxPrice: number,
  sortBy: "" | "name" | "price" | "rating",
  sortOrder: "asc" | "desc"
): Product[] => {
  return products
    .filter((p) => p.price >= minPrice && p.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
      if (sortBy === "rating") {
        return sortOrder === "asc"
          ? a.rating.average - b.rating.average
          : b.rating.average - a.rating.average;
      }
      return 0;
    });
};
