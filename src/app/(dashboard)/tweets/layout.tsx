import { Metadata } from "next";

export const metadata: Metadata = {
  title: "당근 마켓 | 트윗",
  description: "당근 마켓 트윗 페이지",
};

export default function TweetsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
