"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

export default function FormButton({ text, ...rest }: { text: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button className="primary-button disabled:cursor-not-allowed" disabled={pending} {...rest}>
      {pending ? "로딩 중" : text}
    </button>
  );
}
