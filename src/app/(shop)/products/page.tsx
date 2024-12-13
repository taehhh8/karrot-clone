import Image from "next/image";
import { formatPrice } from "@/utils";
import { getProducts } from "@/lib/actions/getProducts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ShoppingCart, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-white'>
      <div className='container mx-auto py-12 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex justify-between items-center mb-12'>
            <div>
              <h1 className='text-3xl font-bold text-gray-800'>상품 목록</h1>
              <p className='text-gray-600 mt-2'>다양한 중고 물품을 구경해보세요</p>
            </div>
            <Link href='/products/new'>
              <Button className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-6 rounded-xl font-medium'>
                <Plus className='h-5 w-5 mr-2' />
                상품 등록
              </Button>
            </Link>
          </div>

          <div className='grid grid-cols-1 gap-6'>
            {products.map((product) => (
              <Card
                key={product.id}
                className='bg-white border-gray-100 hover:border-orange-500 transition-all duration-300 hover:shadow-md rounded-2xl overflow-hidden'
              >
                <CardContent className='p-0 flex flex-col md:flex-row'>
                  <div className='relative h-72 md:h-64 md:w-64 flex-shrink-0'>
                    <Image
                      src={product.url}
                      alt={product.name}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, 256px'
                    />
                    <Badge className='absolute top-4 right-4 bg-orange-500 px-3 py-1 rounded-full text-white font-medium'>
                      NEW
                    </Badge>
                  </div>

                  <div className='p-6 flex-grow flex flex-col justify-between'>
                    <div>
                      <h3 className='text-xl font-semibold text-gray-800 mb-3 line-clamp-1'>{product.name}</h3>
                      <div className='flex flex-col gap-3 text-gray-600 text-sm'>
                        <div className='flex items-center gap-2'>
                          <Calendar className='h-4 w-4 text-orange-500' />
                          <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span>판매자:</span>
                          <span className='text-orange-500 font-medium'>{product.seller.username}</span>
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6'>
                      <p className='text-2xl font-bold text-gray-900'>
                        {formatPrice(product.price)}
                        <span className='text-gray-600 text-lg ml-1'>원</span>
                      </p>
                      <div className='flex gap-3 w-full md:w-auto'>
                        <Button
                          size='lg'
                          variant='outline'
                          className='flex-1 md:flex-none border-gray-200 text-gray-700 hover:bg-gray-50'
                        >
                          <Eye className='h-4 w-4 mr-2' />
                          상세보기
                        </Button>
                        <Button size='lg' className='flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 text-white'>
                          <ShoppingCart className='h-4 w-4 mr-2' />
                          구매하기
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
