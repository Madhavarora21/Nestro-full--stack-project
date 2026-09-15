"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redex/features/CartSlice";
import { TbShoppingBag } from "react-icons/tb";

export default function ProductActions({ product }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const increaseQuantity = () => {
        setQuantity((prev) => Math.min(5, prev + 1));
    };

    const addProductToCart = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}cart/add-to-cart`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        productId: product._id,
                        qty: quantity,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.log("ADD TO CART RESPONSE:", data);
                alert(data.message || "Failed to add product to cart");
                return;
            }

            // Redux cart update
            for (let i = 0; i < quantity; i++) {
                dispatch(
                    addToCart({
                        id: product._id,
                        name: product.name,
                        salePrice: product.salePrice,
                        originalPrice: product.originalPrice,
                        discount: product.discount,
                        thumbnail: product.thumbnail,
                        qty: 1,
                    })
                );
            }

            alert("Product added to cart");
        } catch (error) {
            console.error("ADD TO CART ERROR:", error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleBuyNow = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}cart/add-to-cart`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        productId: product._id,
                        qty: quantity,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to add product");
                return;
            }

            // Redux update
            for (let i = 0; i < quantity; i++) {
                dispatch(
                    addToCart({
                        id: product._id,
                        name: product.name,
                        salePrice: product.salePrice,
                        originalPrice: product.originalPrice,
                        discount: product.discount,
                        thumbnail: product.thumbnail,
                        qty: 1,
                    })
                );
            }

            // Go to checkout
            router.push("/checkout");
        } catch (error) {
            console.error("BUY NOW ERROR:", error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Quantity */}
            <div className="text-[11px] text-[#1E1E1E] uppercase mb-2.5 tracking-[0.04em] font-medium">
                Quantity
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="flex items-center border border-[#E8E0D5] rounded-md overflow-hidden">

                    <button
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center cursor-pointer bg-[#FAFAF9] text-[#444444] text-[14px] disabled:opacity-40"
                    >
                        -
                    </button>

                    <div className="w-9 h-8 sm:w-10.5 sm:h-9 flex items-center justify-center border-l border-r border-[#E8E0D5] font-medium text-sm">
                        {quantity}
                    </div>

                    <button
                        onClick={increaseQuantity}
                        disabled={quantity >= 5}
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center cursor-pointer bg-[#FAFAF9] text-[#444444] text-[14px] disabled:opacity-40"
                    >
                        +
                    </button>

                </div>

                <span className="text-[11px] sm:text-[12px] text-[#6B7280]">
                    Max 5 per order
                </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">

                <button
                    onClick={addProductToCart}
                    disabled={loading}
                    className="bg-[#8B5E3C] text-[#FFF8F3] py-2.5 px-4 sm:py-3 sm:px-6 font-medium gap-2 rounded-md text-[12px] cursor-pointer flex flex-1 justify-center items-center disabled:opacity-50"
                >
                    <TbShoppingBag />
                    {loading ? "Adding..." : "Add to Cart"}
                </button>

                <button
                    onClick={handleBuyNow}
                    disabled={loading}
                    className="bg-[#2C2016] text-[#D6BFA7] py-2.5 px-4 sm:py-3 sm:px-6 font-medium gap-2 rounded-md text-[12px] cursor-pointer flex flex-1 justify-center items-center disabled:opacity-50"
                >
                    {loading ? "Please wait..." : "Buy Now"}
                </button>

            </div>
        </>
    );
}