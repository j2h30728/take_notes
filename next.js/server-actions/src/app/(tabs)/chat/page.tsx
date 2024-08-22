"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";

import { addChallenge } from "./actions";
import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";

export default function Challenge() {
  const [state, action] = useFormState(addChallenge, null);

  return (
    <div className="p-5 flex flex-col gap-5 ">
      <form action={action} className="flex comment-form gap-3">
        <FormInput
          label={<MagnifyingGlassIcon className="size-6" />}
          name="content"
          type="text"
          placeholder="내용을 입력해주세요."
          required
          errorMessage={state?.error?.formErrors[0] ?? ""}
        />
        <FormButton text="추가" />
      </form>
      <div className="p-5 flex flex-col gap-5">{state?.data?.content}</div>
    </div>
  );
}
