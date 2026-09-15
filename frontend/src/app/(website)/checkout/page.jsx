"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { client } from "@/utils/helper";
import { toast } from "sonner";
import { BsCheckLg } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { MdArrowForward } from "react-icons/md";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { TbShieldCheck } from "react-icons/tb";
import Link from "next/link";

export default function Page() {
    const router = useRouter();

    const cartItems = useSelector((state) => state.cart.items);

    const [checkingAuth, setCheckingAuth] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderId, setOrderId] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("CARD");

  const [formData, setFormData] = useState({
    firstName: "Madhav",
    lastName: "Arora",
    address: "42, Triveni Nagar",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302018",
    phone: "9799670764",
});

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await client.get("user/profile");

                if (!res.data.success) {
                    router.push("/login");
                } else {
                    setCheckingAuth(false);
                }
            } catch (err) {
                router.push("/login");
            }
        }

        checkAuth();
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePlaceOrder = async () => {
        if (placingOrder) return;

        if (cartItems.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.address ||
            !formData.city ||
            !formData.state ||
            !formData.pincode ||
            !formData.phone
        ) {
            toast.error("Please fill all delivery information.");
            return;
        }

        setPlacingOrder(true);

        try {
            const res = await client.post("order/place-order", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                phone: formData.phone,
                paymentMethod:
                    paymentMethod === "COD" ? "COD" : "ONLINE",
            });

            if (res.data.success) {
                setOrderId(res.data.data?.orderId || "");
                setOrderSuccess(true);
                toast.success(res.data.message || "Order placed successfully");
            } else {
                toast.error(res.data.message || "Unable to place order.");
            }
        } catch (error) {
            console.log("PLACE ORDER ERROR:", error);

            toast.error(
                error?.response?.data?.message ||
                    "Something went wrong while placing your order."
            );
        } finally {
            setPlacingOrder(false);
        }
    };

    const cards = ["VISA", "MC", "AMEX", "RuPay"];

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.salePrice * item.qty,
        0
    );
    const deliveryCharge = subtotal > 50000 ? 0 : 1500;
    const total = subtotal + deliveryCharge;

    if (checkingAuth) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-[#F8F5F1]">
                <div className="text-[13px] text-[#6B7280]">
                    Loading...
                </div>
            </div>
        );
    }

    if (orderSuccess) {
        return (
            <div className="w-full min-h-screen bg-[#F8F5F1] flex items-center justify-center px-5">
                <div className="w-full max-w-[500px] bg-white border border-[#E8E0D5] rounded-xl p-8 text-center shadow-sm">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#EAF3DE] flex items-center justify-center mb-5">
                        <BsCheckLg className="text-[#3B6D11] text-3xl" />
                    </div>

                    <h1 className="text-[22px] font-semibold text-[#1E1E1E] mb-2">
                        Congratulations!
                    </h1>

                    <p className="text-[13px] text-[#6B7280] mb-5">
                        Your order has been placed successfully.
                    </p>

                    {orderId && (
                        <div className="bg-[#F8F5F1] rounded-lg p-3 mb-5">
                            <div className="text-[10px] text-[#6B7280] mb-1">
                                Order ID
                            </div>

                            <div className="text-[13px] font-medium text-[#8B5E3C]">
                                {orderId}
                            </div>
                        </div>
                    )}

                    <div className="text-[11px] text-[#6B7280] mb-6">
                        Thank you for shopping with Nestro.
                    </div>

                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="w-full bg-[#8B5E3C] justify-center p-3 text-[13px] text-[#FFF8F3] rounded-sm cursor-pointer tracking-[0.08em] border-none font-medium inline-flex items-center gap-2"
                    >
                        Continue Shopping
                        <MdArrowForward />
                    </button>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="w-full min-h-screen bg-[#F8F5F1] flex items-center justify-center px-5">
                <div className="w-full max-w-[420px] bg-white border border-[#E8E0D5] rounded-xl p-8 text-center shadow-sm">
                    <h1 className="text-[18px] font-medium text-[#1E1E1E] mb-2">
                        Your cart is empty
                    </h1>
                    <p className="text-[13px] text-[#6B7280] mb-6">
                        Add some products to your cart before checking out.
                    </p>
                    <Link href="/store">
                        <button className="bg-[#8B5E3C] text-white px-5 py-2.5 rounded-md text-sm">
                            Browse Store
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#F8F5F1] min-h-screen">
            <div className="max-w-container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-0 lg:gap-6">

                    {/* LEFT COLUMN */}
                    <div className="bg-[#F8F5F1] rounded-xl lg:border-r-[0.5px] border-[#E8E0D5] p-5 sm:p-6 md:p-8">

                        <Link href="/">
                            <div className="text-[15px] text-[#1E1E1E] font-medium tracking-[0.12em] uppercase mb-6 sm:mb-7">
                                Nestro
                                <span className="text-[#8B5E3C]">.</span>
                            </div>
                        </Link>

                        {/* STEPPER */}
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

                        {/* DELIVERY INFORMATION */}
                        <div className="text-[13px] text-[#1E1E1E] mb-3 font-medium">
                            Delivery Information
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">

                            <div>
                                <label className="text-[#6B7280] text-[11px] block mb-1">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Madhav"
                                    className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition"
                                />
                            </div>

                            <div>
                                <label className="text-[#6B7280] text-[11px] block mb-1">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Arora"
                                    className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition"
                                />
                            </div>

                            <div className="col-span-full">
                                <label className="text-[#6B7280] text-[11px] block mb-1">
                                    Address
                                </label>

                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="42, Triveni Nagar"
                                    className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition"
                                />
                            </div>

                            <div>
                                <label className="text-[#6B7280] text-[11px] block mb-1">
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Jaipur"
                                    className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition"
                                />
                            </div>

                            <div>
                                <label className="text-[#6B7280] text-[11px] block mb-1">
                                    Pincode
                                </label>

                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    placeholder="302018"
                                    className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition"
                                />
                            </div>

                            <div>
                                <label className="text-[#6B7280] text-[11px] block mb-1">
                                    State
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="Rajasthan"
                                    className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition"
                                />
                            </div>

                            <div>
                                <label className="text-[#6B7280] text-[11px] block mb-1">
                                    Phone
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 9799670764"
                                    className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition"
                                />
                            </div>
                        </div>

                        <hr className="border-0 border-t-[0.5px] border-[#E8E0D5] my-5" />

                        {/* SHIPPING METHOD */}
                        <div className="text-[13px] text-[#1E1E1E] mb-3 font-medium">
                            Shipping Method
                        </div>

                        <div className="bg-[#FFF8F5] border-[#8B5E3C] border-[0.5px] rounded-lg mb-2 cursor-pointer flex flex-wrap items-center gap-3 p-3">
                            <div className="w-4 h-4 rounded-full border-[#C6A27E] border-[1.5px] flex items-center justify-center shrink-0">
                                <GoDotFill className="w-2 h-2 text-[#8B5E3C] rounded-full" />
                            </div>

                            <div className="flex-1">
                                <div className="text-[12px] text-[#1E1E1E]">
                                    Standard Delivery
                                </div>

                                <div className="text-[12px] text-[#6B7280] mt-px">
                                    5-7 business days + free assembly
                                </div>
                            </div>

                            <div className="text-[12px] text-[#1E1E1E] font-medium">
                                Free
                            </div>
                        </div>

                        <div className="bg-white border-[#E8E0D5] border-[0.5px] rounded-lg mb-2 cursor-pointer flex flex-wrap items-center gap-3 p-3">
                            <div className="w-4 h-4 rounded-full border-[#C6A27E] border-[1.5px] shrink-0"></div>

                            <div className="flex-1">
                                <div className="text-[12px] text-[#1E1E1E]">
                                    Express Delivery
                                </div>

                                <div className="text-[12px] text-[#6B7280] mt-px">
                                    2-3 business days
                                </div>
                            </div>

                            <div className="text-[12px] text-[#1E1E1E] font-medium">
                                ₹ 1,500
                            </div>
                        </div>

                        <hr className="border-0 border-t-[0.5px] border-[#E8E0D5] my-5" />

                        {/* PAYMENT */}
                        <div className="text-[13px] text-[#1E1E1E] mb-3 font-medium">
                            Payment
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">

                            {/* CARD */}
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("CARD")}
                                className={`border rounded-md flex-1 p-2 text-[11px] text-center cursor-pointer ${
                                    paymentMethod === "CARD"
                                        ? "border-[#8B5E3C] text-[#8B5E3C] bg-[#FFF8F5]"
                                        : "border-[#E8E0D5] text-[#6B7280] bg-white"
                                }`}
                            >
                                Credit / Debit Card
                            </button>

                            {/* UPI */}
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("UPI")}
                                className={`border rounded-md flex-1 p-2 text-[11px] text-center cursor-pointer ${
                                    paymentMethod === "UPI"
                                        ? "border-[#8B5E3C] text-[#8B5E3C] bg-[#FFF8F5]"
                                        : "border-[#E8E0D5] text-[#6B7280] bg-white"
                                }`}
                            >
                                UPI
                            </button>

                            {/* NET BANKING */}
                            <button
                                type="button"
                                onClick={() =>
                                    setPaymentMethod("NET_BANKING")
                                }
                                className={`border rounded-md flex-1 p-2 text-[11px] text-center cursor-pointer ${
                                    paymentMethod === "NET_BANKING"
                                        ? "border-[#8B5E3C] text-[#8B5E3C] bg-[#FFF8F5]"
                                        : "border-[#E8E0D5] text-[#6B7280] bg-white"
                                }`}
                            >
                                Net Banking
                            </button>

                            {/* EMI */}
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("EMI")}
                                className={`border rounded-md flex-1 p-2 text-[11px] text-center cursor-pointer ${
                                    paymentMethod === "EMI"
                                        ? "border-[#8B5E3C] text-[#8B5E3C] bg-[#FFF8F5]"
                                        : "border-[#E8E0D5] text-[#6B7280] bg-white"
                                }`}
                            >
                                EMI
                            </button>

                            {/* COD */}
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("COD")}
                                className={`border rounded-md flex-1 p-2 text-[11px] text-center cursor-pointer ${
                                    paymentMethod === "COD"
                                        ? "border-[#8B5E3C] text-[#8B5E3C] bg-[#FFF8F5]"
                                        : "border-[#E8E0D5] text-[#6B7280] bg-white"
                                }`}
                            >
                                Cash on Delivery
                            </button>
                        </div>

                        {/* CARD DETAILS */}
                        {paymentMethod === "CARD" && (
                            <>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {cards.map((card, index) => (
                                        <div
                                            key={index}
                                            className="bg-[#F0EBE3] rounded-sm py-1 px-2 text-[#444444] text-[10px] font-medium cursor-pointer"
                                        >
                                            {card}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">

                                    <div className="col-span-full">
                                        <label className="text-[11px] text-[#6B7280] mb-1 block">
                                            Card Number
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="4242 4242 4242 4242"
                                            className="w-full py-2.5 px-3 border-[0.5px] border-[#E8E0D5] rounded-md text-[12px] text-[#1E1E1E] bg-white outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[#6B7280] text-[11px] block mb-1">
                                            Expiry
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="MM / YY"
                                            className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[#6B7280] text-[11px] block mb-1">
                                            CVV
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="..."
                                            className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* UPI MESSAGE */}
                        {paymentMethod === "UPI" && (
                            <div className="bg-white border border-[#E8E0D5] rounded-md p-4 mb-5">
                                <div className="text-[12px] text-[#1E1E1E] font-medium mb-1">
                                    UPI Payment
                                </div>

                                <div className="text-[11px] text-[#6B7280]">
                                    Demo mode: UPI payment will be simulated.
                                </div>
                            </div>
                        )}

                        {/* NET BANKING MESSAGE */}
                        {paymentMethod === "NET_BANKING" && (
                            <div className="bg-white border border-[#E8E0D5] rounded-md p-4 mb-5">
                                <div className="text-[12px] text-[#1E1E1E] font-medium mb-1">
                                    Net Banking
                                </div>

                                <div className="text-[11px] text-[#6B7280]">
                                    Demo mode: Net Banking payment will be simulated.
                                </div>
                            </div>
                        )}

                        {/* EMI MESSAGE */}
                        {paymentMethod === "EMI" && (
                            <div className="bg-white border border-[#E8E0D5] rounded-md p-4 mb-5">
                                <div className="text-[12px] text-[#1E1E1E] font-medium mb-1">
                                    EMI
                                </div>

                                <div className="text-[11px] text-[#6B7280]">
                                    Demo mode: EMI payment will be simulated.
                                </div>
                            </div>
                        )}

                        {/* COD MESSAGE */}
                        {paymentMethod === "COD" && (
                            <div className="bg-[#FFF8F5] border border-[#E8E0D5] rounded-md p-4 mb-5">
                                <div className="text-[12px] text-[#1E1E1E] font-medium mb-1">
                                    Cash on Delivery
                                </div>

                                <div className="text-[11px] text-[#6B7280]">
                                    Pay when your order is delivered to you.
                                </div>
                            </div>
                        )}

                        {/* PLACE ORDER */}
                        <button
                            type="button"
                            onClick={handlePlaceOrder}
                            disabled={placingOrder}
                            className={`w-full justify-center p-3 text-[13px] mt-4 text-[#FFF8F3] rounded-sm tracking-[0.08em] border-none font-medium inline-flex items-center gap-2 ${
                                placingOrder
                                    ? "bg-[#B99A83] cursor-not-allowed"
                                    : "bg-[#8B5E3C] cursor-pointer"
                            }`}
                        >
                            {placingOrder
                                ? "Placing Order..."
                                : "Place Order"}

                            {!placingOrder && <MdArrowForward />}
                        </button>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="bg-[#FAFAF9] p-5 sm:p-6 md:p-7 rounded-xl">

                        <div className="bg-white border border-[#E8E0D5] rounded-xl p-5">

                            <div className="border-b border-[#E8E0D5] pb-3 mb-4 text-[13px] font-medium text-[#1E1E1E]">
                                Order Summary
                            </div>

                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start gap-3 mb-4"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-[#F5F0EB] flex items-center justify-center overflow-hidden relative shrink-0">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />

                                        {item.qty > 0 && (
                                            <div className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-[#8B5E3C] text-white rounded-full text-[9px] flex items-center justify-center">
                                                {item.qty}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className="text-[#1E1E1E] font-medium text-[12px]">
                                            {item.name}
                                        </div>
                                    </div>

                                    <div className="text-[#1E1E1E] font-medium text-[13px] flex items-center gap-0">
                                        <MdOutlineCurrencyRupee />
                                        {(item.salePrice * item.qty).toLocaleString("en-IN")}
                                    </div>
                                </div>
                            ))}

                            <div className="border-t border-[#E8E0D5] pt-3 mt-3">

                                <div className="flex justify-between text-[12px] text-[#444444] mb-2">
                                    <span>Subtotal</span>
                                    <span className="flex items-center">
                                        <MdOutlineCurrencyRupee />
                                        {subtotal.toLocaleString("en-IN")}
                                    </span>
                                </div>

                                <div className="flex justify-between text-[12px] text-[#444444] mb-2">
                                    <span>Delivery</span>
                                    {deliveryCharge === 0 ? (
                                        <span className="text-[#3B6D11]">Free</span>
                                    ) : (
                                        <span className="flex items-center">
                                            <MdOutlineCurrencyRupee />
                                            {deliveryCharge.toLocaleString("en-IN")}
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-between text-[12px] text-[#444444] mb-2">
                                    <span>Assembly</span>
                                    <span className="text-[#3B6D11]">Free</span>
                                </div>

                                <div className="flex justify-between border-t border-[#E8E0D5] font-medium text-[14px] text-[#1E1E1E] pt-3 mt-1">

                                    <span>Total</span>

                                    <span className="flex items-center">
                                        <MdOutlineCurrencyRupee />
                                        {total.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>

                            {/* PROMO */}
                            <div className="flex flex-col sm:flex-row gap-2 my-4">

                                <input
                                    type="text"
                                    placeholder="Promo / gift code"
                                    className="border border-[#E8E0D5] flex-1 py-2 px-3 bg-white rounded-md text-[12px] text-[#1E1E1E] outline-none"
                                />

                                <button
                                    type="button"
                                    className="bg-[#2C2016] border-none rounded-md text-[11px] text-[#D6BFA7] py-2 px-4 cursor-pointer hover:bg-[#8B5E3C] hover:text-[#F5F0EB] transition"
                                >
                                    Apply
                                </button>
                            </div>

                            {/* PURCHASE PROTECTION */}
                            <div className="border border-[#E8E0D5] p-3.5 mt-4 bg-white rounded-[10px]">

                                <div className="text-[11px] font-medium text-[#1E1E1E] flex items-center mb-2">

                                    <TbShieldCheck className="text-[#8B5E3C] mr-1.5" />

                                    Purchase Protection
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
    );
}