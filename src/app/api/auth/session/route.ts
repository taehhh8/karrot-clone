import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/auth/session";
import { NextResponse } from "next/server";
import { SessionData } from "@/types/auth";
import { getUserProfile } from "@/lib/actions/getUserProfile";

export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.user?.username) {
    return NextResponse.json({ user: null });
  }

  const user = await getUserProfile(session.user.username);
  return NextResponse.json({ user });
}
