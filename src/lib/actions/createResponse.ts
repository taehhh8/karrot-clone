'use server';

import { prisma } from "@/db/prisma";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";
import { SessionData } from "@/types/auth";

export async function createResponse(tweetId: number, content: string) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.user?.id) throw new Error("로그인이 필요합니다.");

  try {
    await prisma.response.create({
      data: {
        content,
        tweetId,
        userId: session.user.id,
      },
    });

    revalidatePath(`/tweets/${tweetId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to create response:', error);
    throw new Error("댓글 작성에 실패했습니다.");
  }
} 