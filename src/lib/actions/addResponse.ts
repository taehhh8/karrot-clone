"use server";

import { prisma } from "@/db/prisma";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";
import { SessionData } from "@/types/auth";

export async function addResponse(tweetId: number, content: string) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.user?.id) return { error: "로그인이 필요합니다." };

  try {
    await prisma.response.create({
      data: {
        content,
        tweetId,
        userId: session.user.id,
      },
    });

    revalidatePath("/tweets");
    return { success: true };
  } catch (error) {
    return { error: "답글 작성 중 오류가 발생했습니다." };
  }
}
