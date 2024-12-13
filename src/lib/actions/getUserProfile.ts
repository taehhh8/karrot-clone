import { prisma } from "@/db/prisma";

export async function getUserProfile(username: string) {
  const user = await prisma.user.findFirst({
    where: { username: username },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      products: true,
      likes: true,
      tweets: true,
    },
  });

  return user;
}
