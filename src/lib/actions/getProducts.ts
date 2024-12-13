import { prisma } from "@/db/prisma";

export async function getProducts() {
  const products = await prisma.product.findMany({
    include: { seller: true },
    orderBy: { createdAt: "desc" },
  });
  return products;
}
