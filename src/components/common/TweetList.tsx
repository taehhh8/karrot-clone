"use client";

import { getTweets } from "@/lib/actions/getTweets";
import { toggleLike } from "@/lib/actions/toggleLike";
import { addResponse } from "@/lib/actions/addResponse";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Heart, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Tweet } from "@/types/dashboard";

export default function TweetList() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [content, setContent] = useState("");
  const [selectedTweetId, setSelectedTweetId] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const data = await fetch("/api/getTweets");
        console.log(data);
        setTweets(await data.json());
      } catch (error) {
        toast({
          variant: "destructive",
          title: "오류",
          description: "트윗을 불러오는 중 오류가 발생했습니다.",
        });
      }
    };

    fetchTweets();
  }, [toast]);

  const handleLike = async (tweetId: number) => {
    try {
      const result = await toggleLike(tweetId);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "오류",
          description: result.error,
        });
      }
      // 좋아요 후 트윗 목록 새로고침
      const updatedTweets = await getTweets();
      setTweets(updatedTweets);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "오류",
        description: "좋아요 처리 중 오류가 발생했습니다.",
      });
    }
  };

  const handleResponse = async (tweetId: number) => {
    if (!content.trim()) {
      toast({
        variant: "destructive",
        title: "오류",
        description: "내용을 입력해주세요.",
      });
      return;
    }

    try {
      const result = await addResponse(tweetId, content);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "오류",
          description: result.error,
        });
      } else {
        setContent("");
        setSelectedTweetId(null);
        // 답글 작성 후 트윗 목록 새로고침
        const updatedTweets = await getTweets();
        setTweets(updatedTweets);
        toast({
          title: "성공",
          description: "답글이 작성되었습니다.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "오류",
        description: "답글 작성 중 오류가 발생했습니다.",
      });
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4'>
      <div className='max-w-2xl mx-auto space-y-4'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold text-gray-200'>전체 트윗</h1>
          <Link href='/tweets/write'>
            <Button className='bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white'>
              <PenSquare className='w-4 h-4 mr-2' />
              트윗 작성
            </Button>
          </Link>
        </div>

        {tweets.map((tweet) => (
          <Card key={tweet.id} className='bg-gray-800/70 backdrop-blur-sm shadow-xl border-gray-700'>
            <CardHeader className='flex flex-row items-center gap-4'>
              <Avatar className='w-10 h-10 border border-orange-400/20'>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tweet.user.username}`}
                  alt={tweet.user.username}
                />
                <AvatarFallback className='bg-gray-700 text-orange-400'>{tweet.user.username[0]}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <Link
                  href={`/profile/${tweet.user.id}`}
                  className='font-semibold text-gray-200 hover:text-orange-400 transition-colors'
                >
                  {tweet.user.username}
                </Link>
                <span className='text-sm text-gray-400'>
                  {formatDistanceToNow(new Date(tweet.createdAt), {
                    addSuffix: true,
                    locale: ko,
                  })}
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <p className='text-gray-300 whitespace-pre-wrap'>{tweet.content}</p>
            </CardContent>

            <CardFooter className='flex gap-4 text-gray-400'>
              <button
                onClick={() => handleLike(tweet.id)}
                className='flex items-center gap-1 hover:text-orange-400 transition-colors'
              >
                <Heart className='w-5 h-5' />
                <span className='text-sm'>{tweet.likes.length}</span>
              </button>

              <Dialog
                open={selectedTweetId === tweet.id}
                onOpenChange={(open) => {
                  setSelectedTweetId(open ? tweet.id : null);
                  if (!open) setContent("");
                }}
              >
                <DialogTrigger asChild>
                  <button className='flex items-center gap-1 hover:text-orange-400 transition-colors'>
                    <MessageCircle className='w-5 h-5' />
                    <span className='text-sm'>{tweet.responses.length}</span>
                  </button>
                </DialogTrigger>
                <DialogContent className='bg-gray-800 border-gray-700'>
                  <DialogHeader>
                    <DialogTitle className='text-gray-200'>답글 작성</DialogTitle>
                  </DialogHeader>
                  <div className='space-y-4'>
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder='답글을 작성해주세요'
                      className='min-h-[100px] bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-400 focus-visible:ring-orange-400'
                    />
                    <Button
                      onClick={() => handleResponse(tweet.id)}
                      className='w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white'
                    >
                      답글 작성
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
