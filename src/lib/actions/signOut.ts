"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.destroy();
  redirect("/sign-in");
}
