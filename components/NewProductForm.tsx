import React from "react";
import { Formik, Form } from "formik";
import FormField from "@/ui/FormField";
import Dropzone from "./Dropzone";
import { productInitialValues } from "@/utils/initialValuesForm";
import { productValidationSchema } from "@/validations/newProductValidations";
import Link from "next/link";

type Props = {
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  handleSubmit: (
    values: typeof productInitialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => Promise<void>;
};

function NewProductForm({
  selectedFiles,
  setSelectedFiles,
  handleSubmit,
}: Props) {
  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-4xl">
        <Formik
          initialValues={productInitialValues}
          validationSchema={productValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form
              data-cy="nuevoProducto-form"
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <FormField
                    data-cy="nuevoProducto-titulo"
                    name="title"
                    type="text"
                    placeholder="Titulo del producto"
                    label="Titulo *"
                  />
                </div>

                <div className="col-span-2">
                  <FormField
                    data-cy="nuevoProducto-descripcion"
                    name="description"
                    as="textarea"
                    placeholder="Descripcion del producto"
                    label="Descripcion *"
                    rows={4}
                  />
                </div>

                <div>
                  <FormField
                    data-cy="nuevoProducto-precio"
                    name="price"
                    type="number"
                    placeholder="0.00"
                    label="Precio *"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <FormField
                    data-cy="nuevoProducto-stock"
                    name="stock"
                    type="number"
                    placeholder="0"
                    label="Stock"
                    min="0"
                  />
                </div>

                <div>
                  <FormField
                    data-cy="nuevoProducto-marca"
                    name="brand"
                    type="text"
                    placeholder="Marca del producto"
                    label="Marca"
                  />
                </div>

                <div>
                  <FormField
                    data-cy="nuevoProducto-categoria"
                    name="category"
                    as="select"
                    label="Categoria"
                  >
                    <option value="">Seleccione la categoria</option>
                    <option value="electronics">Electronica</option>
                    <option value="clothing">Ropa</option>
                    <option value="home">Hogar</option>
                    <option value="books">Libros</option>
                    <option value="sports">Deportes</option>
                    <option value="sports">Higiene</option>
                    <option value="sports">Alimentos</option>
                  </FormField>
                </div>
              </div>

              <div  className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Imagenes
                </label>
                <Dropzone
                  onFilesSelected={(files) => setSelectedFiles(files)}
                  isSubmitting={isSubmitting}
                />
                {isSubmitting && selectedFiles.length > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Subierndo Imagenes...
                  </p>
                )}
              </div>

              <div className="mt-8 flex md:flex-row flex-col gap-4">
                <button
                  data-cy="nuevoProducto-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-500 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer disabled:opacity-70 transition-colors"
                >
                  {isSubmitting ? "Creando Producto..." : "Crear Producto"}
                </button>

                <Link
                  data-cy="nuevoProducto-cancelar"
                  href={"/"}
                  className="bg-white text-red-500 border border-red-500 w-full p-3 hover:bg-red-50 transition-colors uppercase font-bold cursor-pointer flex items-center justify-center "
                >
                  Cancelar
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default NewProductForm;
