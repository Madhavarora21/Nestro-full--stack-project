"use client";

import React, { useState } from "react";

export default function ProductColor() {
  const [active, setActive] = useState("2-Seater");
  const [activeColor, setActiveColor] = useState("#8B5E3C");

  const sofaOptions = [
    { label: "2-Seater" },
    { label: "3-Seater" },
    { label: "L-Shape" },
    { label: "Corner Sofa" },
  ];

  const colors = [
    { value: "#8B5E3C" },
    { value: "#C6A27E" },
    { value: "#444444" },
    { value: "#E8E0D5" },
  ];

  return (
    <div>
      <div className="text-[10px] text-[#1E1E1E] uppercase mb-2.5 tracking-[0.04em] font-medium">
        Upholstery Color
      </div>

      {/* Colors */}
      <div className="flex gap-2 sm:gap-2.5 mb-5 flex-wrap">
        {colors.map((color) => (
          <div
            key={color.value}
            onClick={() => setActiveColor(color.value)}
            className={`w-6 h-6 sm:w-7.5 sm:h-7.5 rounded-full cursor-pointer border-2 border-solid transition-all duration-150`}
            style={{
              backgroundColor: color.value,
              borderColor: activeColor === color.value ? color.value : "transparent",
              boxShadow:
                activeColor === color.value
                  ? "0 0 0 3px rgba(139,94,60,0.15)"
                  : "none",
            }}
          ></div>
        ))}
      </div>

      <div className="text-[11px] text-[#1E1E1E] uppercase mb-2.5 tracking-[0.04em] font-medium">
        Configuration
      </div>

      {/* Sofa options */}
      <div className="flex gap-2 sm:gap-3 mb-5.5 flex-wrap">
        {sofaOptions.map((item) => (
          <div
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`py-1.5 px-2 sm:py-2 sm:px-4 border border-solid rounded-md text-[11px] sm:text-[12px] cursor-pointer transition-all duration-150 ${
              active === item.label
                ? "border-[#8B5E3C] bg-[#FFF8F5] text-[#8B5E3C]"
                : "border-[#E8E0D5] text-[#444444] hover:border-[#C6A27E]"
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}