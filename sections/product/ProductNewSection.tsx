import React, { useState } from "react";
import Alert from "@/components/Alert";
import NewProductForm from "@/components/NewProductForm";
import { useProductContext } from "@/context/product/useProductContext";

function ProductNewSection() {
  const { error, createProduct, uploadImages } = useProductContext();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = async (
    values: {
      title: string;
      description: string;
      price: string;
      stock: string;
      category: string;
      brand: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      let imageUrls: string[] = [];

      if (selectedFiles.length > 0) {
        const images = await uploadImages(selectedFiles);
        imageUrls = images.images;
      }

      const productData = {
        ...values,
        price: parseFloat(values.price),
        stock: parseInt(values.stock) || 0,
        images: imageUrls,
      };

      await createProduct(productData);
    } catch (err) {
      console.error("Error creating product:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      <h2
        data-cy="nuevoProducto-titulo-form"
        className="text-4xl font-sans font-bold text-gray-800 text-center my-4"
      >
        Crear Nuevo Producto
      </h2>

      {error.hasError && <Alert msg={error.message} type="error" />}

      <NewProductForm
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default ProductNewSection;
