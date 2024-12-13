import Link from "next/link";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "당근 마켓 | HOME",
  description: "당근 마켓 홈페이지",
};

export default async function Home() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-white'>
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-12 mb-24'>
            <div className='flex-1 space-y-6'>
              <h1 className='text-5xl md:text-7xl font-bold text-gray-800'>
                당신 근처의
                <span className='block text-orange-500'>당근마켓</span>
              </h1>
              <p className='text-xl text-gray-600'>동네 이웃들과 가깝고 따뜻한 거래를 시작해보세요</p>

              {!session.user?.id ? (
                <div className='space-y-4 pt-6'>
                  <Link href='/sign-up'>
                    <Button className='w-full md:w-auto px-8 py-6 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded-full'>
                      시작하기
                      <ArrowRight className='ml-2 h-5 w-5' />
                    </Button>
                  </Link>
                  <div className='flex items-center gap-2 text-gray-600'>
                    <span>이미 계정이 있나요?</span>
                    <Link href='/sign-in' className='text-orange-500 hover:text-orange-600 font-medium'>
                      로그인하기
                    </Link>
                  </div>
                </div>
              ) : (
                <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100'>
                  <p className='text-2xl font-medium text-gray-800'>
                    환영합니다, <span className='text-orange-500'>{session.user.username}</span>님!
                  </p>
                  <p className='text-gray-600 mt-2'>당근마켓과 함께 이웃과 따뜻한 거래를 시작해보세요.</p>
                </div>
              )}
            </div>

            <div className='flex-1 relative'>
              <div className='relative w-full aspect-square'>
                <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] animate-bounce'>
                  🥕
                </span>
                <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-orange-500/20 blur-2xl rounded-full'></div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
              <span className='text-5xl block mb-6'>🤝</span>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>신뢰할 수 있는 거래</h3>
              <p className='text-gray-600'>검증된 사용자들과 안전한 거래를 경험하세요</p>
            </div>

            <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
              <span className='text-5xl block mb-6'>📍</span>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>동네 중고 거래</h3>
              <p className='text-gray-600'>가까운 이웃과 중고 물품을 거래하세요</p>
            </div>

            <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
              <span className='text-5xl block mb-6'>💬</span>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>이웃과 소통</h3>
              <p className='text-gray-600'>우리 동네의 다양한 이야기를 나눠보세요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
