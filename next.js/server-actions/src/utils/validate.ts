"use server";

import { getUserAuthInfo, getUserByEmail, getUserByUsername } from "@/service/userService";
import { getSession } from "./session";
import bcrypt from "bcrypt";

export const isUsernameExists = async (username: string) => {
  const user = await getUserByUsername(username);
  return Boolean(user);
};

export const isEmailExists = async (email: string) => {
  const user = await getUserByEmail(email);

  return Boolean(user);
};

export const checkEmailAvailability = async (email: string) => {
  const session = await getSession();
  const user = await getUserByEmail(email);

  if (session.id === user?.id) return Boolean(user);

  return !Boolean(user);
};

export const checkUsernameAvailability = async (username: string) => {
  const session = await getSession();
  const user = await getUserByUsername(username);

  if (session.id === user?.id) return Boolean(user);

  return !Boolean(user);
};

export const checkUserPassword = async (password: string) => {
  const user = await getUserAuthInfo();
  const isValidPassword = await bcrypt.compare(password, user!.password ?? "소셜로그인");

  return isValidPassword;
};
