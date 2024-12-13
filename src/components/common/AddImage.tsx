"use client";

import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddImageProps {
  onImageUpload: (url: string) => void;
}

export default function AddImage({ onImageUpload }: AddImageProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // 이미지 업로드
      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("이미지 업로드 실패");
        }

        const data = await response.json();
        onImageUpload(data.url);
      } catch (error) {
        console.error("이미지 업로드 중 오류:", error);
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  return (
    <div className='space-y-3'>
      <Label htmlFor='image' className='text-gray-700 font-medium'>
        상품 이미지
      </Label>
      <div className='flex flex-col items-center gap-4'>
        <div
          className={`
          w-full 
          h-64 
          relative 
          rounded-2xl 
          overflow-hidden 
          transition-all 
          duration-300
          ${
            imagePreview
              ? "border-2 border-orange-500 shadow-md"
              : "border-3 border-dashed border-gray-200 bg-gray-50 hover:border-orange-300"
          }
        `}
        >
          {imagePreview ? (
            <div className='relative w-full h-full group'>
              <Image src={imagePreview} alt='Product preview' fill className='object-cover' />
              <label
                htmlFor='image'
                className='
                  absolute 
                  inset-0 
                  flex 
                  flex-col 
                  items-center 
                  justify-center 
                  bg-black/50 
                  opacity-0 
                  group-hover:opacity-100 
                  transition-opacity 
                  cursor-pointer
                  text-white
                '
              >
                <ImagePlus className='w-8 h-8 mb-2' />
                <span>이미지 변경하기</span>
              </label>
            </div>
          ) : (
            <label
              htmlFor='image'
              className='
                w-full 
                h-full 
                flex 
                flex-col 
                items-center 
                justify-center 
                cursor-pointer 
                text-gray-400 
                hover:text-orange-500 
                transition-colors
              '
            >
              <div className='p-4 bg-white rounded-full shadow-sm mb-3'>
                <ImagePlus className='w-8 h-8' />
              </div>
              <span className='font-medium'>이미지를 선택하세요</span>
              <span className='text-sm text-gray-400 mt-1'>클릭하여 이미지를 업로드하세요</span>
            </label>
          )}
        </div>
        <Input id='image' type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
      </div>
    </div>
  );
}
