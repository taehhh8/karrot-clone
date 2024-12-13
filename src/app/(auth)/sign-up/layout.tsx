import { Metadata } from "next";

export const metadata: Metadata = {
  title: "당근 마켓 | 회원가입",
  description: "당근 마켓 회원가입 페이지",
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
