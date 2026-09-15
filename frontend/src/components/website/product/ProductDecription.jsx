"use client";
import React, { useState } from "react";

const REVIEW_POOL = [
  {
    name: "Priya R.",
    city: "Mumbai",
    comment: "Absolutely stunning. It looked even better in person and arrived perfectly finished.",
  },
  {
    name: "Arjun S.",
    city: "Delhi",
    comment: "Worth every rupee. The build quality feels premium and it fits our space perfectly.",
  },
  {
    name: "Meera K.",
    city: "Bengaluru",
    comment: "Exactly as pictured. Delivery was smooth and assembly was quick.",
  },
  {
    name: "Rohan T.",
    city: "Pune",
    comment: "Great quality for the price. Been using it for a few weeks now, holding up really well.",
  },
  {
    name: "Ananya D.",
    city: "Jaipur",
    comment: "Loved the finish and texture. It's become the centerpiece of the room.",
  },
  {
    name: "Kabir M.",
    city: "Chandigarh",
    comment: "Sturdy, well-made, and looks even better than the photos. Highly recommend.",
  },
  {
    name: "Isha V.",
    city: "Hyderabad",
    comment: "Exceeded expectations. Packaging was careful and setup was hassle-free.",
  },
  {
    name: "Dev P.",
    city: "Ahmedabad",
    comment: "Solid craftsmanship. Matches the description perfectly and feels durable.",
  },
];

// Simple deterministic hash so the same product always shows the same reviews
function getReviewsForProduct(product) {
  const key = product?._id || product?.name || "default";
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) % REVIEW_POOL.length;
  }

  const first = REVIEW_POOL[hash];
  const second = REVIEW_POOL[(hash + 3) % REVIEW_POOL.length];

  return [first, second];
}

export default function ProductDecription({ product }) {
  const [activeTab, setActiveTab] = useState("Description");

  const reviews = getReviewsForProduct(product);

  const specs = [
    { label: "Category", value: product?.categoryId?.name || "—" },
    {
      label: "Dimensions",
      value:
        product?.dimensions?.width &&
        product?.dimensions?.height &&
        product?.dimensions?.depth
          ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm (W×H×D)`
          : "—",
    },
    { label: "Material", value: product?.material || "—" },
    { label: "Color", value: product?.color || "—" },
    {
      label: "Weight",
      value: product?.weight ? `${product.weight} kg` : "—",
    },
    {
      label: "Availability",
      value: product?.stock ? "In Stock" : "Out of Stock",
    },
    { label: "Assembly Required", value: "Yes (included free)" },
    { label: "Warranty", value: "5 Years" },
  ];

  const tabs = [
    {
      name: "Description",
      content: (
        <div className="text-[11px] sm:text-[12px] text-[#444444] leading-[1.8]">
          {product?.description || product?.shortDescription || "No description available for this product."}
        </div>
      ),
    },
    {
      name: "Specification",
      content: (
        <div className="text-[11px] sm:text-[12px] text-[#444444] leading-[1.8]">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex flex-col sm:flex-row justify-between py-2.5 border-b border-[#E8E0D5]"
            >
              <span className="text-[#6B7280] sm:flex-1">{spec.label}</span>
              <span className="text-[#1E1E1E] font-medium sm:text-right">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: `Reviews(${reviews.length})`,
      content: (
        <div className="text-[11px] sm:text-[12px] text-[#444444] leading-[1.8] flex flex-col gap-3.5">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#FAFAF9] rounded-lg border border-[#E8E0D5]"
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] sm:text-[12px] font-medium">
                  {review.name}
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#C6A27E]">
                  ★★★★★
                </span>
              </div>
              <div className="text-[11px] text-[#444444]">
                "{review.comment}"
              </div>
              <div className="text-[9px] sm:text-[10px] text-[#6B7280] mt-1">
                {review.city} · Verified Purchase
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Tab Header - wraps on mobile */}
      <div className="flex flex-wrap gap-3 sm:gap-6 lg:gap-8 border-b border-[#E8E0D5] mb-4.5">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`text-[11px] sm:text-[12px] pb-2 cursor-pointer border-b-2 border-solid ${
              activeTab === tab.name
                ? "text-[#8B5E3C] border-[#8B5E3C]"
                : "text-[#6B7280] border-transparent"
            }`}
          >
            {tab.name}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div>{tabs.find((t) => t.name === activeTab)?.content}</div>
    </div>
  );
}