import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
}

const Input = ({ label, id, type, required, ...props }: InputProps) => (
  <div>
    <label className="mb-1 block text-sm font-bold text-gray-500" htmlFor={id}>
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={label}
      className="w-full rounded-md border p-2 placeholder:text-sm focus:shadow-md focus:outline-none"
      required={required}
      {...props}
    />
  </div>
);

export default Input;
