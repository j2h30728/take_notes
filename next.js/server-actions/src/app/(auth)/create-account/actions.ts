"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

import { accountSchema } from "@/utils/schema";
import db from "@/utils/db";
import { getSession } from "@/utils/session";

export async function handleForm(_: unknown, formData: FormData) {
  const accountData = {
    password: formData.get("password"),
    email: formData.get("email"),
    username: formData.get("username"),
  };

  const result = await accountSchema.safeParseAsync(accountData);

  if (result.success) {
    await createAccount(result.data);
  }

  return {
    data: null,
    error: result.error?.flatten(),
    success: false,
  };
}

const createAccount = async ({ username, email, password }: { username: string; email: string; password: string }) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await db.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });
  const cookie = await getSession();
  cookie.id = user.id;
  await cookie.save();
  redirect("/profile");
};
