"use client";

import { editProfile } from "@/app/(tabs)/users/[username]/edit/actions";
import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import { InitialUserInformationType } from "@/service/userService";
import { profileSchema, UserInformationType } from "@/utils/schema";
import { DocumentTextIcon, EnvelopeIcon, KeyIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ProfileEditForm({
  initialUserInformation,
}: {
  initialUserInformation: InitialUserInformationType;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserInformationType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: initialUserInformation.email ?? "",
      username: initialUserInformation.username ?? "",
      bio: initialUserInformation.bio ?? "",
    },
  });

  const onSubmit = handleSubmit(async (data: UserInformationType) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("newPassword", data.newPassword ?? "");
    formData.append("bio", data.bio ?? "");
    const errors = await editProfile(formData);
    setError("password", { message: errors?.fieldErrors.password?.at(0) });
  });

  const onValid = async () => {
    await onSubmit();
  };
  return (
    <form action={onValid}>
      <FormInput
        label={<UserIcon className="size-6  text-rose-500" />}
        type="text"
        required
        placeholder="이름을 입력해주세요."
        {...register("username")}
        errorMessage={errors.username?.message}
      />
      <FormInput
        label={<EnvelopeIcon className="size-6  text-rose-500" />}
        type="email"
        required
        placeholder="이메일을 입력해주세요."
        {...register("email")}
        errorMessage={errors.email?.message}
      />
      <FormInput
        label={<KeyIcon className="size-6  text-rose-500" />}
        type="password"
        required
        placeholder="현재 비밀번호를 입력해주세요."
        {...register("password")}
        errorMessage={errors.password?.message}
      />
      <FormInput
        label={<LockClosedIcon className="size-6  text-stone-500" />}
        type="password"
        required={false}
        placeholder="변경할 비밀번호를 입력해주세요."
        {...register("newPassword")}
        errorMessage={errors.newPassword?.message}
      />
      <FormInput
        label={<DocumentTextIcon className="size-6  text-stone-500" />}
        type="text"
        required={false}
        placeholder="자기소개를 입력해주세요."
        {...register("bio")}
        errorMessage={errors.email?.message}
      />
      <FormButton text="작성 완료" />
    </form>
  );
}
