import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/session";
import { cookies } from "next/headers";
import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";
import { SessionData } from "@/types/auth";
import bcrypt from "bcrypt";

export async function PUT(req: Request) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { username, email, currentPassword, newPassword } = await req.json();

  try {
    // 비밀번호 변경이 요청된 경우
    if (currentPassword && newPassword) {
      // 현재 사용자 정보 조회
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (!user) {
        return new NextResponse("User not found", { status: 404 });
      }

      // 현재 비밀번호 확인
      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return new NextResponse("현재 비밀번호가 일치하지 않습니다", { status: 400 });
      }

      // 새 비밀번호 해시
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // 사용자 정보 업데이트 (비밀번호 포함)
      const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      return NextResponse.json(updatedUser);
    }

    // 비밀번호 변경이 없는 경우
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { username, email },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return new NextResponse("Failed to update user", { status: 500 });
  }
}
