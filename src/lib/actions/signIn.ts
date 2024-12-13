"use server";
import bcrypt from "bcrypt";
import { prisma } from "@/db/prisma";
import { signInSchema } from "@/validations/auth";
import { saveCookie } from "@/lib/auth/session";

export async function signInAction(formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = signInSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // 2. 이메일 존재 여부 확인
  const user = await prisma.user.findUnique({
    where: { email: result.data.email },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return {
      errors: {
        email: ["이메일이 존재하지 않습니다"],
      },
    };
  }

  // 3. 비밀번호 일치 여부 확인
  const passwordMatch = await bcrypt.compare(result.data.password, user.password);

  if (!passwordMatch) {
    return {
      errors: {
        password: ["비밀번호가 일치하지 않습니다"],
      },
    };
  }
  await saveCookie(user);

  return { success: true };
}
