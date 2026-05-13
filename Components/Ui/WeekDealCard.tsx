"use client";

import React from "react";
import Image from "next/image";

interface WeekDealCardProps {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  discount_percentage?: number;
  original_price?: number;
  sale_price?: number;
  onClick: () => void;
}

export default function WeekDealCard({
  id,
  title,
  description,
  image,
  discount_percentage,
  original_price,
  sale_price,
  onClick,
}: WeekDealCardProps) {
  const displayImage = image || "/Images/categories/Sweets.jpeg";

  return (
    <div className="bg-[#660033] hover:shadow-2xl transition-all transform overflow-hidden flex flex-col rounded-xl sm:rounded-2xl cursor-pointer" onClick={onClick}>
      <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 bg-white">
        <Image src={displayImage} alt={title} fill className="object-cover" />
      </div>

      <div className="p-3 sm:p-4 text-center bg-[#660033]">
        <h3 className="font-semibold text-white text-sm sm:text-base md:text-lg line-clamp-2">{title}</h3>
        {discount_percentage ? (
          <div className="mt-2">
            <span className="inline-block bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-{discount_percentage}%</span>
          </div>
        ) : null}

        <div className="mt-2 flex items-center justify-center gap-2">
          {original_price ? (
            <span className="text-white text-xs line-through opacity-80">£{original_price.toFixed(2)}</span>
          ) : null}
          {sale_price ? (
            <span className="text-white font-bold">£{sale_price.toFixed(2)}</span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="mt-3 inline-block bg-white text-[#660033] font-semibold px-4 py-2 rounded-lg"
        >
          View Deal
        </button>
      </div>
    </div>
  );
}
