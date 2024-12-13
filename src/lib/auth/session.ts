import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { User } from "@prisma/client";

import { SessionData } from "@/types/auth";

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "karrot-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1시간 후 만료
  },
  ttl: 60 * 60, // 1시간 후 만료
};

export const saveCookie = async (user: User) => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (user) {
    session.user = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }

  await session.save();
};

export const getCookie = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session.user;
};

export const deleteCookie = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.destroy();
};
