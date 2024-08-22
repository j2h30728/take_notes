"use client";

import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import { getUploadUrl, uploadTweet } from "./actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tweetSchema, UploadTweetType } from "@/utils/schema";

export default function AddTweets() {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UploadTweetType>({
    resolver: zodResolver(tweetSchema),
  });

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return alert("파일이 없다!");
    const file = files[0];
    if (!file.type.includes("image")) return alert("이미지 파일만 업로드 가능합니다.");
    if (file.size > 4 * 1024 * 1024) return alert("크기가 4MB를 초과하는 이미지는 업로드 할 수 없습니다.");
    const url = URL.createObjectURL(file);
    setPreview(url);
    setImageFile(file);

    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setValue("photo", `https://imagedelivery.net/wLHa2XjZzk_8Ca42_eTQww/${id}`);
    }
  };

  const onSubmit = handleSubmit(async (data: UploadTweetType) => {
    if (!imageFile) return alert("파일이 없다!");
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", imageFile);
    const response = await fetch(uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });
    if (response.status !== 200) return;
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("photo", data.photo);
    await uploadTweet(formData);
  });

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <div>
      <form action={onValid} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          style={{ backgroundImage: `url(${preview})` }}
          className="border-2 w-3/5 mx-auto aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover ">
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">{errors.photo?.message ?? "사진을 추가해주세요."}</div>
            </>
          ) : null}
        </label>
        <input onChange={onImageChange} type="file" id="photo" name="photo" accept="image/*" className="hidden" />
        <FormInput
          type="text"
          required
          placeholder="제목"
          {...register("title")}
          errorMessage={errors.title?.message}
        />
        <FormInput
          type="text"
          required
          placeholder="자세한 설명"
          {...register("description")}
          errorMessage={errors.description?.message}
        />
        <FormButton text="작성 완료" />
      </form>
    </div>
  );
}
