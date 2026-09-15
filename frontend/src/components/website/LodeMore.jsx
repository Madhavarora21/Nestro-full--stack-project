import { GoArrowRight } from "react-icons/go";

export default function LodeMore() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-5 py-4 px-4 sm:px-6 bg-[#2C2016] rounded-[10px]">
      <div className="text-center sm:text-left">
        <div className="text-[12px] text-[#D6BFA7] tracking-[0.06em]">Limited Time Offer</div>
        <div className="text-[14px] sm:text-[16px] font-normal text-[#FAF7F4] my-1">
          Free White Glove Delivery on orders above ₹75,000
        </div>
      </div>
      <button className="bg-[#8B5E3C] text-[#FFF8F3] text-[11px] px-4 py-2 tracking-[0.08em] rounded-sm cursor-pointer border-none font-medium inline-flex items-center gap-2 whitespace-nowrap">
        Shop Now
        <GoArrowRight className="text-[12px]" />
      </button>
    </div>
  );
}