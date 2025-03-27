"use server";

import { getUserAuthInfo } from "@/service/userService";
import db from "@/utils/db";
import { profileSchema } from "@/utils/schema";
import { getSession } from "@/utils/session";
import { checkUserPassword } from "@/utils/validate";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function editProfile(formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    newPassword: formData.get("newPassword"),
    bio: formData.get("bio"),
  };
  const result = await profileSchema.safeParseAsync(data);
  if (!result.success) return result.error.flatten();

  const isValidPassword = await checkUserPassword(result.data.password);
  if (!isValidPassword) {
    return { fieldErrors: { password: ["비밀번호를 확인해주세요."] } };
  }
  const session = await getSession();

  if (result.data && result.data.newPassword) {
    const hashedNewPassword = await bcrypt.hash(result.data?.newPassword, 12);
    await db.user.update({
      where: {
        id: session.id,
      },
      data: {
        email: result.data?.email,
        username: result.data?.username,
        password: hashedNewPassword,
        bio: result.data?.bio,
      },
    });
    return redirect(`/users`);
  }
  const loggedInUser = await getUserAuthInfo();
  await db.user.update({
    where: {
      id: session.id,
    },
    data: {
      email: result.data?.email,
      username: result.data?.username,
      password: loggedInUser?.password,
      bio: result.data?.bio,
    },
  });
  return redirect(`/users`);
}
