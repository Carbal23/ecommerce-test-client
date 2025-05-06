"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Alert from "@/components/Alert";

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  isSubmitting?: boolean;
}

const Dropzone = ({ onFilesSelected, isSubmitting }: DropzoneProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const onDropRejected = useCallback(() => {
    setError("Algunos archivos fueron rechazados. Solo se permiten maximo 3 imagenes (jpeg, jpg, png, webp) de hasta 5MB."
     
    );
  }, []);

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      setError("");
      const newFiles = [...selectedFiles, ...acceptedFiles].slice(0, 5);
      setSelectedFiles(newFiles);
      onFilesSelected(newFiles);
    },
    [selectedFiles, onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true,
    maxFiles: 3,
    disabled: isSubmitting,
  });

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div
      data-cy="nuevoProducto-dropzone"
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50"
    >
      {selectedFiles.length > 0 ? (
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-700">
            Imagenes seleccionadas ({selectedFiles.length}/5)
          </h4>
          <ul className="space-y-2">
            {selectedFiles.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm"
              >
                <div className="truncate">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                  disabled={isSubmitting}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>

          {error && <Alert msg={error} type="error" />}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`text-center p-8 cursor-pointer ${
            isDragActive ? "bg-gray-100" : ""
          } ${isSubmitting ? "opacity-50" : ""}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-600">Suelta los archivos aqui...</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">
                Arrastra & suelta algunas imagenes aqui, o haz clic para seleccionar archivos
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Formatos: JPEG, JPG, PNG, WEBP (Max 5MB por imagen)
              </p>
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                disabled={isSubmitting}
              >
                Seleccionar archivos
              </button>
              {error && <Alert msg={error} type="error" />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
