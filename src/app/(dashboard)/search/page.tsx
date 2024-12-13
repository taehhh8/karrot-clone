import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SearchResult from "@/components/common/SearchResult";
import { SearchPageProps } from "@/types/dashboard";
import { searchTweets } from "@/lib/actions/searchTweets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "당근 마켓 | 검색",
  description: "당근 마켓 검색 페이지",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const tweets = query ? await searchTweets(query) : [];

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-white py-12 px-4'>
      <div className='max-w-2xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>트윗 검색</h1>
          <p className='text-gray-600'>원하는 트윗이나 작성자를 검색해보세요</p>
        </div>

        <div className='relative mb-12'>
          <form>
            <Input
              name='q'
              defaultValue={query}
              placeholder='검색어를 입력하세요...'
              className='
              w-full
              pl-12
              pr-6
              py-6
              bg-white 
              border-gray-200 
              text-gray-800 
              placeholder:text-gray-400 
              rounded-2xl
              shadow-sm
              hover:border-orange-300
              focus:border-orange-500 
              focus:ring-orange-500
              transition-all
            '
            />
          </form>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
        </div>

        {query && (
          <div className='bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm'>
            <h2 className='text-gray-800 font-medium flex items-center gap-2'>
              <span className='text-orange-500 font-bold'>&ldquo;{query}&rdquo;</span>
              <span>검색 결과</span>
              <span className='bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-sm font-bold'>
                {tweets.length}개
              </span>
            </h2>
          </div>
        )}

        <div className='space-y-4'>
          {tweets.map((tweet) => (
            <SearchResult key={tweet.id} tweet={tweet} />
          ))}

          {query && tweets.length === 0 && (
            <div className='bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm'>
              <p className='text-gray-600'>
                <span className='block text-4xl mb-4'>🔍</span>
                검색 결과가 없습니다
              </p>
              <p className='text-gray-500 text-sm mt-2'>다른 검색어로 다시 시도해보세요</p>
            </div>
          )}
        </div>

        {!query && (
          <div className='text-center text-gray-500 mt-12'>
            <span className='block text-4xl mb-4'>🔍</span>
            <p>검색어를 입력하면 결과가 여기에 표시됩니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
