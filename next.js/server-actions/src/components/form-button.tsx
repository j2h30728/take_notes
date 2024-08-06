import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

export default function FormButton({ text, ...rest }: { text: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full rounded-3xl text-stone-600 font-bold bg-stone-200 py-2 disabled:cursor-not-allowed"
      disabled={pending}
      {...rest}>
      {pending ? "로딩 중" : text}
    </button>
  );
}
