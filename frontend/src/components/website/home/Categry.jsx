import React from 'react'
import Link from 'next/link'
import { fetchProduct } from "@/utils/api";

export default async function Categry({ catagries }) {

  // Fetch the real product count for each category in parallel
  const categoriesWithCount = await Promise.all(
    catagries.map(async (item) => {
      const res = await fetchProduct({ category: item.slug, limit: 1 });
      return { ...item, count: res.meta?.total ?? 0 };
    })
  );

  return (
    <div className="max-w-container mx-auto mb-5 sm:mb-6">
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 pb-2">
        {categoriesWithCount.map((item) => (
          <Link href={`/store?category=${item.slug}`} key={item._id}>
            <div className="bg-white border border-[#E8E0D5] rounded-2xl py-4 px-4 sm:py-5 sm:px-6 cursor-pointer text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

              {/* ✅ Image */}
              <div className="w-10 h-10 sm:w-16 sm:h-10 mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-contain transition-transform duration-300 group-hover:scale-105 w-full h-full"
                />
              </div>

              {/* ✅ Name */}
              <div className="text-[12px] sm:text-[13px] md:text-[14px] text-[#444444] font-medium">
                {item.name}
              </div>

              {/* ✅ Pieces Count */}
              <div className='text-[10px] sm:text-[11px] text-[#6B7280]'>
                {item.count} {item.count === 1 ? "piece" : "pieces"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}