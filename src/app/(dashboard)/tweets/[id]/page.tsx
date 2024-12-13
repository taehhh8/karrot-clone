import { getTweetById } from "@/lib/actions/getTweets";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { PageProps } from "@/types/dashboard";
import LikeButton from "@/components/common/LikeButton";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";
import ResponseForm from "@/components/common/ResponseForm";
import ResponseList from "@/components/common/ResponseList";

export default async function TweetDetail({ params }: PageProps) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const tweet = await getTweetById(params.id);

  if (!tweet) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center'>
        <p className='text-gray-600 text-lg'>트윗을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-white p-6'>
      <div className='max-w-2xl mx-auto space-y-8'>
        <Card className='bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
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
              <Link
                href={`/users/${tweet.user.username}`}
                className='font-semibold text-gray-800 hover:text-orange-500 transition-colors'
              >
                {tweet.user.username}
              </Link>
              <span className='text-sm text-gray-500'>
                {formatDistanceToNow(new Date(tweet.createdAt), {
                  addSuffix: true,
                  locale: ko,
                })}
              </span>
            </div>
          </CardHeader>

          <CardContent className='pt-0'>
            <p className='text-gray-700 whitespace-pre-wrap leading-relaxed text-lg'>{tweet.content}</p>
          </CardContent>

          <CardFooter className='flex gap-6 border-t border-gray-100 mt-6 pt-6'>
            <LikeButton
              initialLikes={tweet.likes?.length || 0}
              tweetId={Number(tweet.id)}
              initialIsLiked={tweet.likes?.some((like) => like.userId === session.user?.id)}
            />
            <Button variant='ghost' className='text-gray-500 hover:text-orange-500 hover:bg-orange-50'>
              <MessageCircle className='w-5 h-5 mr-2' />
              <span className='font-medium'>{tweet.responses?.length || 0}</span>
            </Button>
          </CardFooter>
        </Card>

        <Card className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm'>
          <h2 className='text-xl font-bold text-gray-800 mb-6'>댓글 작성</h2>
          <ResponseForm tweetId={Number(params.id)} />
        </Card>

        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-gray-800'>
              댓글 목록
              <span className='text-orange-500 ml-2'>{tweet.responses?.length || 0}</span>
            </h2>
          </div>
          <div className='bg-white border border-gray-100 rounded-2xl shadow-sm'>
            <ResponseList responses={tweet.responses || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
