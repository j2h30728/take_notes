import { z } from "zod";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, USERNAME_MIN_LENGTH } from "./contants";

export const logInSchema = z.object({
  email: z
    .string({
      required_error: "이메일은 필수 값입니다.",
    })
    .email("이메일 형식으로 작성해주세요.")
    .refine((email) => email.includes("@zod.com"), "@zod.com 만 허용됩니다."),
  username: z
    .string({
      invalid_type_error: "이름은 문자만 가능합니다.",
      required_error: "이름은 필수 값입니다.",
    })
    .trim()
    .min(USERNAME_MIN_LENGTH, "이름은 5글자 이상이어야 합니다."),
  password: z
    .string({
      required_error: "비밀번호는 필수 값입니다.",
    })
    .min(PASSWORD_MIN_LENGTH, "비밀번호는 10글자 이상이어야 합니다.")
    .regex(PASSWORD_REGEX, "반드시 1개 이상의 숫자를 포함해야 합니다."),
});
