import { prisma } from "@/db/prisma";

export async function getTweets() {
  try {
    const tweets = await prisma.tweet.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        likes: true,
        responses: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return tweets;
  } catch (error) {
    console.error("트윗을 가져오는 중 에러 발생:", error);
    return [];
  }
}

export async function getTweetById(id: string) {
  try {
    const tweet = await prisma.tweet.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        likes: true,
        responses: {
          include: {
            user: true,
          },
        },
      },
    });
    return tweet;
  } catch (error) {
    console.error("Error fetching tweet:", error);
    throw new Error("트윗을 불러오는데 실패했습니다.");
  }
}
