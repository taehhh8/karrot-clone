"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createResponse } from "@/lib/actions/createResponse";
import { useRouter } from "next/navigation";

interface ResponseFormProps {
  tweetId: number;
}

export default function ResponseForm({ tweetId }: ResponseFormProps) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setIsLoading(true);
      await createResponse(tweetId, content);
      setContent("");
      router.refresh();
    } catch (error) {
      console.error("Failed to submit response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <Textarea
        placeholder='댓글을 작성해주세요...'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className='min-h-[100px] bg-blue-800/50 border-gray-700 text-gray-200 resize-none'
      />
      <div className='flex justify-end'>
        <Button
          type='submit'
          disabled={isLoading || !content.trim()}
          className='bg-orange-500 hover:bg-orange-600 text-white'
        >
          {isLoading ? "작성 중..." : "댓글 작성"}
        </Button>
      </div>
    </form>
  );
}
