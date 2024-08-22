"use client";

import { useFormState } from "react-dom";
import Link from "next/link";

import { handleForm } from "./actions";
import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import ConformMessage from "@/components/conform-message";

export default function CreateAccountPage() {
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
          errorMessage={state?.error?.fieldErrors.email?.at(0)}
          label="💌"
        />
        <FormInput
          name="username"
          type="username"
          placeholder="이름을 입력해주세요."
          required={true}
          errorMessage={state?.error?.fieldErrors.username?.at(0)}
          label="👤"
        />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          required={true}
          errorMessage={state?.error?.fieldErrors.password?.at(0)}
          label="🔑"
        />
        <FormButton text="회원가입" />
      </form>
      <div className="flex gap-2">
        <span>이미 계정이 있나요?</span>
        <Link href="/log-in" className="hover:underline text-stone-600">
          로그인
        </Link>
      </div>
      {state?.error && <ConformMessage status="error" message={"잘못된 입력입니다."} />}
    </main>
  );
}
