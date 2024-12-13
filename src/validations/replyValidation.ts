import { z } from "zod";

export const replySchema = z.object({
  content: z.string().min(1, "답글은 최소 1자 이상이어야 합니다."),
});
