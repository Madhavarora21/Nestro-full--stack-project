"use client";

import { TbPackage } from "react-icons/tb";
import { FaUser } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";

export default function MenuItems({ activeTab, onTabChange }) {
  const menuItems = [
    { icon: <TbPackage className="text-[15px]" />, label: "My Orders" },
    { icon: <FaUser className="text-[15px]" />, label: "Personal Info" },
    { icon: <FaLocationDot className="text-[15px]" />, label: "Addresses" },
    { icon: <IoIosSettings className="text-[15px]" />, label: "Settings" },
    { icon: <MdOutlineLogout className="text-[15px]" />, label: "Sign Out" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Profile Card */}
      <div className="bg-white border border-[#E8E0D5] rounded-xl p-6 flex flex-col items-center text-center">
        <div className="w-18 h-18 rounded-full bg-[#F0EBE3] flex items-center justify-center text-[22px] font-medium text-[#8B5E3C] mb-3 uppercase">
          MA
        </div>
        <div className="text-[15px] font-medium text-[#1E1E1E] mb-1 capitalize">
          Madhav Arora
        </div>
        <div className="text-[11px] text-[#6B7280] mb-3">
          aroramadhav2111@gamil.com
        </div>
        <div className="bg-[#F5EDE4] text-[10px] text-[#8B5E3C] py-1 px-3 rounded-full tracking-wide">
          Gold Member
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white border border-[#E8E0D5] rounded-xl p-2">
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => onTabChange(item.label)}
            className={`flex items-center text-[12px] gap-2.5 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
              activeTab === item.label
                ? "bg-[#F5EDE4] text-[#8B5E3C]"
                : "text-[#444444] hover:bg-[#F9F5F0] hover:text-[#8B5E3C]"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}