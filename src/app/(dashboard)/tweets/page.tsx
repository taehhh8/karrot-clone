import { getTweets } from "@/lib/actions/getTweets";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PenSquare, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export default async function Tweets() {
  // 딜레이를 위한 유틸리티 함수
  // const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  // await delay(5000);
  const tweets = await getTweets();

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-white p-6'>
      <div className='max-w-2xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>전체 트윗</h1>
            <p className='text-gray-600 mt-2'>이웃들과 소통하는 공간입니다</p>
          </div>
          <Link href='/tweets/write'>
            <Button className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-6 rounded-xl font-medium'>
              <PenSquare className='w-5 h-5 mr-2' />
              트윗 작성
            </Button>
          </Link>
        </div>

        <div className='space-y-6'>
          {tweets.map((tweet) => (
            <Link href={`/tweets/${tweet.id}`} key={tweet.id} className='block'>
              <Card className='bg-white border border-gray-100 hover:border-orange-500 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md'>
                <CardHeader className='flex flex-row items-center gap-4 pb-4'>
                  <Avatar className='w-12 h-12 border-2 border-orange-100 ring-2 ring-orange-500/10'>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tweet.user.username}`}
                      alt={tweet.user.username}
                    />
                    <AvatarFallback className='bg-orange-100 text-orange-500 font-medium'>
                      {tweet.user.username[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col'>
                    <p className='font-semibold text-gray-800'>{tweet.user.username}</p>
                    <span className='text-sm text-gray-500'>
                      {formatDistanceToNow(new Date(tweet.createdAt), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className='pt-0'>
                  <p className='text-gray-700 whitespace-pre-wrap mb-6 leading-relaxed'>{tweet.content}</p>
                  <div className='flex gap-6 text-gray-500'>
                    <div className='flex items-center gap-2 group cursor-pointer'>
                      <Heart className='w-5 h-5 group-hover:text-red-500 transition-colors' />
                      <span className='text-sm font-medium group-hover:text-red-500 transition-colors'>
                        {tweet.likes?.length || 0}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 group cursor-pointer'>
                      <MessageCircle className='w-5 h-5 group-hover:text-orange-500 transition-colors' />
                      <span className='text-sm font-medium group-hover:text-orange-500 transition-colors'>
                        {tweet.responses?.length || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
