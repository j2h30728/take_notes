"use server";

import db from "@/utils/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

import { logInSchema } from "@/utils/schema";
import { getSession } from "@/utils/session";

export async function handleForm(_: unknown, formData: FormData) {
  const loginData = {
    password: formData.get("password"),
    email: formData.get("email"),
  };

  const result = await logInSchema.spa(loginData);

  if (result.success) {
    return logIn(result.data);
  }
  return {
    data: null,
    error: result.error?.flatten(),
    success: false,
  };
}

const logIn = async ({ email, password }: { email: string; password: string }) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      password: true,
    },
  });
  const isValidPassword = await bcrypt.compare(password, user!.password ?? "소셜로그인");
  if (isValidPassword) {
    const session = await getSession();
    session.id = user!.id;
    await session.save();
    redirect("/profile");
  }
  return {
    data: null,
    error: {
      fieldErrors: {
        password: ["비밀번호 확인 부탁드립니다."],
        email: [],
      },
    },
    success: false,
  };
};
