"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TbTruckDelivery, TbDiscount } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import {
    IoEyeOutline,
    IoEyeOffOutline,
    IoLogoGoogle,
} from "react-icons/io5";
import { RiAppleFill } from "react-icons/ri";
import Link from "next/link";

export default function Page() {
    const router = useRouter();
    useEffect(() => {
        async function checkIfLoggedIn() {
            try {
                const res = await client.get("user/profile");
                if (res.data.success) {
                    router.push("/");
                }
            } catch (err) {
                // not logged in, login page pe hi rehne do
            }
        }
        checkIfLoggedIn();
    }, []);

    const [activeTab, setActiveTab] = useState("signin");

    const [showPassword, setShowPassword] = useState(false);
    const [showSignupPassword, setShowSignupPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [signupData, setSignupData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
    });

    const features = [
        {
            icon: <TbTruckDelivery />,
            text: "Free delivery + white glove assembly on all orders",
        },
        {
            icon: <FaRegStar />,
            text: "Earn reward points on every purchase",
        },
        {
            icon: <TbDiscount />,
            text: "Members-only prices & early access",
        },
    ];

    // ================= LOGIN INPUT =================

    function handleLoginChange(e) {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    }

    // ================= SIGNUP INPUT =================

    function handleSignupChange(e) {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    }

    // ================= LOGIN =================

    async function loginHandler(e) {
        e.preventDefault();

        if (!loginData.email || !loginData.password) {
            toast.error("Please enter email and password");
            return;
        }

        try {
            setLoading(true);

            const response = await client.post(
                "user/login",
                loginData
            );

            if (response.data.success) {
                toast.success(
                    response.data.message || "Login successful"
                );
                 if (response.data.user?.token) {
        localStorage.setItem("token", response.data.user.token);
                 }

                setLoginData({
                    email: "",
                    password: "",
                });

                // Same cart sync logic as your old login
                try {
                    const cart =
                        typeof window !== "undefined"
                            ? JSON.parse(
                                  localStorage.getItem("cart") || "[]"
                              )
                            : [];

                    await client.post("cart/sync", {
                        localcart: cart ?? null,
                    });
                } catch (cartError) {
                    console.log(
                        "Cart Sync Error:",
                        cartError
                    );
                }

                router.push("/");
            }
        } catch (error) {
            console.log("Login Error:", error);

            toast.error(
                error.response?.data?.message ||
                    "Internal Server Error"
            );
        } finally {
            setLoading(false);
        }
    }

    // ================= CREATE ACCOUNT =================

    async function signupHandler(e) {
        e.preventDefault();

        if (
            !signupData.firstName ||
            !signupData.lastName ||
            !signupData.email ||
            !signupData.password ||
            !signupData.phone
        ) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const response = await client.post(
                "user/register",
                signupData
            );

            if (response.data.success) {
                toast.success(
                    response.data.message ||
                        "Account created successfully"
                );

                setSignupData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    phone: "",
                });

                // Go to Sign In after registration
                setActiveTab("signin");
            }
        } catch (error) {
            console.log("Register Error:", error);

            toast.error(
                error.response?.data?.message ||
                    "Internal Server Error"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#F8F5F1] overflow-auto">

            {/* ================= LEFT SIDE ================= */}

            <div className="w-full lg:w-[42%] bg-[#2C2016] flex flex-col justify-center items-center px-6 sm:px-8 lg:px-12 py-10">

                {/* Logo */}

                <div className="text-[18px] font-medium tracking-[0.14em] uppercase text-[#FAF7F4] mb-8">
                    Nestro <span className="text-[#C6A27E]">.</span>
                </div>

                {/* Image */}

                <div className="w-full max-w-[420px] h-[260px] mb-8 flex items-center justify-center overflow-hidden rounded-2xl">

                    <img
                        src="/hero/hero.png"
                        alt="Nestro Furniture"
                        className="w-full h-full object-contain"
                    />

                </div>

                {/* Heading */}

                <div className="text-[22px] sm:text-[26px] lg:text-[28px] font-normal text-center tracking-[-0.02em] leading-tight text-[#FAF7F4] mb-3">

                    Your
                    <em className="text-[#D6BFA7]">
                        {" "}Dream Home
                    </em>

                    <br />

                    Starts Here

                </div>

                {/* Description */}

                <div className="text-[11px] sm:text-[12px] text-[#ffffff73] text-center leading-[1.7] mb-6 max-w-xs">

                    Join 12,000 homeowners who've transformed
                    their living spaces with Nestro.

                </div>

                {/* Features */}

                <div className="space-y-3 w-full max-w-xs">

                    {features.map((item, index) => (

                        <div
                            key={index}
                            className="flex gap-2.5 items-center"
                        >

                            <div className="w-7 h-7 bg-[#c6a27e26] rounded-md flex items-center justify-center text-[#C6A27E] text-[14px] shrink-0">

                                {item.icon}

                            </div>

                            <div className="text-[11px] sm:text-[12px] text-[#ffffff8c] leading-normal">

                                {item.text}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {/* ================= RIGHT SIDE ================= */}

            <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-8 lg:px-10 py-8 lg:py-10">

                <div className="w-full max-w-md mx-auto">

                    {/* ================= TABS ================= */}

                    <div className="flex gap-6 mb-6 border-b border-[#E8E0D5]">

                        <button
                            type="button"
                            onClick={() => setActiveTab("signin")}
                            className={`text-[13px] pb-3 cursor-pointer border-b-2 transition ${
                                activeTab === "signin"
                                    ? "text-[#8B5E3C] border-[#8B5E3C]"
                                    : "text-[#6B7280] border-transparent hover:text-[#8B5E3C]"
                            }`}
                        >
                            Sign In
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("signup")}
                            className={`text-[13px] pb-3 cursor-pointer border-b-2 transition ${
                                activeTab === "signup"
                                    ? "text-[#8B5E3C] border-[#8B5E3C]"
                                    : "text-[#6B7280] border-transparent hover:text-[#8B5E3C]"
                            }`}
                        >
                            Create Account
                        </button>

                    </div>

                    {/* ================================================= */}
                    {/* ================= SIGN IN ======================= */}
                    {/* ================================================= */}

                    {activeTab === "signin" && (

                        <form onSubmit={loginHandler}>

                            <div className="text-[20px] font-medium text-[#1E1E1E] mb-1">
                                Welcome back
                            </div>

                            <div className="text-[12px] text-[#6B7280] mb-6 leading-relaxed">
                                Sign in to your Nestro account to continue.
                            </div>

                            {/* Email */}

                            <div>

                                <label className="block text-[12px] font-medium text-[#6B7280] mb-1.5 tracking-wide">
                                    Email address
                                </label>

                                <input
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2.5 border border-[#E8E0D5] rounded-md text-[13px] text-[#1E1E1E] bg-white outline-none focus:border-[#8B5E3C] transition"
                                />

                            </div>

                            {/* Password */}

                            <div className="mt-4 mb-2">

                                <label className="block text-[12px] font-medium text-[#6B7280] mb-1.5 tracking-wide">
                                    Password
                                </label>

                                <div className="relative">

                                    <input
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleLoginChange}
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="••••••••"
                                        className="w-full px-3 py-2.5 border border-[#E8E0D5] rounded-md text-[13px] text-[#1E1E1E] bg-white outline-none focus:border-[#8B5E3C] pr-10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#8B5E3C]"
                                    >
                                        {showPassword ? (
                                            <IoEyeOffOutline size={16} />
                                        ) : (
                                            <IoEyeOutline size={16} />
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* Forgot Password */}

                            <div className="text-right mb-5">

                                <Link
                                    href="/forgot-password"
                                    className="text-[11px] text-[#8B5E3C] hover:underline"
                                >
                                    Forgot Password?
                                </Link>

                            </div>

                            {/* LOGIN BUTTON */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 bg-[#8B5E3C] text-white rounded-md text-[13px] font-medium tracking-wide hover:bg-[#7a4f32] transition mb-4 disabled:opacity-50"
                            >

                                {loading
                                    ? "Signing in..."
                                    : "Sign In"}

                            </button>

                            {/* OR */}

                            <div className="flex items-center gap-3 mb-4">

                                <div className="flex-1 h-px bg-[#E8E0D5]" />

                                <span className="text-[11px] text-[#6B7280]">
                                    or continue with
                                </span>

                                <div className="flex-1 h-px bg-[#E8E0D5]" />

                            </div>

                            {/* Google */}

                            <button
                                type="button"
                                className="w-full py-2 border border-[#E8E0D5] rounded-md text-[12px] text-[#444] bg-white flex items-center justify-center gap-2 hover:bg-gray-50 transition mb-2"
                            >

                                <IoLogoGoogle />

                                Continue with Google

                            </button>

                            {/* Apple */}

                            <button
                                type="button"
                                className="w-full py-2 border border-[#E8E0D5] rounded-md text-[12px] text-[#444] bg-white flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                            >

                                <RiAppleFill />

                                Continue with Apple

                            </button>

                            {/* Create Account */}

                            <div className="text-center mt-5">

                                <span className="text-[10px] text-[#6B7280]">

                                    Don't have an account?{" "}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveTab("signup")
                                        }
                                        className="text-[#8B5E3C] hover:underline"
                                    >
                                        Create one
                                    </button>

                                </span>

                            </div>

                        </form>

                    )}

                    {/* ================================================= */}
                    {/* ================= SIGN UP ======================= */}
                    {/* ================================================= */}

                    {activeTab === "signup" && (

                        <form onSubmit={signupHandler}>

                            <div className="text-[20px] font-medium text-[#1E1E1E] mb-1">
                                Create account
                            </div>

                            <div className="text-[12px] text-[#6B7280] mb-6 leading-relaxed">
                                Join Nestro and start designing your dream home.
                            </div>

                            {/* First + Last Name */}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">

                                <div>

                                    <label className="block text-[12px] font-medium text-[#6B7280] tracking-wide">
                                        First Name
                                    </label>

                                    <input
                                        name="firstName"
                                        value={signupData.firstName}
                                        onChange={handleSignupChange}
                                        type="text"
                                        placeholder="Madhav"
                                        className="w-full px-3 py-2.5 border border-[#E8E0D5] rounded-md text-[13px] text-[#1E1E1E] bg-white outline-none focus:border-[#8B5E3C]"
                                    />

                                </div>

                                <div>

                                    <label className="block text-[12px] font-medium text-[#6B7280] tracking-wide">
                                        Last Name
                                    </label>

                                    <input
                                        name="lastName"
                                        value={signupData.lastName}
                                        onChange={handleSignupChange}
                                        type="text"
                                        placeholder="Arora"
                                        className="w-full px-3 py-2.5 border border-[#E8E0D5] rounded-md text-[13px] text-[#1E1E1E] bg-white outline-none focus:border-[#8B5E3C]"
                                    />

                                </div>

                            </div>

                            {/* Email */}

                            <div className="mb-3">

                                <label className="block text-[12px] font-medium text-[#6B7280] tracking-wide">
                                    Email address
                                </label>

                                <input
                                    name="email"
                                    value={signupData.email}
                                    onChange={handleSignupChange}
                                    type="email"
                                    placeholder="aroramadhav2111@gmail.com"
                                    className="w-full px-3 py-2.5 border border-[#E8E0D5] rounded-md text-[13px] text-[#1E1E1E] bg-white outline-none focus:border-[#8B5E3C]"
                                />

                            </div>

                            {/* Password */}

                            <div className="mb-3">

                                <label className="block text-[12px] font-medium text-[#6B7280] tracking-wide">
                                    Password
                                </label>

                                <div className="relative">

                                    <input
                                        name="password"
                                        value={signupData.password}
                                        onChange={handleSignupChange}
                                        type={
                                            showSignupPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Min. 8 characters"
                                        className="w-full px-3 py-2.5 border border-[#E8E0D5] rounded-md text-[13px] text-[#1E1E1E] bg-white outline-none focus:border-[#8B5E3C] pr-10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowSignupPassword(
                                                !showSignupPassword
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#8B5E3C]"
                                    >
                                        {showSignupPassword ? (
                                            <IoEyeOffOutline size={16} />
                                        ) : (
                                            <IoEyeOutline size={16} />
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* Phone */}

                            <div className="mb-4">

                                <label className="block text-[12px] font-medium text-[#6B7280] tracking-wide">
                                    Phone Number
                                </label>

                                <input
                                    name="phone"
                                    value={signupData.phone}
                                    onChange={handleSignupChange}
                                    type="tel"
                                    placeholder="123-456-7890"
                                    className="w-full px-3 py-2.5 border border-[#E8E0D5] rounded-md text-[13px] text-[#1E1E1E] bg-white outline-none focus:border-[#8B5E3C]"
                                />

                            </div>

                            {/* Terms */}

                            <div className="flex items-start gap-2 mb-3">

                                <input
                                    type="checkbox"
                                    required
                                    className="mt-0.5 accent-[#8B5E3C]"
                                />

                                <label className="text-[11px] sm:text-[12px] text-[#6B7280]">

                                    I agree to the{" "}

                                    <Link
                                        href="/terms"
                                        className="text-[#8B5E3C] hover:underline"
                                    >
                                        Terms of Service & Privacy Policy
                                    </Link>

                                </label>

                            </div>

                            {/* Offers */}

                            <div className="flex items-start gap-2 mb-5">

                                <input
                                    type="checkbox"
                                    className="mt-0.5 accent-[#8B5E3C]"
                                />

                                <label className="text-[11px] sm:text-[12px] text-[#6B7280]">
                                    Send me design tips & exclusive offers
                                </label>

                            </div>

                            {/* CREATE ACCOUNT */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 bg-[#8B5E3C] text-white rounded-md text-[13px] font-medium tracking-wide hover:bg-[#7a4f32] transition mb-4 disabled:opacity-50"
                            >

                                {loading
                                    ? "Creating account..."
                                    : "Create Account"}

                            </button>

                            {/* OR */}

                            <div className="flex items-center gap-3 mb-4">

                                <div className="flex-1 h-px bg-[#E8E0D5]" />

                                <span className="text-[11px] text-[#6B7280]">
                                    or sign up with
                                </span>

                                <div className="flex-1 h-px bg-[#E8E0D5]" />

                            </div>

                            {/* Google */}

                            <button
                                type="button"
                                className="w-full py-2 border border-[#E8E0D5] rounded-md text-[12px] text-[#444] bg-white flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                            >

                                <IoLogoGoogle />

                                Continue with Google

                            </button>

                            {/* Sign In */}

                            <div className="text-center mt-5">

                                <span className="text-[10px] text-[#6B7280]">

                                    Already have an account?{" "}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveTab("signin")
                                        }
                                        className="text-[#8B5E3C] hover:underline"
                                    >
                                        Sign in
                                    </button>

                                </span>

                            </div>

                        </form>

                    )}

                </div>

            </div>

        </div>
    );
}