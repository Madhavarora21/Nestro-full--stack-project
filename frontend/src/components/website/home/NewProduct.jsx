import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchProduct } from '@/utils/api'
import { TbTruckDelivery } from "react-icons/tb"
import { MdOutlineCurrencyRupee } from "react-icons/md"
import { IoIosStar } from "react-icons/io"

export default async function NewProduct() {
  const response = await fetchProduct({
    status: true,
    limit: 20,
  })

const allProducts = response?.data || [];

const products = allProducts.filter(
  (product) => product?.newArrival === true
);

  return (
    <div className="max-w-container mx-auto mb-5 sm:mb-10">

    
      <div className="flex items-end mb-5 justify-between">
        <div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-[#8B5E3C] mb-2.5">
            New arrivals
          </div>

          <h2 className="text-[18px] font-normal text-[#1E1E1E] leading-[1.2] tracking-[-0.02em]">
            Just Landed
          </h2>
        </div>

        <Link href="/store">
          <span className="text-[11px] text-[#8B5E3C] cursor-pointer tracking-[0.06em] border-b border-[#C6A27E] hover:border-b-2 transition-all">
            View All
          </span>
        </Link>
      </div>


      {/* ==================== MAIN GRID ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-4">


        {/* ==================== FEATURED ==================== */}
        <div className="bg-[#2C2016] rounded-xl px-5 sm:px-7 pt-6 sm:pt-7 overflow-hidden relative">

          <div className="text-[10px] tracking-[0.18em] uppercase text-[#C6A27E] mb-2.5">
            Featured
          </div>

          <div className="text-[16px] sm:text-[18px] text-[#FAF7F4] font-normal mb-1.5 leading-[1.3]">
            Scandinavian
            <br />
            Dining Set
          </div>

          <div className="text-[11px] sm:text-[12px] text-[#ffffff73] mb-4">
            Ash wood + linen chairs. Set of 4
          </div>

          <div className="text-[14px] sm:text-[16px] text-[#D6BFA7] font-medium mb-6 sm:mb-10 flex items-center">
            <MdOutlineCurrencyRupee />
            1,24,000
          </div>

          <Link href="/store">
            <button className="bg-[#8B5E3C] text-[#FFF8F3] text-[10px] px-4 py-2 mt-6 sm:mt-10 tracking-[0.08em] rounded-sm cursor-pointer border-none font-medium inline-flex items-center gap-2">
              View in store
            </button>
          </Link>

          <div className="relative -top-24 -right-20 sm:-top-28 sm:-right-27 w-50 h-25 opacity-70">

            <div className="absolute left-2.5 top-7.5 w-45 h-12.5 rounded-sm bg-[#C6A27E]/20"></div>

            <div className="absolute left-5 top-5 w-10 h-13 rounded-sm bg-[#C6A27E]/30"></div>

            <div className="absolute left-20 top-5 w-10 h-13 rounded-sm bg-[#C6A27E]/30"></div>

            <div className="absolute left-35 top-5 w-10 h-13 rounded-sm bg-[#C6A27E]/30"></div>

            <div className="absolute left-1.25 top-17.5 w-47.5 h-2 rounded-[3px] bg-[#8B5E3C]/40"></div>

          </div>

        </div>


        {/* ==================== NEW ARRIVAL PRODUCTS ==================== */}
        <div className="flex flex-col gap-4">

          {products.map((item) => {

            const productImage =
              item?.thumbnail ||
              item?.image ||
              "/placeholder.png"

            const productName =
              item?.name ||
              "Product"

          const productPrice = item?.salePrice ?? 0

            const rating =
              Number(item?.rating) > 0
                ? Math.min(Math.round(Number(item.rating)), 5)
                : 5

            return (

              <Link
                key={item?._id}
                href={`/product/${item?._id}`}
                className="bg-white border-[0.5px] border-[#E8E0D5] rounded-xl overflow-hidden cursor-pointer transition-all duration-200 block hover:shadow-md hover:-translate-y-[1px]"
              >

                {/* Product Image */}
                <div className="flex items-center justify-center h-28 sm:h-30 relative bg-[#F7F4F0]">

                  <Image
                    width={320}
                    height={220}
                    src={productImage}
                    alt={productName}
                    className="w-full h-full object-cover"
                  />

                </div>


                {/* Product Details */}
                <div className="p-3">

                  {/* Category */}
                  <div className="text-[9px] tracking-[0.14em] uppercase text-[#6B7280] mb-1">
  {item?.categoryId?.name || "Furniture"}
</div>


                  {/* Product Name */}
                  <div className="text-[#1E1E1E] text-[11px] sm:text-[12px] tracking-[0.08em] font-medium mb-1.5">
                    {productName}
                  </div>


                  {/* Rating + Price */}
                  <div className="flex items-center justify-between">

                    {/* Stars */}
                    <span className="text-[#C6A27E] text-[10px] flex items-center gap-0.5">

                      {[...Array(rating)].map((_, i) => (
                        <IoIosStar key={i} />
                      ))}

                    </span>


                    {/* Price */}
                    <span className="text-[12px] sm:text-[13px] font-medium text-[#1E1E1E] flex items-center">

                      <MdOutlineCurrencyRupee />

                      {Number(productPrice).toLocaleString("en-IN")}

                    </span>

                  </div>

                </div>

              </Link>

            )
          })}


          {/* Fallback */}
          {products.length === 0 && (
            <div className="bg-white border-[0.5px] border-[#E8E0D5] rounded-xl p-5 text-center">

              <div className="text-[11px] text-[#6B7280]">
                New arrival products not available.
              </div>

            </div>
          )}

        </div>


        {/* ==================== RIGHT SIDE ==================== */}
        <div className="flex flex-col gap-4">


          {/* ==================== OFFER ==================== */}
          <div className="bg-[#F5EDE4] rounded-xl p-4 sm:p-5 border-[0.5px] border-[#E8E0D5]">

            <div className="text-[10px] tracking-[0.14em] text-[#8B5E3C] mb-2 uppercase">
              Offer
            </div>

            <div className="text-[13px] sm:text-[14px] text-[#1E1E1E] font-medium mb-1.5">
              First order 15% off
            </div>

            <div className="text-[10px] sm:text-[11px] text-[#6B7280] mb-3">
              Use code Nestro15 at checkout
            </div>

            <Link href="/store">

              <button className="text-[10px] py-2 px-3 sm:px-4 bg-[#8B5E3C] text-white tracking-[0.08em] rounded-sm cursor-pointer border-0 font-medium inline-flex items-center gap-1.75">
                Shop Now
              </button>

            </Link>

          </div>


          {/* ==================== FREE DELIVERY ==================== */}
          <div className="bg-white border-[0.5px] border-[#E8E0D5] rounded-xl p-4 sm:p-5 flex-1">

            <div className="text-[#6B7280] text-[10px] tracking-[0.14em] mb-2.5 uppercase">
              Free delivery
            </div>

            <div className="text-[12px] sm:text-[13px] text-[#1E1E1E] font-medium mb-1 flex items-center flex-wrap">

              On orders above

              <MdOutlineCurrencyRupee />

              50,000

            </div>

            <div className="text-[10px] sm:text-[11px] text-[#6B7280] leading-[1.6]">
              White glove service. Assembly included.
            </div>

            <div className="mt-3 text-[20px] sm:text-[22px] text-[#8B5E3C]">
              <TbTruckDelivery />
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}