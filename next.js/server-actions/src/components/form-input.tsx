import { HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function FormInput({
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
  errorMessage?: string | undefined;
  label: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-1">
      <div className="relative flex">
        <label htmlFor={name} className="absolute -translate-y-1/2 top-1/2 left-3">
          {label}
        </label>
        <input
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
      <span className="pl-1 text-red-400">{errorMessage}</span>
    </div>
  );
}
