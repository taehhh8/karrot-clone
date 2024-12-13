"use client";

import { useFormState } from "react-dom";
import { addTweetAction } from "@/lib/actions/addTweet";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";

export default function AddTweet() {
  const [state, formAction] = useFormState(addTweetAction, {
    errors: { content: [] },
    success: undefined,
  });
  console.log("state : ", state);
  if (state.success) {
    redirect("/tweets");
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center px-4'>
      <Card className='w-full max-w-md bg-gray-800/70 backdrop-blur-sm shadow-2xl border-gray-700'>
        <CardHeader>
          <h1 className='text-2xl font-bold text-center text-gray-200'>트윗 작성</h1>
        </CardHeader>
        <CardContent>
          <form action={formAction} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='content' className='text-gray-300'>
                내용
              </Label>
              <Textarea
                id='content'
                name='content'
                placeholder='무슨 일이 일어나고 있나요?'
                required
                className={`min-h-[120px] bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-400 focus-visible:ring-orange-400 ${
                  state.errors?.content?.length ? "border-red-500" : ""
                }`}
              />
              {state.errors?.content?.map((error) => (
                <p key={error} className='text-sm text-red-400'>
                  {error}
                </p>
              ))}
            </div>
            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white'
            >
              트윗 추가
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
