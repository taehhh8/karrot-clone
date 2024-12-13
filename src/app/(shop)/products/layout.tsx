import { Metadata } from "next";

export const metadata: Metadata = {
  title: "당근 마켓 | 상품",
  description: "당근 마켓 상품 페이지",
};

export default function productsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
