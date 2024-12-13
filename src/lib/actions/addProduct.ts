"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";

interface CreateProductData {
  url: string;
  name: string;
  price: number;
}

interface AddProductResult {
  success: boolean;
  product?: any;
  error?: string;
}

export async function addProduct(data: CreateProductData): Promise<AddProductResult> {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.user?.id) return { success: false, error: "로그인이 필요합니다." };

  try {
    const product = await prisma.product.create({
      data: {
        url: data.url,
        name: data.name,
        price: data.price,
        seller: {
          connect: {
            username: session.user.username,
            id: session.user.id,
          },
        },
      },
    });
    console.log("product", product);
    revalidatePath("/products");
    return { success: true, product };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "상품 등록에 실패했습니다." };
  }
}
