"use client";

import { useFormState } from "react-dom";
import { signUpAction } from "@/lib/actions/signUp";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function SignUp() {
  const [state, formAction] = useFormState((prevState: any, formData: FormData) => signUpAction(formData), {
    errors: { username: [], email: [], password: [], passwordConfirm: [], _form: [] },
    success: undefined,
  });

  if (state.success) {
    redirect("/");
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col items-center justify-center px-4 py-16'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <span className='text-6xl mb-4 inline-block'>🥕</span>
          <h1 className='text-3xl font-bold text-gray-800'>환영합니다!</h1>
          <p className='text-gray-600 mt-2'>회원가입을 위해 정보를 입력해주세요</p>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
          <form action={formAction} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='username' className='text-gray-700 font-medium'>
                유저 이름
              </Label>
              <Input
                id='username'
                name='username'
                type='text'
                placeholder='유저 이름을 입력하세요'
                required
                className={`bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500 rounded-xl ${
                  state.errors?.username?.length ? "border-red-500" : ""
                }`}
              />
              {state.errors?.username?.map((error) => (
                <p key={error} className='text-sm text-red-500'>
                  {error}
                </p>
              ))}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email' className='text-gray-700 font-medium'>
                이메일
              </Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='이메일을 입력하세요'
                required
                className={`bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500 rounded-xl ${
                  state.errors?.email?.length ? "border-red-500" : ""
                }`}
              />
              {state.errors?.email?.map((error) => (
                <p key={error} className='text-sm text-red-500'>
                  {error}
                </p>
              ))}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password' className='text-gray-700 font-medium'>
                비밀번호
              </Label>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='비밀번호를 입력하세요'
                required
                className={`bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500 rounded-xl ${
                  state.errors?.password?.length ? "border-red-500" : ""
                }`}
              />
              {state.errors?.password?.map((error) => (
                <p key={error} className='text-sm text-red-500'>
                  {error}
                </p>
              ))}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='passwordConfirm' className='text-gray-700 font-medium'>
                비밀번호 확인
              </Label>
              <Input
                id='passwordConfirm'
                name='passwordConfirm'
                type='password'
                placeholder='비밀번호를 다시 입력하세요'
                required
                className={`bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500 rounded-xl ${
                  state.errors?.passwordConfirm?.length ? "border-red-500" : ""
                }`}
              />
              {state.errors?.passwordConfirm?.map((error) => (
                <p key={error} className='text-sm text-red-500'>
                  {error}
                </p>
              ))}
            </div>

            <Button
              type='submit'
              className='w-full py-6 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-lg font-medium transition-colors'
            >
              회원가입
            </Button>
          </form>
        </div>

        <p className='mt-6 text-center text-gray-600'>
          이미 계정이 있으신가요?{" "}
          <Link href='/sign-in' className='text-orange-500 hover:text-orange-600 font-medium'>
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  );
}
