"use client";

import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import ProductCard from "@/components/website/ProductCard";
import { fetchProduct } from "@/utils/api";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        if (query.trim() === "") {
            setProducts([]);
            setSearched(false);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            setLoading(true);
            const res = await fetchProduct({ search: query });
            setProducts(res.data || []);
            setSearched(true);
            setLoading(false);
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <div className="w-full bg-[#F8F5F1] min-h-screen py-6 sm:py-8">
            <div className="max-w-container mx-auto px-4 sm:px-6">

                <h1 className="text-[24px] sm:text-[28px] font-normal text-[#1E1E1E] tracking-[-0.02em] mb-5">
                    Search Products
                </h1>

                <div className="relative mb-8 max-w-xl">
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-lg" />
                    <input
                        type="text"
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for sofas, chairs, tables..."
                        className="w-full py-3 pl-10 pr-4 border border-[#E8E0D5] bg-white rounded-md text-[13px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition"
                    />
                </div>

                {loading && (
                    <div className="text-[13px] text-[#6B7280]">Searching...</div>
                )}

                {!loading && searched && products.length === 0 && (
                    <div className="bg-white border border-[#E8E0D5] rounded-xl p-10 text-center">
                        <p className="text-[#1E1E1E] font-medium mb-1">No products found</p>
                        <p className="text-[#6B7280] text-[13px]">
                            Try searching with a different keyword.
                        </p>
                    </div>
                )}

                {!loading && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                showAddToCart={false}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}