"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function ImageProduct({ product }) {
  console.log("PRODUCT:", product);
console.log("PRODUCT IMAGES:", product?.images);

const images = [
  product?.thumbnail,
  ...(product?.images || []),
].filter(Boolean);

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="pr-0 sm:pr-4 lg:pr-8">
      {/* Main Image - responsive height */}
      <div className="bg-[#EDE8E2] rounded-[14px] h-64 sm:h-80 md:h-96 lg:h-105 flex items-center justify-center mb-3 relative overflow-hidden">
        <Image
          src={activeImage}
          alt="Selected Product"
          fill
          unoptimized
          className="object-contain transition-transform duration-300"
        />
      </div>

      {/* Thumbnails - responsive sizing */}
      <div className="flex gap-2 sm:gap-2.5 lg:gap-3 flex-wrap">
        {images.map((src, index) => (
          <div
            key={index}
            onClick={() => setActiveImage(src)}
            className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-18 lg:h-18 bg-[#F0E8DC] border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 
              ${activeImage === src ? "border-[#8B5E3C]" : "border-transparent"}`}
          >
            <Image
              src={src}
              alt="Thumbnail"
              width={72}
              height={72}
              unoptimized
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}