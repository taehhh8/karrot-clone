"use server";

import { prisma } from "@/db/prisma";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";
import { SessionData } from "@/types/auth";

export async function toggleLike(tweetId: number) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.user?.id) return { error: "로그인이 필요합니다." };

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        tweetId_userId: {
          tweetId,
          userId: session.user.id,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
    } else {
      await prisma.like.create({
        data: {
          tweetId,
          userId: session.user.id,
        },
      });
    }

    revalidatePath(`/tweets/${tweetId}`);
    return { success: true };
  } catch (error) {
    return { error: "좋아요 처리 중 오류가 발생했습니다." };
  }
}
