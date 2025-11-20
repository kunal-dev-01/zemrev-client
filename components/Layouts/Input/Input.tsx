"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  disabled?: boolean;
}

const Input = ({
  label,
  type = "text",
  placeholder,
  error,
  register,
  disabled,
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        disabled={disabled}
        className={`w-full px-3 py-2 rounded-lg border bg-transparent text-zinc-800 dark:text-zinc-100
          focus:outline-none focus:ring-1 focus:ring-light dark:focus:ring-dark transition-all duration-200
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-zinc-300 dark:border-zinc-800"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default Input;
