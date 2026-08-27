"use client"

import { client } from "@/utils/helper";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Page() {

   const cart = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart") || "[]")
    : [];
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    async function  loginHandler(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await client.post(
                "user/login",
                formData
            );
            if (response.data.success) {
                toast.success(response.data.message);
                

        
                setFormData({
                    email: "",
                    password: ""
                });

try {
    await client.post("cart/sync", {
        localcart: cart ?? null,
    });
} catch (cart_error) {
    console.log("Cart Sync Error:", cart_error);
}
               router.push("/");
            }
        }
        catch (error) {
            console.log(error);
            
            toast.error(
               
                
                error.response?.data?.message ||
                "Internal Server Error"
            );
        }
        finally {
            setLoading(false);
        }
    }
    return (

        <div className="min-h-screen w-full flex items-center justify-center bg-[#f8f5f1] px-5">


            <form
                onSubmit={loginHandler}
                className="max-w-md w-full bg-white p-8 rounded-2xl shadow"
            >


                <h2 className="text-3xl font-semibold">
                    Welcome back
                </h2>


                <p className="text-gray-500 mt-2 mb-10">
                    Sign in to your Nestro account to continue.
                </p>





                {/* Email */}

                <label className="text-gray-600">
                    Email address
                </label>


                <input

                    name="email"

                    value={formData.email}

                    onChange={handleChange}

                    type="email"

                    placeholder="rahul@email.com"

                    className="w-full mt-2 mb-6 px-5 py-4 border rounded-xl outline-none focus:ring-2 focus:ring-[#93633e]"

                />







                {/* Password */}


                <label className="text-gray-600">
                    Password
                </label>



                <div className="relative">


                    <input

                        name="password"

                        value={formData.password}

                        onChange={handleChange}

                        type={showPassword ? "text" : "password"}

                        placeholder="••••••••"

                        className="w-full mt-2 px-5 py-4 border rounded-xl outline-none focus:ring-2 focus:ring-[#93633e]"

                    />



                    <button

                        type="button"

                        onClick={() =>
                            setShowPassword(!showPassword)
                        }

                        className="absolute right-5 top-5"

                    >

                        👁

                    </button>



                </div>







                <div className="text-right mt-3">


                    <button
                        type="button"
                        className="text-[#93633e]"
                    >

                        Forgot password?

                    </button>


                </div>







                <button

                    disabled={loading}

                    className="w-full mt-6 bg-[#93633e] text-white py-4 rounded-xl hover:bg-[#7b5030] disabled:opacity-50"

                >

                    {
                        loading
                            ? "Signing in..."
                            : "Sign in"
                    }

                </button>









                <div className="flex items-center gap-3 my-7 text-gray-500">


                    <div className="h-px bg-gray-300 flex-1"></div>


                    or continue with


                    <div className="h-px bg-gray-300 flex-1"></div>


                </div>








                <button
                    type="button"
                    className="w-full border py-4 rounded-xl mb-4"
                >

                    ⓖ &nbsp; Continue with Google

                </button>





                <button

                    type="button"

                    className="w-full border py-4 rounded-xl"

                >

                     &nbsp; Continue with Apple

                </button>
                <div className="text-center mt-8 text-gray-500">


                    Don't have account?

                    <button

                        type="button"

                        onClick={() => router.push("/register")}

                        className="text-[#93633e] ml-2"

                    >

                        Create account

                    </button>


                </div>

            </form>


        </div>

    );
}