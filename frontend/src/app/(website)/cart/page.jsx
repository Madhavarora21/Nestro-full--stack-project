"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { TbTrash, TbShoppingBag } from "react-icons/tb";
import { GoArrowLeft } from "react-icons/go";
import { ImLoop2 } from "react-icons/im";
import { FaPencilRuler } from "react-icons/fa";
import { TbShieldBolt, TbTruckDelivery } from "react-icons/tb";

export default function CartPage() {
  // Sample cart items – replace with actual state/context later
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Ember Velvet 3-Seater",
      variant: "Walnut Brown · 3-Seater",
      price: 89000,
      quantity: 1,
      image: "/selles/sofa.png",
      inStock: true,
    },
    {
      id: 2,
      name: "Nordic Oak Bookcase",
      variant: "Natural Oak",
      price: 42800,
      quantity: 1,
      image: "/selles/storage.png",
      inStock: true,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + deliveryCharge;

  const features = [
    { icon: <TbTruckDelivery />, text: "Free delivery on orders above ₹50,000" },
    { icon: <ImLoop2 />, text: "30-day hassle-free returns" },
    { icon: <FaPencilRuler />, text: "Free expert assembly included" },
    { icon: <TbShieldBolt />, text: "5-year manufacturer warranty" },
  ];

  return (
    <div className="w-full bg-[#F8F5F1] min-h-screen py-6 sm:py-8">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Back link */}
        <Link href="/store">
          <div className="flex items-center gap-2 text-[#6B7280] text-[12px] tracking-[0.04em] mb-5 hover:text-[#8B5E3C] transition">
            <GoArrowLeft />
            Continue Shopping
          </div>
        </Link>

        <h1 className="text-[24px] sm:text-[28px] font-normal text-[#1E1E1E] tracking-[-0.02em] mb-6">
          Shopping Cart
          <span className="text-[14px] text-[#6B7280] ml-2 font-normal">
            ({cartItems.length} items)
          </span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-[#E8E0D5] rounded-xl p-12 text-center">
            <div className="text-[#C6A27E] text-5xl mb-4">
              <TbShoppingBag className="mx-auto" />
            </div>
            <h2 className="text-xl font-medium text-[#1E1E1E] mb-2">
              Your cart is empty
            </h2>
            <p className="text-[#6B7280] text-sm mb-6">
              Looks like you haven't added anything yet.
            </p>
            <Link
              href="/store"
              className="inline-block bg-[#8B5E3C] text-white py-2 px-6 rounded-md text-sm hover:bg-[#7a4f32] transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Column */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-[#E8E0D5] rounded-xl overflow-hidden">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-[#FAFAF9] border-b border-[#E8E0D5] text-[11px] uppercase text-[#6B7280] tracking-wide">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border-b border-[#E8E0D5] last:border-0"
                  >
                    {/* Product image & info */}
                    <div className="flex gap-4 flex-1">
                      <div className="w-20 h-20 bg-[#F5F0EB] rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[13px] font-medium text-[#1E1E1E]">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-[#6B7280] mt-0.5">
                          {item.variant}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[11px] text-[#3b6d11] flex items-center gap-1">
                            ✓ In Stock
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#6B7280] hover:text-[#8B5E3C] transition cursor-pointer hover:underline flex items-center gap-1 text-[11px]"
                          >
                            <TbTrash /> Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price - mobile & desktop */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                      <div className="sm:w-24 text-left sm:text-center">
                        <span className="text-[12px] text-[#6B7280] sm:hidden block text-left">Price:</span>
                        <span className="text-[13px] font-medium text-[#1E1E1E] flex items-center">
                          <MdOutlineCurrencyRupee /> {item.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Quantity selector */}
                      <div className="sm:w-28 text-center">
                        <span className="text-[12px] text-[#6B7280] sm:hidden block">Qty:</span>
                        <div className="flex items-center border border-[#E8E0D5] rounded-md overflow-hidden w-fit sm:mx-auto">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center bg-[#FAFAF9] text-[#444] text-sm"
                          >
                            -
                          </button>
                          <div className="w-8 h-7 flex items-center justify-center border-x border-[#E8E0D5] text-sm font-medium">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center bg-[#FAFAF9] text-[#444] text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="sm:w-24 text-right sm:text-center">
                        <span className="text-[12px] text-[#6B7280] sm:hidden block">Total:</span>
                        <span className="text-[14px] font-semibold text-[#1E1E1E] flex items-center justify-end sm:justify-center">
                          <MdOutlineCurrencyRupee /> {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features / trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 py-2 px-2 bg-white border border-[#E8E0D5] rounded-lg"
                  >
                    <div className="text-[#8B5E3C] text-lg shrink-0">{feature.icon}</div>
                    <div className="text-[9px] sm:text-[10px] text-[#444] leading-tight">
                      {feature.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary - Right Column */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-[#E8E0D5] rounded-xl p-5 sticky top-24">
                <h2 className="text-[16px] font-medium text-[#1E1E1E] pb-3 border-b border-[#E8E0D5] mb-4">
                  Order Summary
                </h2>

                <div className="space-y-2.5">
                  <div className="flex justify-between text-[13px] text-[#444]">
                    <span>Subtotal</span>
                    <span className="flex items-center">
                      <MdOutlineCurrencyRupee /> {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[13px] text-[#444]">
                    <span>Delivery</span>
                    {deliveryCharge === 0 ? (
                      <span className="text-[#3B6D11]">Free</span>
                    ) : (
                      <span className="flex items-center">
                        <MdOutlineCurrencyRupee /> {deliveryCharge.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between text-[13px] text-[#444] border-b border-[#E8E0D5] pb-3">
                    <span>Discount</span>
                    <span className="text-[#3B6D11]">- ₹0</span>
                  </div>
                  <div className="flex justify-between text-[16px] font-semibold text-[#1E1E1E] pt-2">
                    <span>Total</span>
                    <span className="flex items-center">
                      <MdOutlineCurrencyRupee /> {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Promo code */}
                <div className="mt-5 mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 border border-[#E8E0D5] rounded-md px-3 py-2 text-[12px] bg-white focus:outline-none focus:border-[#8B5E3C]"
                    />
                    <button className="bg-[#2C2016] text-[#D6BFA7] px-4 py-2 rounded-md text-[11px] hover:bg-[#3A2A1E] transition">
                      Apply
                    </button>
                  </div>
                </div>

                <Link href="/checkout">
                  <button className="w-full bg-[#8B5E3C] text-white py-3 rounded-md text-[13px] font-medium tracking-wide hover:bg-[#7a4f32] transition">
                    Proceed to Checkout
                  </button>
                </Link>

                <div className="mt-4 text-center text-[10px] text-[#6B7280]">
                  Free delivery on orders above ₹50,000 • 30-day returns
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}