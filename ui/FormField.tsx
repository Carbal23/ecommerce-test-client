import React from "react";
import { Field, ErrorMessage } from "formik";

type Props = React.InputHTMLAttributes<HTMLInputElement> & 
             React.TextareaHTMLAttributes<HTMLTextAreaElement> & 
             React.SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label?: string;
  as?: 'input' | 'textarea' | 'select';
  children?: React.ReactNode;
};

const FormField = ({ 
  name, 
  type = 'text',
  label,
  as = 'input',
  children,
  className = "",
  ...props 
}: Props) => {
  const baseClasses = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const formattedLabel = label || (name.charAt(0).toUpperCase() + name.slice(1));
  
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-black text-sm font-bold mb-2">
        {formattedLabel}
      </label>
      
      <Field
        as={as}
        type={as === 'input' ? type : undefined} // Solo para inputs
        id={name}
        name={name}
        className={`${baseClasses} ${className}`}
        {...props}
      >
        {as === 'select' ? children : null}
      </Field>
      
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div
            data-cy={`error-${name}`}
            className="text-red-500 text-xs mt-1"
          >
            {msg}
          </div>
        )}
      />
    </div>
  );
};

export default FormField;