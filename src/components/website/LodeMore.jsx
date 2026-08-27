"use client";
import { GoArrowRight } from "react-icons/go";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import React, { useState } from "react";

export default function LodeMore() {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [1, 2, 3, "...", 8];

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-5 py-4 px-4 sm:px-6 bg-[#2C2016] rounded-[10px]">
        <div className="text-center sm:text-left">
          <div className="text-[12px] text-[#D6BFA7] tracking-[0.06em]">Limited Time Offer</div>
          <div className="text-[14px] sm:text-[16px] font-normal text-[#FAF7F4] my-1">
            Free White Glove Delivery on orders above ₹75,000
          </div>
        </div>
        <button className="bg-[#8B5E3C] text-[#FFF8F3] text-[11px] px-4 py-2 tracking-[0.08em] rounded-sm cursor-pointer border-none font-medium inline-flex items-center gap-2 whitespace-nowrap">
          Shop Now
          <GoArrowRight className="text-[12px]" />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-7 mb-2">
        <div
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="w-8 h-8 rounded-md flex items-center justify-center text-[12px] cursor-pointer border-[0.5px] border-[#E8E0D5] text-[#444444]"
        >
          <IoChevronBackOutline />
        </div>
        {pages.map((page, index) => (
          <div
            key={index}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            className={`w-8 h-8 rounded-md flex items-center justify-center text-[12px] cursor-pointer border-[0.5px] border-[#8B5E3C] ${
              currentPage === page ? "bg-[#8B5E3C] text-white" : "text-[#444444]"
            }`}
          >
            {page}
          </div>
        ))}
        <div
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 8))}
          className="w-8 h-8 rounded-md flex items-center justify-center text-[12px] cursor-pointer border-[0.5px] border-[#E8E0D5] text-[#444444]"
        >
          <IoChevronForwardOutline />
        </div>
      </div>

      <div className="flex justify-center mt-2.5 pb-8">
        <button className="border-[0.5px] border-[#C6A27E] text-[#8B5E3C] bg-none text-[12px] tracking-widest px-6 sm:px-8 py-2 rounded-sm cursor-pointer uppercase">
          Load More Products
        </button>
      </div>
    </>
  );
}