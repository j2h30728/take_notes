"use server";

export type FormStatus = "initial" | "error" | "success";
interface FormState {
  status: FormStatus;
  message: string;
  error?: { password: string };
}

export async function handleForm(_: FormState, formData: FormData): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const password = formData.get("password");
  const email = formData.get("email");
  const username = formData.get("username");

  if (password === null || email === null || username === null) {
    return { status: "error", message: "전체 입력 부탁드립니다." };
  }
  if (password === "12345") {
    return { status: "success", message: "환영합니다!" };
  }
  if (password !== "12345") {
    return { status: "error", message: "확인 부탁드립니다.", error: { password: "잘못된 비밀번호 입니다." } };
  }
  return { status: "error", message: "확인 부탁드립니다." };
}
