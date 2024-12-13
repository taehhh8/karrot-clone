"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toggleLike } from "@/lib/actions/toggleLike";

interface LikeButtonProps {
  initialLikes: number;
  tweetId: number;
  initialIsLiked?: boolean;
}

export default function LikeButton({ initialLikes, tweetId, initialIsLiked = false }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    try {
      setIsLoading(true);
      const result = await toggleLike(tweetId);

      if (result.error) {
        console.error(result.error);
        return;
      }

      setIsLiked(!isLiked);
      setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Failed to like tweet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="ghost" className={`text-gray-400 ${isLiked ? "text-red-500 hover:text-red-600" : "hover:text-red-500"}`} onClick={handleLike} disabled={isLoading}>
      <Heart className={`w-5 h-5 mr-1 ${isLiked ? "fill-current" : ""}`} />
      <span>{likes}</span>
    </Button>
  );
}
