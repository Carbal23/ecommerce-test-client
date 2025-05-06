import React from "react";

type Props = {
  children: React.ReactNode;
  category: string;
};

function ProductListByCategory({ children, category }: Props) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Categoría: {category}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>
    </div>
  );
}

export default ProductListByCategory;
