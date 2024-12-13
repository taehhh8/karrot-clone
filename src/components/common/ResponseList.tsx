import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface Response {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    username: string;
  };
}

interface ResponseListProps {
  responses: Response[];
}

export default function ResponseList({ responses }: ResponseListProps) {
  return (
    <div className="space-y-4">
      {responses.map((response) => (
        <Card key={response.id} className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center gap-4 py-3">
            <Avatar className="w-8 h-8 border border-orange-400/20">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${response.user.username}`} alt={response.user.username} />
              <AvatarFallback className="bg-gray-700 text-orange-400">{response.user.username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Link href={`/profile/${response.user.id}`} className="font-semibold text-gray-200 hover:text-orange-400 transition-colors">
                {response.user.username}
              </Link>
              <span className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(response.createdAt), {
                  addSuffix: true,
                  locale: ko,
                })}
              </span>
            </div>
          </CardHeader>
          <CardContent className="py-3">
            <p className="text-gray-300 text-sm whitespace-pre-wrap">{response.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
