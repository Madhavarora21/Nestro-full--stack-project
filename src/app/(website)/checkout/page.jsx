import React from 'react'
import { BsCheckLg } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { MdArrowForward } from "react-icons/md";
import { LuSofa } from "react-icons/lu";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { MdOutlineChair } from "react-icons/md";
import { TbShieldCheck } from "react-icons/tb";
import Link from 'next/link';

export default function Page() {
    const cards = ["VISA", "MC", "AMEX", "RuPay"];
    const products = [
        {
            id: 1,
            name: "Ember Velvet 3-Seater",
            desc: "Walnut Brown · 3-Seater",
            price: "89,000",
            icon: <LuSofa />,
            badge: 1,
        },
        {
            id: 3,
            name: "Nordic Fabric Armchair",
            desc: "Ivory White · Single Seater",
            price: "32,000",
            icon: <MdOutlineChair />,
            badge: 2,
        },
    ];

    const summary = [
        { label: "Subtotal", value: "1,45,000", type: "price" },
        { label: "Delivery", value: "Free", type: "free" },
        { label: "Assembly", value: "Free", type: "free" },
        { label: "Discount (Nestro15)", value: "-25,650", type: "discount" },
    ];

    return (
        <div className="w-full bg-[#F8F5F1]  min-h-screen">
            <div className="max-w-container mx-auto ">
                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-0 lg:gap-6">
                    {/* Left Column - Form */}
                    <div className="bg-[#F8F5F1] rounded-xl lg:border-r-[0.5px] border-[#E8E0D5] p-5 sm:p-6 md:p-8">
                        <Link href="/">
                            <div className="text-[15px] text-[#1E1E1E] font-medium tracking-[0.12em] uppercase mb-6 sm:mb-7">
                                Nestro<span className="text-[#8B5E3C]">.</span>
                            </div>
                        </Link>

                        {/* Stepper */}
                        <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-7">
                            <div className="flex items-center gap-1.5 text-[11px] text-[#C6A27E]">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#C6A27E] text-white text-[9px] font-medium">
                                    <BsCheckLg className="text-[10px]" />
                                </div>
                                <span>Cart</span>
                            </div>
                            <div className="w-5 h-[0.7px] bg-[#E8E0D5]"></div>
                            <div className="flex items-center gap-1.5 text-[11px] text-[#8B5E3C]">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#8B5E3C] text-white text-[9px] font-medium">
                                    <span className="text-[10px]">2</span>
                                </div>
                                <span>Delivery</span>
                            </div>
                            <div className="w-5 h-[0.7px] bg-[#E8E0D5]"></div>
                            <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#E8E0D5] text-[9px] font-medium">
                                    <span className="text-[10px]">3</span>
                                </div>
                                <span>Payment</span>
                            </div>
                            <div className="w-5 h-[0.7px] bg-[#E8E0D5]"></div>
                            <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#E8E0D5] text-[9px] font-medium">
                                    <span className="text-[10px]">4</span>
                                </div>
                                <span>Review</span>
                            </div>
                        </div>

                        <div className="text-[13px] text-[#1E1E1E] mb-3 font-medium">Delivery Information</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                            <div>
                                <label className='text-[#6B7280] text-[11px] block mb-1'>First Name</label>
                                <input type="text" placeholder='Madhav' className='w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition' />
                            </div>
                            <div>
                                <label className='text-[#6B7280] text-[11px] block mb-1'>Last Name</label>
                                <input type="text" placeholder='Arora' className='w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition' />
                            </div>
                            <div className="col-span-full">
                                <label className='text-[#6B7280] text-[11px] block mb-1'>Address</label>
                                <input type="text" placeholder='42, Triveni Nagar' className='w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition' />
                            </div>
                            <div>
                                <label className='text-[#6B7280] text-[11px] block mb-1'>City</label>
                                <input type="text" placeholder='Jaipur' className='w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition' />
                            </div>
                            <div>
                                <label className='text-[#6B7280] text-[11px] block mb-1'>Pincode</label>
                                <input type="text" placeholder='302018' className='w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition' />
                            </div>
                            <div>
                                <label className='text-[#6B7280] text-[11px] block mb-1'>State</label>
                                <input type="text" placeholder='Rajasthan' className='w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition' />
                            </div>
                            <div>
                                <label className='text-[#6B7280] text-[11px] block mb-1'>Phone</label>
                                <input type="tel" placeholder='+91 9799670764' className='w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition' />
                            </div>
                        </div>

                        <hr className="border-0 border-t-[0.5px] border-[#E8E0D5] my-5" />

                        <div className="text-[13px] text-[#1E1E1E] mb-3 font-medium">Shipping Method</div>
                        <div className="bg-[#FFF8F5] border-[#8B5E3C] border-[0.5px] rounded-lg mb-2 cursor-pointer flex flex-wrap items-center gap-3 p-3">
                            <div className="w-4 h-4 rounded-full border-[#C6A27E] border-[1.5px] flex items-center justify-center shrink-0">
                                <GoDotFill className='w-2 h-2 text-[#8B5E3C] rounded-full' />
                            </div>
                            <div className="flex-1">
                                <div className="text-[12px] text-[#1E1E1E]">Standard Delivery</div>
                                <div className="text-[12px] text-[#6B7280] mt-px">5-7 business days + free assembly</div>
                            </div>
                            <div className="text-[12px] text-[#1E1E1E] font-medium">Free</div>
                        </div>
                        <div className="bg-white border-[#E8E0D5] border-[0.5px] rounded-lg mb-2 cursor-pointer flex flex-wrap items-center gap-3 p-3">
                            <div className="w-4 h-4 rounded-full border-[#C6A27E] border-[1.5px] shrink-0"></div>
                            <div className="flex-1">
                                <div className="text-[12px] text-[#1E1E1E]">Express Delivery</div>
                                <div className="text-[12px] text-[#6B7280] mt-px">2-3 business days</div>
                            </div>
                            <div className="text-[12px] text-[#1E1E1E] font-medium">₹ 1,500</div>
                        </div>

                        <hr className="border-0 border-t-[0.5px] border-[#E8E0D5] my-5" />

                        <div className="text-[13px] text-[#1E1E1E] mb-3 font-medium">Payment</div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <div className="border border-[#8B5E3C] text-[#8B5E3C] bg-[#FFF8F5] rounded-md flex-1 p-2 text-[11px] text-center cursor-pointer">Credit / Debit Card</div>
                            <div className="flex-1 p-2 border-[0.5px] border-[#E8E0D5] rounded-md text-[11px] text-center cursor-pointer text-[#6B7280]">UPI</div>
                            <div className="flex-1 p-2 border-[0.5px] border-[#E8E0D5] rounded-md text-[11px] text-center cursor-pointer text-[#6B7280]">Net Banking</div>
                            <div className="flex-1 p-2 border-[0.5px] border-[#E8E0D5] rounded-md text-[11px] text-center cursor-pointer text-[#6B7280]">EMI</div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {cards.map((card, index) => (
                                <div key={index} className="bg-[#F0EBE3] rounded-sm py-1 px-2 text-[#444444] text-[10px] font-medium cursor-pointer">
                                    {card}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                            <div className="col-span-full">
                                <label className='text-[11px] text-[#6B7280] mb-1 block'>Card Number</label>
                                <input type="text" placeholder="4242 4242 4242 4242" className="w-full py-2.5 px-3 border-[0.5px] border-[#E8E0D5] rounded-md text-[12px] text-[#1E1E1E] bg-white outline-none" />
                            </div>
                            <div>
                                <label className='text-[#6B7280] text-[11px] block mb-1'>Expiry</label>
                                <input type="text" placeholder='MM / YY' className='w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none' />
                            </div>
                            <div>
                                <label className='text-[#6B7280] text-[11px] block mb-1'>CVV</label>
                                <input type="text" placeholder="..." className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none" />
                            </div>
                        </div>
                        <button className='w-full bg-[#8B5E3C] justify-center p-3 text-[13px] mt-4 text-[#FFF8F3] rounded-sm cursor-pointer tracking-[0.08em] border-none font-medium inline-flex items-center gap-2'>
                            Place Order
                            <MdArrowForward />
                        </button>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="bg-[#FAFAF9] p-5 sm:p-6 md:p-7 rounded-xl">
                        <div className="bg-white border border-[#E8E0D5] rounded-xl p-5">
                            <div className="border-b border-[#E8E0D5] pb-3 mb-4 text-[13px] font-medium text-[#1E1E1E]">Order Summary</div>
                            {products.map((item) => (
                                <div key={item.id} className="flex items-start gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-[#F5F0EB] flex items-center justify-center text-[#C6A27E] text-[20px] relative shrink-0">
                                        {item.icon}
                                        {item.badge > 0 && (
                                            <div className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-[#8B5E3C] text-white rounded-full text-[9px] flex items-center justify-center">
                                                {item.badge}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[#1E1E1E] font-medium text-[12px]">{item.name}</div>
                                        <div className="text-[#6B7280] text-[10px]">{item.desc}</div>
                                    </div>
                                    <div className="text-[#1E1E1E] font-medium text-[13px] flex items-center gap-0">
                                        <MdOutlineCurrencyRupee />{item.price}
                                    </div>
                                </div>
                            ))}
                            <div className="border-t border-[#E8E0D5] pt-3 mt-3">
                                {summary.map((item, index) => (
                                    <div key={index} className="flex justify-between text-[12px] text-[#444444] mb-2">
                                        <span>{item.label}</span>
                                        {item.type === "price" && <span className="flex items-center"><MdOutlineCurrencyRupee /> {item.value}</span>}
                                        {item.type === "free" && <span className="text-[#3B6D11]">{item.value}</span>}
                                        {item.type === "discount" && <span className="flex items-center text-[#3B6D11]">-<MdOutlineCurrencyRupee /> {item.value}</span>}
                                    </div>
                                ))}
                                <div className="flex justify-between border-t border-[#E8E0D5] font-medium text-[14px] text-[#1E1E1E] pt-3 mt-1">
                                    <span>Total</span>
                                    <span className="flex items-center"><MdOutlineCurrencyRupee />1,19,350</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 my-4">
                                <input type="text" placeholder="Promo / gift code" className='border border-[#E8E0D5] flex-1 py-2 px-3 bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none' />
                                <button className='bg-[#2C2016] border-none rounded-md text-[11px] text-[#D6BFA7] py-2 px-4 cursor-pointer hover:bg-[#8B5E3C] hover:text-[#F5F0EB] transition'>Apply</button>
                            </div>
                            <div className="bg-[#EAF3DE] flex items-center gap-2 rounded-lg text-[11px] text-[#3B6D11] py-3 px-3.5">
                                <BsCheckLg className='text-[14px]' />
                                Code applied. You save ₹25,650!
                            </div>
                            <div className="border border-[#E8E0D5] p-3.5 mt-4 bg-white rounded-[10px]">
                                <div className="text-[11px] font-medium text-[#1E1E1E] flex items-center mb-2">
                                    <TbShieldCheck className='text-[#8B5E3C] mr-1.5' />Purchase Protection
                                </div>
                                <div className="text-[10px] text-[#6B7280] leading-[1.6]">
                                    5-year warranty · 30-day returns · Free assembly included · Tracked delivery
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}