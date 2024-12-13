import { Metadata } from "next";

export const metadata: Metadata = {
  title: "당근 마켓 | 로그인",
  description: "당근 마켓 로그인 페이지",
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
