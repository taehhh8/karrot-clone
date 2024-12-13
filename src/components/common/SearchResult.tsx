"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function SearchResult({ tweet }: { tweet: any }) {
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/tweets/${tweet.id}`)} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/users/${tweet.user.username}`);
                }}
                className="font-semibold text-gray-200 hover:text-orange-400"
              >
                {tweet.user.username}
              </button>
              <span className="text-sm text-gray-400">{new Date(tweet.createdAt).toLocaleDateString("ko-KR")}</span>
            </div>
            <p className="text-gray-200">{tweet.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
