"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";

import { searchTweet } from "./actions";
import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import ListTweet from "@/components/list-tweet";

export default function MainPage() {
  const [state, action] = useFormState(searchTweet, null);

  return (
    <div className="p-5 flex flex-col gap-5 ">
      <form action={action} className="flex comment-form gap-3">
        <FormInput
          label={<MagnifyingGlassIcon className="size-6" />}
          name="keyword"
          type="text"
          placeholder="검색할 내용을 입력해주세요."
          required
          errorMessage={state?.error?.formErrors[0] ?? ""}
        />
        <FormButton text="검색" />
      </form>
      <div className="p-5 flex flex-col gap-5">
        {state?.data?.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </div>
  );
}
