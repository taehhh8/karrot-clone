import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  password: z.string().min(6, "비밀번호는 최소 4자 이상이어야 합니다"),
});

export const signUpSchema = z
  .object({
    username: z.string().min(2, "이름은 2글자 이상이어야 합니다"),
    email: z.string().email("올바른 이메일 주소를 입력해주세요"),
    password: z.string().min(4, "비밀번호는 4자리 이상이어야 합니다"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });
