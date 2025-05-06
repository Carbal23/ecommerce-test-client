import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Email invalido").required("Email es requerido"),
  password: Yup.string().required("Password es requerido"),
});