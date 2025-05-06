import * as Yup from "yup";

export const signupValidationSchema = Yup.object({
  name: Yup.string().required("Nombre es requerido"),
  email: Yup.string().email("Email invalido").required("Email es requerido"),
  password: Yup.string().min(6, "Contraseña debe tener almenos 6 caracteres").required("Contraseña es requerida"),
});