"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Mail, User, LogOut, MapPin, Heart, ShoppingBag, Pencil } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOutAction } from "@/lib/actions/signOut";
import { toast } from "sonner";
import { ProfileClientProps } from "@/types/dashboard";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileClient({ user }: ProfileClientProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutAction();
    toast.success("로그아웃 되었습니다");
  };

  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const checkCurrentUser = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setIsCurrentUser(data.user?.id === user.id);
    };
    checkCurrentUser();
  }, [user.id]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-white'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {/* 프로필 카드 */}
          <Card className='lg:col-span-1 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden'>
            <CardHeader className='flex flex-col items-center space-y-6'>
              <Avatar className='w-32 h-32 border-4 border-orange-100 ring-4 ring-orange-500/10'>
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
                <AvatarFallback className='bg-orange-100 text-orange-500 text-4xl font-bold'>
                  {user.username[0]}
                </AvatarFallback>
              </Avatar>
              <div className='text-center space-y-2'>
                <h1 className='text-2xl font-bold text-gray-800'>{user.username}</h1>
                <div className='flex items-center justify-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full'>
                  <MapPin className='w-4 h-4 text-orange-500' />
                  <span className='text-sm'>서울특별시 강남구</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className='space-y-6 pt-6'>
              <div className='flex items-center space-x-4 text-gray-600 bg-gray-50 p-4 rounded-xl'>
                <Mail className='w-5 h-5 text-orange-500' />
                <span>{user.email}</span>
              </div>
              <div className='flex items-center space-x-4 text-gray-600 bg-gray-50 p-4 rounded-xl'>
                <CalendarDays className='w-5 h-5 text-orange-500' />
                <span>가입일: {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>

            <CardFooter className='flex gap-3 pt-6'>
              {isCurrentUser && (
                <Button
                  variant='outline'
                  className='flex-1 border-orange-500 text-orange-500 hover:bg-orange-50'
                  onClick={() => router.push("/users/edit")}
                >
                  <Pencil className='w-4 h-4 mr-2' />
                  수정하기
                </Button>
              )}
              {isCurrentUser && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant='destructive' className='flex-1 bg-red-500 hover:bg-red-600'>
                      <LogOut className='w-4 h-4 mr-2' />
                      로그아웃
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className='bg-white border-gray-200 rounded-2xl'>
                    <AlertDialogHeader>
                      <AlertDialogTitle className='text-gray-800'>로그아웃</AlertDialogTitle>
                      <AlertDialogDescription className='text-gray-600'>
                        정말 로그아웃 하시겠습니까?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className='border-gray-200 text-gray-700 hover:bg-gray-50'>
                        취소
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleSignOut} className='bg-red-500 hover:bg-red-600'>
                        로그아웃
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </CardFooter>
          </Card>

          {/* 활동 정보 */}
          <div className='lg:col-span-2 space-y-8'>
            {/* 통계 카드 */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <Card className='p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all'>
                <div className='flex flex-col items-center space-y-3'>
                  <div className='p-3 bg-orange-50 rounded-xl'>
                    <ShoppingBag className='w-8 h-8 text-orange-500' />
                  </div>
                  <h3 className='font-semibold text-gray-600'>판매 상품</h3>
                  <p className='text-3xl font-bold text-gray-800'>{user.products?.length || 0}</p>
                </div>
              </Card>
              <Card className='p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all'>
                <div className='flex flex-col items-center space-y-3'>
                  <div className='p-3 bg-orange-50 rounded-xl'>
                    <Heart className='w-8 h-8 text-orange-500' />
                  </div>
                  <h3 className='font-semibold text-gray-600'>좋아요</h3>
                  <p className='text-3xl font-bold text-gray-800'>{user.likes?.length || 0}</p>
                </div>
              </Card>
              <Card className='p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all'>
                <div className='flex flex-col items-center space-y-3'>
                  <div className='p-3 bg-orange-50 rounded-xl'>
                    <User className='w-8 h-8 text-orange-500' />
                  </div>
                  <h3 className='font-semibold text-gray-600'>팔로워</h3>
                  <p className='text-3xl font-bold text-gray-800'>{user.tweets?.length || 0}</p>
                </div>
              </Card>
            </div>

            {/* 최근 활동 */}
            <Card className='bg-white border border-gray-100 rounded-2xl shadow-sm'>
              <CardHeader>
                <h2 className='text-xl font-bold text-gray-800'>최근 활동</h2>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='border border-gray-200 rounded-xl p-6 bg-gray-50'>
                  <p className='text-gray-600 text-center'>아직 활동 내역이 없습니다.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
