import { getUserProfile } from "@/lib/actions/getUserProfile";
import ProfileClient from "@/components/common/ProfileClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "당근 마켓 | 프로필",
  description: "당근 마켓 프로필 페이지",
};

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return [];
}

export default async function UsernamePage({ params }: { params: { username: string } }) {
  const username = decodeURIComponent(params.username);
  const user = await getUserProfile(username);
  if (!user) return null;

  return <ProfileClient user={user} />;
}
