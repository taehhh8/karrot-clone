"use client";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditProfile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      if (!data.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);
      setLoading(false);
    };
    fetchUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (newPassword && newPassword !== confirmPassword) {
      toast.error("새 비밀번호가 일치하지 않습니다");
      return;
    }

    try {
      const res = await fetch("/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          currentPassword,
          newPassword,
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }

      toast.success("프로필이 수정되었습니다");
      router.push(`/users/${username}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "프로필 수정에 실패했습니다");
    }
  };

  if (loading) return null;

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8'>
      <div className='container mx-auto px-4'>
        <Card className='max-w-md mx-auto bg-gray-800/70 backdrop-blur-sm shadow-2xl border-gray-700'>
          <CardHeader>
            <h1 className='text-2xl font-bold text-center text-gray-200'>프로필 수정</h1>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-200'>사용자 이름</label>
                <Input
                  name='username'
                  defaultValue={user.username}
                  className='bg-gray-700/50 border-gray-600 text-gray-200'
                />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-200'>이메일</label>
                <Input
                  name='email'
                  type='email'
                  defaultValue={user.email}
                  className='bg-gray-700/50 border-gray-600 text-gray-200'
                />
              </div>

              <div className='border-t border-gray-700 pt-4'>
                <h2 className='text-lg font-semibold text-gray-200 mb-4'>비밀번호 변경</h2>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-200'>현재 비밀번호</label>
                    <Input
                      name='currentPassword'
                      type='password'
                      className='bg-gray-700/50 border-gray-600 text-gray-200'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-200'>새 비밀번호</label>
                    <Input
                      name='newPassword'
                      type='password'
                      className='bg-gray-700/50 border-gray-600 text-gray-200'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-200'>새 비밀번호 확인</label>
                    <Input
                      name='confirmPassword'
                      type='password'
                      className='bg-gray-700/50 border-gray-600 text-gray-200'
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.back()}
                className='flex-1 border-gray-600 text-gray-200 hover:bg-gray-700/50'
              >
                취소
              </Button>
              <Button type='submit' className='flex-1 bg-orange-500 hover:bg-orange-600 text-white'>
                저장
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
