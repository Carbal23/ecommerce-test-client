"use client";

import React from "react";
import { Formik, Form } from "formik";
import FormField from "@/ui/FormField";
import { signupValidationSchema } from "@/validations/signupValidations";
import { signupInitialValues } from "@/utils/initialValuesForm";
import { useAuthContext } from "@/context/auth/useAuthContext";

const SignUpSection = () => {
  const { userSignUp } = useAuthContext();
  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-lg">
        <Formik
          initialValues={signupInitialValues}
          validationSchema={signupValidationSchema}
          onSubmit={async (userData, { resetForm }) => {
            try {
              await userSignUp(userData);
              resetForm();
            } catch (error) {
              console.error("Error signing up", error);
            }
          }}
        >
          {() => (
            <Form
              data-cy="registro-form"
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            >
              <FormField
                data-cy="registro-nombre"
                name="name"
                label="Nombre"
                type="text"
                placeholder="Tu nombre"
              />
              <FormField
                data-cy="registro-email"
                name="email"
                type="email"
                placeholder="Tu email"
              />
              <FormField
                data-cy="registro-password"
                name="password"
                type="password"
                placeholder="Tu password"
              />

              <div className="mt-4">
                <button
                  data-cy="registro-submit"
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer"
                >
                  Crear Cuenta
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpSection;
