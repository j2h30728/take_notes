"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { PhotoIcon } from "@heroicons/react/24/solid";

import FormInput from "./form-input";
import FormButton from "./form-button";
import { getUploadUrl, uploadTweet } from "@/app/tweets/add/actions";

export default function UploadTweetForm() {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [photoId, setPhotoId] = useState("");
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return alert("파일이 없다!");
    const file = files[0];
    if (!file.type.includes("image")) return alert("이미지 파일만 업로드 가능합니다.");
    if (file.size > 4 * 1024 * 1024) return alert("크기가 4MB를 초과하는 이미지는 업로드 할 수 없습니다.");
    const url = URL.createObjectURL(file);
    setPreview(url);
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setPhotoId(id);
    }
  };

  const interceptAction = async (_: unknown, formData: FormData) => {
    const file = formData.get("photo");
    if (!file) return alert("파일이 없다!");
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });
    if (response.status !== 200) return;
    const photoUrl = `https://imagedelivery.net/wLHa2XjZzk_8Ca42_eTQww/${photoId}`;
    formData.set("photo", photoUrl);
    return uploadTweet(_, formData);
  };

  const [state, action] = useFormState(interceptAction, null);

  return (
    <form action={action} className="p-5 flex flex-col gap-5">
      <div className="flex justify-between">
        <label
          htmlFor="photo"
          style={{ backgroundImage: `url(${preview})` }}
          className=" w-40 border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover ">
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">{state?.fieldErrors.photo ?? "사진을 추가해주세요."}</div>
            </>
          ) : null}
        </label>
        <input onChange={onImageChange} type="file" id="photo" name="photo" accept="image/*" className="hidden" />
        <div className="flex flex-col gap-3">
          <FormInput name="title" type="text" required placeholder="제목" errorMessage={state?.fieldErrors.title} />
          <FormInput
            name="description"
            type="text"
            required
            placeholder="자세한 설명"
            errorMessage={state?.fieldErrors.description}
          />
        </div>
      </div>
      <FormButton text="작성 완료" />
    </form>
  );
}
