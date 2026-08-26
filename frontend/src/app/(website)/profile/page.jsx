"use client";

import { useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { LuSofa } from "react-icons/lu";
import { FaTable } from "react-icons/fa";
import { TbArmchair2 } from "react-icons/tb";
import { HiMenu, HiX } from "react-icons/hi";
import { IoAddSharp } from "react-icons/io5";
import MenuItems from "@/components/website/profile/MenuItems";

// ---------- Orders Component ----------
const OrdersSection = () => {
  const orders = [
    { id: "MN-2847", date: "May 3, 2026", product: "Ember Velvet 3-Seater", icon: <LuSofa />, status: "Delivered", statusColor: "bg-[#EAF3DE] text-[#3B6D11]", price: "89,000" },
    { id: "MN-2848", date: "May 5, 2026", product: "Aurora Dining Set", icon: <FaTable />, status: "Shipped", statusColor: "bg-[#FFF3CD] text-[#856404]", price: "1,20,000" },
    { id: "MN-2848", date: "May 5, 2026", product: "Aurora Armchair", icon: <TbArmchair2 />, status: "Delivered", statusColor: "bg-[#EAF3DE] text-[#3B6D11]", price: "20,000" },
  ];

  return (
    <div className="bg-white border border-[#E8E0D5] rounded-xl p-4 sm:p-5">
      <div className="text-[13px] font-medium text-[#1E1E1E] mb-4 pb-3 border-b border-[#E8E0D5]">Recent Orders</div>
      {orders.map((order, idx) => (
        <div key={idx} className="flex flex-wrap sm:flex-nowrap items-center gap-3 border-b border-[#E8E0D5] py-3 last:border-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F5F0EB] rounded-lg flex items-center justify-center text-[18px] sm:text-[20px] text-[#C6A27E] shrink-0">{order.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] sm:text-[12px] font-medium text-[#1E1E1E] truncate">{order.product}</div>
            <div className="text-[9px] sm:text-[10px] mt-0.5 text-[#6B7280]">Order #{order.id} · {order.date}</div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
            <span className={`${order.statusColor} text-[9px] sm:text-[10px] py-0.5 px-2 rounded-[10px] whitespace-nowrap`}>{order.status}</span>
            <div className="text-[12px] sm:text-[13px] font-medium text-[#1E1E1E] flex items-center whitespace-nowrap"><MdCurrencyRupee /> {order.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ---------- Personal Info Component ----------
const PersonalInfoSection = () => (
  <div className="bg-white border border-[#E8E0D5] rounded-xl p-4 sm:p-5">
    <div className="text-[13px] font-medium text-[#1E1E1E] mb-4 pb-3 border-b border-[#E8E0D5]">Personal Information</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <div><label className="text-[#6B7280] text-[11px] block mb-1.25">First Name</label><input type="text" placeholder="Madhav" className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] outline-none focus:border-[#8B5E3C]" /></div>
      <div><label className="text-[#6B7280] text-[11px] block mb-1.25">Last Name</label><input type="text" placeholder="Arora" className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] outline-none focus:border-[#8B5E3C]" /></div>
      <div><label className="text-[#6B7280] text-[11px] block mb-1.25">Email</label><input type="email" placeholder="aroramadhav2111@gmail.com" className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] outline-none focus:border-[#8B5E3C]" /></div>
      <div><label className="text-[#6B7280] text-[11px] block mb-1.25">Phone</label><input type="text" placeholder="9955983465" className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] outline-none focus:border-[#8B5E3C]" /></div>
      <div><label className="text-[#6B7280] text-[11px] block mb-1.25">Date of Birth</label><input type="date" className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white roundexd-md text-[12px] outline-none focus:border-[#8B5E3C]" /></div>
      <div><label className="text-[#6B7280] text-[11px] block mb-1.25">Gender</label><select className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] outline-none focus:border-[#8B5E3C]"><option>Male</option><option>Female</option><option>Other</option></select></div>
    </div>
    <button className="bg-[#8B5E3C] text-[#FFF8F3] text-[11px] tracking-[0.08em] py-2.75 px-5.5 mt-4 rounded-sm font-medium inline-flex items-center">Save Changes</button>
  </div>
);

// ---------- Addresses Component ----------
const AddressesSection = () => (
  <div className="bg-white border border-[#E8E0D5] rounded-xl p-4 sm:p-5">
    <div className="text-[13px] font-medium text-[#1E1E1E] mb-4 pb-3 border-b border-[#E8E0D5]">Saved Addresses</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <div className="border border-[#E8E0D5] rounded-lg p-3.5 relative">
        <div className="absolute top-2.5 right-2.5 text-[9px] bg-[#F5EDE4] text-[#8B5E3C] py-0.5 px-2 rounded-[10px]">Default</div>
        <div className="text-[12px] font-medium mb-1.5">Home</div>
        <div className="text-[11px] text-[#6B7280] leading-[1.6]">42, Malviya Nagar<br />Jaipur, Rajasthan 302018<br />India</div>
      </div>
      <div className="border border-[#E8E0D5] rounded-lg p-3.5">
        <div className="text-[12px] font-medium mb-1.5">Office</div>
        <div className="text-[11px] text-[#6B7280] leading-[1.6]">Plot 8, Tech Park<br />Sector 18, Gurugram<br />Haryana 122015</div>
      </div>
    </div>
    <button className="bg-transparent text-[#8B5E3C] text-[11px] tracking-[0.08em] py-2.5 px-5.5 mt-4 border border-[#C6A27E] rounded-sm font-medium inline-flex items-center gap-1.75"><IoAddSharp /> Add New Address</button>
  </div>
);

// ---------- Settings Component ----------
const SettingsSection = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div className="bg-white border border-[#E8E0D5] rounded-xl p-4 sm:p-5">
      <div className="text-[13px] font-medium text-[#1E1E1E] mb-4 pb-3 border-b border-[#E8E0D5]">Account Settings</div>
      <div className="flex flex-col gap-3.5">
        <div className="flex justify-between items-center border border-[#E8E0D5] rounded-lg p-3">
          <div><div className="text-[12px] font-medium">Email Notifications</div><div className="text-[10px] text-[#6B7280]">Order updates & offers</div></div>
          <div onClick={() => setEmailNotif(!emailNotif)} className={`w-10 h-5.5 rounded-[11px] relative cursor-pointer transition-colors ${emailNotif ? "bg-[#8B5E3C]" : "bg-[#E8E0D5]"}`}>
            <div className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-all ${emailNotif ? "right-0.5" : "left-0.5"}`}></div>
          </div>
        </div>
        <div className="flex justify-between items-center border border-[#E8E0D5] rounded-lg p-3">
          <div><div className="text-[12px] font-medium">SMS Alerts</div><div className="text-[10px] text-[#6B7280]">Delivery & order updates via SMS</div></div>
          <div onClick={() => setSmsAlerts(!smsAlerts)} className={`w-10 h-5.5 rounded-[11px] relative cursor-pointer transition-colors ${smsAlerts ? "bg-[#8B5E3C]" : "bg-[#E8E0D5]"}`}>
            <div className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-all ${smsAlerts ? "right-0.5" : "left-0.5"}`}></div>
          </div>
        </div>
        <div className="border border-[#E8E0D5] rounded-lg p-3">
          <div className="text-[12px] font-medium mb-2">Change Password</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div><label className="text-[11px] text-[#6B7280] block mb-1.25">Current Password</label><input type="password" placeholder="••••••••" className="w-full py-2.5 px-3 border border-[#E8E0D5] rounded-md text-[12px] bg-white outline-none focus:border-[#8B5E3C]" /></div>
            <div><label className="text-[11px] text-[#6B7280] block mb-1.25">New Password</label><input type="password" placeholder="••••••••" className="w-full py-2.5 px-3 border border-[#E8E0D5] rounded-md text-[12px] bg-white outline-none focus:border-[#8B5E3C]" /></div>
          </div>
          <button className="bg-[#8B5E3C] text-[#FFF8F3] text-[10px] tracking-[0.08em] py-2.5 px-4 mt-4 rounded-sm font-medium">Update Password</button>
        </div>
      </div>
    </div>
  );
};

// ---------- Main Page ----------
export default function ProfilePage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("My Orders");
  const renderContent = () => {
    switch (activeTab) {
      case "My Orders": return <OrdersSection />;
      case "Personal Info": return <PersonalInfoSection />;
      case "Addresses": return <AddressesSection />;
      case "Settings": return <SettingsSection />;
      case "Sign Out":
        alert("Signing out... (demo)");
        // Add your logout logic here (clear token, redirect)
        return <div className="text-center py-10">You have been signed out.</div>;
      default: return <OrdersSection />;
    }
  };

  return (
    <div className="w-full bg-[#F8F5F1] min-h-screen py-6 sm:py-8">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="lg:hidden mb-4">
          <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} className="flex items-center gap-2 bg-white border border-[#E8E0D5] rounded-lg px-4 py-2 text-[#8B5E3C] text-sm font-medium">
            {mobileSidebarOpen ? <HiX className="text-lg" /> : <HiMenu className="text-lg" />}
            {mobileSidebarOpen ? "Close Menu" : "Menu"}
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <div className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block`}>
            <MenuItems activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <div className="flex flex-col gap-5">
            {/* Stats Cards */}
            <div className="bg-white border border-[#E8E0D5] rounded-xl p-4 sm:p-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#F8F5F1] rounded-lg p-3 text-center"><div className="text-[18px] sm:text-[20px] text-[#8B5E3C] font-medium mb-1">7</div><div className="text-[9px] sm:text-[10px] text-[#6B7280] tracking-wide">orders</div></div>
                <div className="bg-[#F8F5F1] rounded-lg p-3 text-center"><div className="text-[18px] sm:text-[20px] text-[#8B5E3C] font-medium mb-1 flex items-center justify-center gap-0"><MdCurrencyRupee />4.2L</div><div className="text-[9px] sm:text-[10px] text-[#6B7280] tracking-wide">spent</div></div>
                <div className="bg-[#F8F5F1] rounded-lg p-3 text-center"><div className="text-[18px] sm:text-[20px] text-[#8B5E3C] font-medium mb-1">420</div><div className="text-[9px] sm:text-[10px] text-[#6B7280] tracking-wide">points</div></div>
                <div className="bg-[#F8F5F1] rounded-lg p-3 text-center"><div className="text-[18px] sm:text-[20px] text-[#8B5E3C] font-medium mb-1">3</div><div className="text-[9px] sm:text-[10px] text-[#6B7280] tracking-wide">reviews</div></div>
              </div>
            </div>
            {/* Dynamic Content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}