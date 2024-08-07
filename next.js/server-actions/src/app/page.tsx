"use client";

import { useFormState } from "react-dom";

import { handleForm } from "./actions";
import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import ConformMessage from "@/components/conform-message";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <main className="flex flex-col gap-5 pt-10">
      <h1 className="text-center text-6xl">🐹</h1>
      <form action={action} className="flex flex-col gap-3 peer">
        <FormInput
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          required={true}
          errorMessage={state?.error?.fieldErrors.email}
          label="💌"
        />
        <FormInput
          name="username"
          type="username"
          placeholder="이름을 입력해주세요."
          required={true}
          errorMessage={state?.error?.fieldErrors.username}
          label="👤"
        />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          required={true}
          errorMessage={state?.error?.fieldErrors.password}
          label="🔑"
        />
        <FormButton text="LOG IN" />
      </form>
      {state?.success && <ConformMessage status="success" message={"환영합니다."} />}
      {state?.error && <ConformMessage status="error" message={"잘못된 입력입니다."} />}
    </main>
  );
}
