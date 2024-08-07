"use server";

import { logInSchema } from "@/utils/schema";

export async function handleForm(_: unknown, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1));
  const loginData = {
    password: formData.get("password"),
    email: formData.get("email"),
    username: formData.get("username"),
  };

  const result = logInSchema.safeParse(loginData);

  if (result.success) {
    return {
      data: result.data,
      error: null,
      success: true,
    };
  }

  return {
    data: null,
    error: result.error?.flatten(),
    success: false,
  };
}
