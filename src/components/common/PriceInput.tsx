"use client";

import { Input } from "@/components/ui/input";

export default function PriceInput() {
  const formatPrice = (value: string) => {
    const number = value.replace(/[^\d]/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPrice(e.target.value);
    e.target.value = formatted;
  };

  return (
    <div className='relative'>
      <Input
        id='price'
        name='price'
        type='text'
        required
        className='
        bg-white 
        border-gray-200 
        text-gray-800 
        pr-12
        py-6
        rounded-xl
        placeholder:text-blue-400
        focus:border-orange-500 
        focus:ring-orange-500
        hover:border-orange-300
        transition-colors
      '
        placeholder='가격을 입력하세요'
        onChange={handlePriceChange}
        inputMode='numeric'
      />
      <span
        className='
      absolute 
      right-4 
      top-1/2 
      -translate-y-1/2 
      text-gray-500
      font-medium
      bg-gray-50
      px-2
      py-1
      rounded-lg
      text-sm
    '
      >
        원
      </span>
    </div>
  );
}
