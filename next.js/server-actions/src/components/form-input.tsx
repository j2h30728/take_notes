"use client";

import { ForwardedRef, forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

const _Input = (
  {
    name,
    type,
    placeholder,
    required,
    errorMessage,
    label,
    ...rest
  }: {
    name: string;
    type: HTMLInputTypeAttribute;
    placeholder: string;
    required: boolean;
    errorMessage?: string;
    label?: ReactNode;
  } & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-1">
      <div className="relative flex">
        <label htmlFor={name} className="absolute -translate-y-1/2 top-1/2 left-3">
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          id={name}
          className="bg-transparent h-11 pl-9 rounded-3xl w-full text-stone-600 border border-stone-300 focus:outline-none focus:ring transition focus:ring-stone-200 focus:ring-offset-1 placeholder:text-stone-400"
          name={name}
          required={required}
          placeholder={placeholder}
          disabled={pending}
          {...rest}
        />
      </div>
      <p className="pl-1 text-red-400">{errorMessage}</p>
    </div>
  );
};

export default forwardRef(_Input);
