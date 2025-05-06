import * as Yup from 'yup';

export const productValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Titulo es requerido')
    .min(3, 'El title debe tener al menos 3 caracteres')
    .max(100, 'El title no debe exceder los 100 caracteres'),
  description: Yup.string()
    .required('Descripcion es requerido')
    .min(10, 'La descripcion debe tener al menos 10 caracteres')
    .max(500, 'La descripcion no debe exceder los 500 caracteres'),
  price: Yup.number()
    .required('Precio es requerido')
    .min(0, 'El precio no puede ser negativo'),
  brand: Yup.string()
    .required('Marca es requerida')
    .max(50, 'La marca no debe exceder los 50 caracteres'),
  stock: Yup.number()
    .min(0, 'Stock no puede ser negativo')
    .integer('El stock debe ser un número entero'),
  category: Yup.string()
    .required('Categoria es requerida')
    .max(50, 'La categoria no debe exceder los 50 caracteres'),
});