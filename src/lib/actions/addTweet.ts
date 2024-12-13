"use server";

import { prisma } from "@/db/prisma";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";
import { cookies } from "next/headers";
import { TweetState } from "@/types/dashboard";
import { redirect } from "next/navigation";

export async function addTweetAction(prevState: TweetState, formData: FormData) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const userId = session.user?.id;

  if (!userId) {
    return { errors: { _form: ["로그인이 필요합니다"] } };
  }

  const content = formData.get("content") as string;
  if (!content) {
    return { errors: { content: ["내용을 입력해주세요"] } };
  }

  try {
    await prisma.tweet.create({
      data: {
        content,
        userId,
      },
    });
    return { success: true };
  } catch (error) {
    return { errors: { _form: ["트윗 저장 중 오류가 발생했습니다"] } };
  }
}
