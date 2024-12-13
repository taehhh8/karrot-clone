import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4'>
      <div className='max-w-2xl mx-auto space-y-6'>
        <div className='flex justify-between items-center mb-6'>
          <Skeleton className='h-8 w-32' />
          <Skeleton className='h-10 w-24' />
        </div>

        {[1, 2, 3].map((i) => (
          <Card key={i} className='bg-gray-800/70 p-6 space-y-4'>
            <div className='flex items-center gap-4'>
              <Skeleton className='w-10 h-10 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-3 w-16' />
              </div>
            </div>
            <Skeleton className='h-16 w-full' />
            <div className='flex gap-4'>
              <Skeleton className='h-4 w-12' />
              <Skeleton className='h-4 w-12' />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
