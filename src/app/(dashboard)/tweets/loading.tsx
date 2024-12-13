import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-white p-6'>
      <div className='max-w-2xl mx-auto space-y-8'>
        <div className='flex justify-between items-center mb-8'>
          <div className='space-y-2'>
            <Skeleton className='h-8 w-32 bg-gray-200 rounded-lg' />
            <Skeleton className='h-4 w-48 bg-gray-100 rounded-lg' />
          </div>
          <Skeleton className='h-12 w-32 bg-gray-200 rounded-xl' />
        </div>

        {[1, 2, 3].map((i) => (
          <Card key={i} className='bg-white border border-gray-100 rounded-2xl p-6 space-y-6 shadow-sm'>
            <div className='flex items-center gap-4'>
              <Skeleton className='w-12 h-12 rounded-full bg-gray-200' />
              <div className='space-y-2'>
                <Skeleton className='h-5 w-32 bg-gray-200 rounded-lg' />
                <Skeleton className='h-4 w-24 bg-gray-100 rounded-lg' />
              </div>
            </div>
            <Skeleton className='h-20 w-full bg-gray-100 rounded-xl' />
            <div className='flex gap-6'>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-8 w-8 rounded-lg bg-gray-200' />
                <Skeleton className='h-4 w-8 bg-gray-100 rounded-lg' />
              </div>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-8 w-8 rounded-lg bg-gray-200' />
                <Skeleton className='h-4 w-8 bg-gray-100 rounded-lg' />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
