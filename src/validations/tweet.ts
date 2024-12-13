import { z } from "zod";

export const tweetSchema = z.object({
  content: z.string().min(1, "트윗 내용은 필수입니다").max(280, "트윗은 최대 280자까지 가능합니다"),
}); 