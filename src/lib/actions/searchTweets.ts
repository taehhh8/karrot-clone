import { prisma } from "@/db/prisma";

export async function searchTweets(query: string) {
  const tweets = await prisma.tweet.findMany({
      where: {
        OR: [{ content: { contains: query } }, { user: { username: { contains: query } } }],
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  return tweets;
}
