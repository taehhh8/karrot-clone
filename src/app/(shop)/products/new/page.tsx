"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddImage from "@/components/common/AddImage";
import PriceInput from "@/components/common/PriceInput";
import { addProduct } from "@/lib/actions/addProduct";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import { useState } from "react";

export default function ProductForm() {
  const [imageUrl, setImageUrl] = useState("");

  const [state, formAction] = useFormState(
    async (prevState: any, formData: FormData) => {
      const name = formData.get("name") as string;
      const priceString = (formData.get("price") as string).replace(/,/g, "");
      const price = parseInt(priceString, 10);
      const url = formData.get("imageUrl") as string;

      const result = await addProduct({ name, price, url });

      if (result.success) {
        redirect("/products");
      }

      return result;
    },
    {
      success: false,
      error: undefined,
    }
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-white py-12 px-4'>
      <div className='max-w-2xl mx-auto'>
        <div className='text-center mb-10'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>상품 등록</h1>
          <p className='text-gray-600'>새로운 상품을 등록해주세요</p>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
          <form action={formAction} className='space-y-8'>
            <div className='max-w-md mx-auto'>
              <AddImage onImageUpload={setImageUrl} />
              <input type='hidden' name='imageUrl' value={imageUrl} />
            </div>

            <div className='space-y-3 max-w-md mx-auto'>
              <Label htmlFor='name' className='text-gray-700 font-medium'>
                상품명
              </Label>
              <Input
                id='name'
                name='name'
                required
                className='
                bg-white 
                border-gray-200 
                text-gray-800 
                py-6 
                rounded-xl
                placeholder:text-gray-400
                focus:border-orange-500 
                focus:ring-orange-500
                hover:border-orange-300
                transition-colors
              '
                placeholder='상품명을 입력하세요'
              />
            </div>

            <div className='space-y-3 max-w-md mx-auto'>
              <Label htmlFor='price' className='text-gray-700 font-medium'>
                가격
              </Label>
              <PriceInput />
            </div>

            <div className='max-w-md mx-auto pt-4'>
              <Button
                type='submit'
                className='
                w-full 
                bg-orange-500 
                hover:bg-orange-600 
                text-white 
                py-6 
                rounded-xl 
                text-lg 
                font-medium 
                transition-colors
                shadow-sm
                hover:shadow-md
              '
              >
                상품 등록하기
              </Button>
            </div>
          </form>
        </div>

        {state.error && (
          <div className='mt-4 p-4 bg-red-50 border border-red-100 rounded-xl'>
            <p className='text-red-600 text-center'>{state.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
