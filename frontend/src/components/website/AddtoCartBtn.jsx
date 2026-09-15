
"use client";

import { addToCart } from "@/redex/features/CartSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddtoCartBtn({ product }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
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
                        qty: 1,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to add product to cart");
                return;
            }

            // Update Redux cart
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

            alert("Product added to cart");
        } catch (error) {
            console.error("ADD TO CART ERROR:", error);
            alert("Something went wrong while adding to cart");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            {/* Product Name */}
            <div className="text-[12px] sm:text-[13px] font-medium leading-tight text-[#1E1E1E]">
                {product.name}
            </div>

            {product.stock ? (
                <button
                    onClick={handleAddToCart}
                    disabled={loading}
                    className="bg-[#8B5E3C] border border-[#8B5E3C] text-white text-[10px] sm:text-[11px] px-2 py-1 rounded-sm tracking-[0.08em] hover:bg-[#7a4f32] transition whitespace-nowrap cursor-pointer disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add to cart"}
                </button>
            ) : (
                <span className="border border-[#8B5E3C] text-[#87420d] text-[10px] sm:text-[11px] font-medium px-2 py-1 rounded-sm shadow-sm tracking-[0.08em] whitespace-nowrap">
                    Out of stock
                </span>
            )}
        </div>
    );
}

