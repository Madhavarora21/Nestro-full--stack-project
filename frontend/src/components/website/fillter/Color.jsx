import React from "react";
export default function Color() {
  const colors = [
    { bg: "#F5F0EB", border: "#D6BFA7" },
    { bg: "#4B2E2E", border: "#3B1F1F" },
    { bg: "#8B5E3C", border: "#6B4A2A" },
    { bg: "#6B7280", border: "#4B5563" },
    { bg: "#D6BFA7", border: "#B89C7A" },
    { bg: "#1E1E1E", border: "#8B5E3C" },
  ];
  return (
    <div className="mb-5">
      <div className="text-[12px] capitalize font-medium text-[#1E1E1E] mb-3 tracking-[0.03em]">
        Color
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-5.5 h-5.5 rounded-full cursor-pointer transition-all duration-150"
            style={{
              backgroundColor: color.bg,
              border: `1px solid ${color.border}`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}