"use client";

import { client, generateSlug } from "@/utils/helper";
import { useEffect, useState } from "react";
import Select from 'react-select'

import { Editor } from 'primereact/editor';


import {
    FiSave,
    FiTag,
} from "react-icons/fi";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fetchCategory, fetchRooms } from "@/utils/api";

export default function AddCategoryPage() {
    const [rooms, setRooms] = useState([]);
    const [categories, setCategories] = useState([]);
    const router = useRouter();
    const [wait, setWait] = useState(false);

    const [formData, setFormData] = useState({
        roomId: "",
        categoryId: "",
        name: "",
        slug: "",
        originalPrice: "",
        salePrice: "",
        discount: "",
        shortDescription: "",
        description: "",
        material: "",
        color: "",
        width: "",
        height: "",
        depth: "",
        weight: "",
        seoTitle: "",
        seoDescription: "",
        newArrival: false,
        image: null
    });

    // Auto Generate Slug
    const handleNameChange = (value) => {

        setFormData({
            ...formData,
            name: value,
            slug: generateSlug(value),
        });
    };

    // Handle Image
    const handleImage = (e) => {

        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setWait(true);

            const sendData = new FormData();

            Object.keys(formData).forEach((key) => {
                sendData.append(key, formData[key]);
            });

            const response = await client.post(
                "product/create",
                sendData
            );

            if (response.data.success) {
                toast.success(response.data.message);

                router.push("/admin/product");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Internal Server Error"
            );
        } finally {
            setWait(false);
        }
    };

    useEffect(() => {
        async function getData() {
            try {
                const [roomResponse, categoryResponse] =
                    await Promise.all([
                        fetchRooms(),
                        fetchCategory(),
                    ]);



                setRooms(roomResponse.data || []);
                setCategories(categoryResponse.data || [])
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, []);

    useEffect(() => {

        const originalPrice = Number(formData.originalPrice);
        const salePrice = Number(formData.salePrice);

        if (
            originalPrice > 0 &&
            salePrice >= 0 &&
            salePrice <= originalPrice
        ) {

            const discount = Math.round(
                ((originalPrice - salePrice) / originalPrice) * 100
            );

            setFormData(prev => ({
                ...prev,
                discount
            }));
        }
        else {

            setFormData(prev => ({
                ...prev,
                discount: ""
            }));
        }

    }, [formData.originalPrice, formData.salePrice]);



    return (
        <div className="min-h-screen mx-auto bg-[#f7f8fd] p-6">


            {/* Card */}
            <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-[#eef0f8] shadow-md overflow-hidden">

                {/* Card Header */}
                <div className="bg-[#3b497e] px-5 py-4 flex items-center gap-2 text-white">

                    <FiTag size={18} />

                    <h2 className="text-[15px] font-semibold">
                        Product Add
                    </h2>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-5 space-y-5"
                >

                    {/* Basic Information */}
                    <div className="grid md:grid-cols-2 gap-5">

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#2a3460]">
                                Product Name *
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="border-[1.5px] border-[#c3c9e3] rounded-xl px-4 py-3"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#2a3460]">
                                Slug
                            </label>

                            <input
                                type="text"
                                value={formData.slug}
                                readOnly
                                className="border-[1.5px] border-[#c3c9e3] rounded-xl px-4 py-3 bg-gray-50"
                            />
                        </div>

                    </div>
                    <div className="grid md:grid-cols-2 gap-5">

                        <div>
                            <label className="text-xs font-semibold text-[#2a3460]">
                                Room *
                            </label>

                            <Select
                                options={rooms.map(room => ({
                                    value: room._id,
                                    label: room.name
                                }))}
                                onChange={(selected) =>
                                    setFormData({
                                        ...formData,
                                        roomId: selected.value
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-[#2a3460]">
                                Category *
                            </label>

                            <Select
                                options={categories.map(category => ({
                                    value: category._id,
                                    label: category.name
                                }))}
                                onChange={(selected) =>
                                    setFormData({
                                        ...formData,
                                        categoryId: selected.value
                                    })
                                }
                            />
                        </div>

                    </div>
                    <div className="grid md:grid-cols-3 gap-5">

                        <input
                            type="number"
                            name="originalPrice"
                            placeholder="Original Price"
                            value={formData.originalPrice}
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3"
                        />

                        <input
                            type="number"
                            name="salePrice"
                            placeholder="Sale Price"
                            value={formData.salePrice}
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3"
                        />

                        <input
                            type="number"
                            name="discount"
                            placeholder="Discount %"
                            value={formData.discount}
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3"
                        />

                    </div>
                    <div className="grid md:grid-cols-3 gap-5">

                        <input
                            type="text"
                            name="material"
                            placeholder="Material"
                            value={formData.material}
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3"
                        />

                        <input
                            type="text"
                            name="color"
                            placeholder="Color"
                            value={formData.color}
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3"
                        />

                        <input
                            type="number"
                            name="weight"
                            placeholder="Weight (KG)"
                            value={formData.weight}
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3"
                        />

                    </div>
                    <div className="grid md:grid-cols-3 gap-5">

                        <input
                            type="number"
                            name="width"
                            placeholder="Width"
                            value={formData.width}
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3"
                        />

                        <input
                            type="number"
                            name="height"
                            placeholder="Height"
                            value={formData.height}
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3"
                        />

                        <input
                            type="number"
                            name="depth"
                            placeholder="Depth"
                            value={formData.depth}
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3"
                        />

                    </div>
                    <div className="grid md:grid-cols-2 gap-5">

                        <textarea
                            name="shortDescription"
                            placeholder="Short Description"
                            value={formData.shortDescription}
                            onChange={handleChange}
                            rows={5}
                            className="border rounded-xl col-span-full px-4 py-3"
                        />





                        <div className="border rounded-xl col-span-full px-4 py-3 ">
                            <Editor value={formData.description} onTextChange={(e) => {
                                setFormData(prev => ({
                                    ...prev,
                                    description: e.htmlValue
                                }))
                            }}
                            />
                        </div>

                    </div>
                    <div className="grid md:grid-cols-2 gap-5">

                        <input
                            type="text"
                            name="seoTitle"
                            placeholder="SEO Title"
                            value={formData.seoTitle}
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3"
                        />

                        <textarea
                            name="seoDescription"
                            placeholder="SEO Description"
                            value={formData.seoDescription}
                            onChange={handleChange}
                            rows={3}
                            className="border rounded-xl px-4 py-3"
                        />

                    </div>

{/* New Arrival */}
<div className="flex items-center gap-3">
    <input
        type="checkbox"
        id="newArrival"
        checked={formData.newArrival}
        onChange={(e) =>
            setFormData({
                ...formData,
                newArrival: e.target.checked
            })
        }
        className="h-4 w-4"
    />

    <label
        htmlFor="newArrival"
        className="text-sm font-medium text-gray-700"
    >
        New Arrival
    </label>
</div>


                    {/* Image */}
                    <div className="flex flex-col gap-1.5">

                        <label className="text-xs font-semibold text-[#2a3460]">
                            thumbnail *
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="border-[1.5px] border-[#c3c9e3] rounded-xl px-4 py-3 text-sm text-[#3a3f5c]"

                        />

                        {/* Preview */}
                        {
                            formData.image &&
                            <img
                                src={URL.createObjectURL(formData.image)}
                                alt="preview"
                                className="w-28 h-28 object-cover rounded-xl border mt-2"
                            />
                        }
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">

                        <button
                            type="button"
                            className="px-5 py-2.5 rounded-xl border-[1.5px] border-[#c3c9e3] text-sm font-medium text-[#3a3f5c] hover:bg-[#f4f5fb]"
                        >
                            Cancel
                        </button>

                        {
                            !wait &&
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 bg-[#3b497e] hover:bg-[#2a3460] text-white rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md"
                            >
                                <FiSave size={16} />
                                Save Category
                            </button>
                        }

                        {
                            wait &&
                            <button
                                type="button"
                                className="bg-gray-400 text-white px-5 py-2.5 rounded-xl"
                            >
                                Uploading...
                            </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}