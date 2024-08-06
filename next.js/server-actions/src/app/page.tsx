"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import { handleForm } from "./actions";
import { useFormState } from "react-dom";
import ConformMessage from "@/components/conform-message";

export interface FormDataType {
  email: string;
  username: string;
  password: string;
}

export default function Home() {
  const [state, action] = useFormState(handleForm, { status: "initial", message: "" });

  return (
    <main className="flex flex-col gap-5 pt-10">
      <h1 className="text-center text-6xl">🐹</h1>
      <form action={action} className="flex flex-col gap-3 peer">
        <FormInput
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          required={true}
          errorMessage=""
          label="💌"
        />
        <FormInput
          name="username"
          type="username"
          placeholder="이름을 입력해주세요."
          required={true}
          errorMessage=""
          label="👤"
        />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          required={true}
          errorMessage={state.error?.password}
          label="🔑"
        />
        <FormButton text="LOG IN" />
      </form>
      {state.status === "success" && <ConformMessage status="success" message={state.message} />}
      {state.status === "error" && <ConformMessage status="error" message={state.message} />}
    </main>
  );
}
