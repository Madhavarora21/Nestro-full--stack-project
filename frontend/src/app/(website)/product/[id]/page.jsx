
import React from "react";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import ImageProduct from "@/components/website/product/ImageProduct";
import { LuCheck } from "react-icons/lu";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { TbShoppingBag } from "react-icons/tb";
import { ImLoop2 } from "react-icons/im";
import { FaPencilRuler } from "react-icons/fa";
import { TbShieldBolt } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import ProductColor from "@/components/website/product/ProductColor";
import ProductDecription from "@/components/website/product/ProductDecription";
import NewProduct from "@/components/website/product/NewProduct";
import { fetchProductById } from "@/utils/api";

export default async function page({ params }) {
  const { id } = await params;

  
const response = await fetchProductById(id);
const product = response?.data;


  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-medium text-[#1E1E1E]">
          Product not found
        </h1>

        <Link
          href="/store"
          className="bg-[#8B5E3C] text-white px-5 py-2.5 rounded-md text-sm"
        >
          Back to Store
        </Link>
      </div>
    );
  }

  const features = [
    {
      icon: <TbTruckDelivery className="text-[#8B5E3C] text-[16px]" />,
      description: "Free delivery on orders above ₹50,000",
    },
    {
      icon: <ImLoop2 className="text-[#8B5E3C] text-[16px]" />,
      description: "30-day hassle-free returns",
    },
    {
      icon: <FaPencilRuler className="text-[#8B5E3C] text-[16px]" />,
      description: "Free expert assembly included",
    },
    {
      icon: <TbShieldBolt className="text-[#8B5E3C] text-[16px]" />,
      description: "5-year manufacturer warranty",
    },
  ];

  const discount = product.discount || 0;

  return (
    <div>
      {/* Back */}
      <Link href="/store">
        <span className="px-7 pt-4.5 pb-0 flex items-center gap-2 cursor-pointer text-[#6B7280] text-[12px] tracking-[0.04em] w-fit">
          <GoArrowLeft /> Back
        </span>
      </Link>

      <div className="grid grid-cols-2 px-6 pb-10">
        {/* Product Image */}
        <ImageProduct product={product} />

        {/* Product Details */}
        <div className="pl-1 pt-2">

          {/* Category */}
          <div className="text-[10px] text-[#6B7280] uppercase mb-2 tracking-[0.16em]">
            {product.categoryId?.name || "Product"}
          </div>

          {/* Product Name */}
          <h1 className="text-[22px] sm:text-[28px] font-normal mb-2 tracking-[-0.02em] leading-[1.2] text-[#1E1E1E]">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-4">
            <span className="text-[13px] text-[#C6A27E]">
              ★★★★★
            </span>

            <span className="text-[11px] sm:text-[12px] text-[#6B7280]">
              4.9 (48 reviews)
            </span>

            <div className="w-px h-3.5 bg-[#E8E0D5] hidden sm:block"></div>

            <span className="text-[11px] sm:text-[12px] text-[#3B6D11] flex items-center gap-1">
              <LuCheck /> In Stock
            </span>
          </div>

          {/* Price */}
          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-5 pb-5 border-b border-[#E8E0D5]">

            <span className="text-[24px] sm:text-[30px] font-medium text-[#1E1E1E] flex items-center">
              <MdOutlineCurrencyRupee />
              {product.salePrice}
            </span>

            <span className="text-[18px] sm:text-[20px] text-[#6B7280] line-through flex items-center">
              <MdOutlineCurrencyRupee />
              {product.originalPrice}
            </span>

            <span className="text-[11px] sm:text-[12px] text-[#3B6D11] bg-[#EAF3DE] py-0.5 px-2 rounded-[10px] whitespace-nowrap">
              Save {discount}%
            </span>
          </div>

          {/* Product Color */}
          <ProductColor product={product} />

          {/* Quantity */}
          <div className="text-[11px] text-[#1E1E1E] uppercase mb-2.5 tracking-[0.04em] font-medium">
            Quantity
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-5">
            <div className="flex items-center border border-[#E8E0D5] rounded-md overflow-hidden">

              <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center cursor-pointer bg-[#FAFAF9] text-[#444444] text-[14px]">
                -
              </button>

              <div className="w-9 h-8 sm:w-10.5 sm:h-9 flex items-center justify-center border-l border-r border-[#E8E0D5] font-medium text-sm">
                1
              </div>

              <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center cursor-pointer bg-[#FAFAF9] text-[#444444] text-[14px]">
                +
              </button>

            </div>

            <span className="text-[11px] sm:text-[12px] text-[#6B7280]">
              Max 5 per order
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">

            <button className="bg-[#8B5E3C] text-[#FFF8F3] py-2.5 px-4 sm:py-3 sm:px-6 font-medium gap-2 rounded-md text-[12px] cursor-pointer flex flex-1 justify-center items-center">
              <TbShoppingBag />
              Add to Cart
            </button>

            <button className="bg-[#2C2016] text-[#D6BFA7] py-2.5 px-4 sm:py-3 sm:px-6 font-medium gap-2 rounded-md text-[12px] cursor-pointer flex flex-1 justify-center items-center">
              Buy Now
            </button>

          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">

            {features.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 py-2 px-3 bg-[#FAFAF9] rounded-lg border border-[#E8E0D5]"
              >
                {item.icon}

                <div className="text-[11px] sm:text-[12px] text-[#444444] leading-tight">
                  {item.description}
                </div>
              </div>
            ))}

          </div>

          {/* Description */}
          <ProductDecription product={product} />

        </div>
      </div>

      {/* New Products */}
      <NewProduct />
    </div>
  );
}

