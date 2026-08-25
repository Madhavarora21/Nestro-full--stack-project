"use client";

import { client, generateSlug } from "@/utils/helper";
import { useEffect, useState, use } from "react";
import Select from "react-select";
import { Editor } from "primereact/editor";
import { FiSave, FiTag, FiX } from "react-icons/fi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
    fetchCategory,
    fetchProductById,
    fetchRooms,
} from "@/utils/api";

export default function EditProductPage({ params }) {
    const { param } = use(params);
    const router = useRouter();

    const [rooms, setRooms] = useState([]);
    const [categories, setCategories] = useState([]);

    const [wait, setWait] = useState(true);
    const [imageUploading, setImageUploading] = useState(false);

    // Thumbnail
    const [existingImage, setExistingImage] = useState("");
    const [isImageChanged, setIsImageChanged] = useState(false);

    // Additional images
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);

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
        image: null,
    });

    // -----------------------------
    // NAME + SLUG
    // -----------------------------

    const handleNameChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            name: value,
            slug: generateSlug(value),
        }));
    };

    // -----------------------------
    // NORMAL INPUT CHANGE
    // -----------------------------

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // -----------------------------
    // THUMBNAIL CHANGE
    // -----------------------------

    const handleImage = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            image: file,
        }));

        setIsImageChanged(true);
    };

    // -----------------------------
    // ADDITIONAL IMAGES
    // -----------------------------

    const handleAdditionalImages = (e) => {
        const files = Array.from(e.target.files || []);

        if (files.length === 0) return;

        if (files.length > 4) {
            toast.error("You can select maximum 4 images");
            return;
        }

        setNewImages(files);
    };

    // -----------------------------
    // REMOVE NEW IMAGE
    // -----------------------------

    const removeNewImage = (index) => {
        setNewImages((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    // -----------------------------
    // FETCH ROOMS + CATEGORIES
    // -----------------------------

    useEffect(() => {
        async function getData() {
            try {
                const [roomResponse, categoryResponse] =
                    await Promise.all([
                        fetchRooms(),
                        fetchCategory(),
                    ]);

                setRooms(roomResponse?.data || []);
                setCategories(categoryResponse?.data || []);

            } catch (error) {
                console.log(
                    "Dropdown fetch error:",
                    error
                );
            }
        }

        getData();
    }, []);

    // -----------------------------
    // FETCH PRODUCT
    // -----------------------------

    useEffect(() => {
        async function getProduct() {
            try {
                const response =
                    await fetchProductById(param);

                if (
                    response?.success &&
                    response?.data
                ) {
                    const product = response.data;

                    setFormData({
                        roomId:
                            typeof product.roomId === "object"
                                ? product.roomId?._id || ""
                                : product.roomId || "",

                        categoryId:
                            typeof product.categoryId === "object"
                                ? product.categoryId?._id || ""
                                : product.categoryId || "",

                        name: product.name || "",
                        slug: product.slug || "",

                        originalPrice:
                            product.originalPrice || "",

                        salePrice:
                            product.salePrice || "",

                        discount:
                            product.discount || "",

                        shortDescription:
                            product.shortDescription || "",

                        description:
                            product.description || "",

                        material:
                            product.material || "",

                        color:
                            product.color || "",

                        width:
                            product.dimensions?.width || "",

                        height:
                            product.dimensions?.height || "",

                        depth:
                            product.dimensions?.depth || "",

                        weight:
                            product.weight || "",

                        seoTitle:
                            product.seoTitle || "",

                        seoDescription:
                            product.seoDescription || "",

                        image: null,
                    });

                    // Existing thumbnail
                    setExistingImage(
                        product.thumbnail ||
                        product.image ||
                        ""
                    );

                    // Existing additional images
                    setExistingImages(
                        Array.isArray(product.images)
                            ? product.images
                            : []
                    );

                    setIsImageChanged(false);

                } else {
                    toast.error(
                        response?.message ||
                        "Failed to load product"
                    );
                }

            } catch (error) {
                console.log(
                    "FETCH PRODUCT BY ID ERROR:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load product"
                );

            } finally {
                setWait(false);
            }
        }

        if (param) {
            getProduct();
        }

    }, [param]);

    // -----------------------------
    // AUTO DISCOUNT
    // -----------------------------

    useEffect(() => {
        const originalPrice =
            Number(formData.originalPrice);

        const salePrice =
            Number(formData.salePrice);

        if (
            originalPrice > 0 &&
            salePrice >= 0 &&
            salePrice <= originalPrice
        ) {
            const discount = Math.round(
                ((originalPrice - salePrice) /
                    originalPrice) *
                100
            );

            setFormData((prev) => ({
                ...prev,
                discount,
            }));

        } else {
            setFormData((prev) => ({
                ...prev,
                discount: "",
            }));
        }

    }, [
        formData.originalPrice,
        formData.salePrice,
    ]);

    // -----------------------------
    // SUBMIT
    // -----------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setWait(true);

            // =====================================
            // STEP 1: UPDATE PRODUCT DETAILS
            // =====================================

            const sendData = new FormData();

            sendData.append(
                "roomId",
                formData.roomId
            );

            sendData.append(
                "categoryId",
                formData.categoryId
            );

            sendData.append(
                "name",
                formData.name
            );

            sendData.append(
                "slug",
                formData.slug
            );

            sendData.append(
                "originalPrice",
                formData.originalPrice
            );

            sendData.append(
                "salePrice",
                formData.salePrice
            );

            sendData.append(
                "discount",
                formData.discount
            );

            sendData.append(
                "shortDescription",
                formData.shortDescription
            );

            sendData.append(
                "description",
                formData.description
            );

            sendData.append(
                "material",
                formData.material
            );

            sendData.append(
                "color",
                formData.color
            );

            sendData.append(
                "width",
                formData.width
            );

            sendData.append(
                "height",
                formData.height
            );

            sendData.append(
                "depth",
                formData.depth
            );

            sendData.append(
                "weight",
                formData.weight
            );

            sendData.append(
                "seoTitle",
                formData.seoTitle
            );

            sendData.append(
                "seoDescription",
                formData.seoDescription
            );

            // Thumbnail only if changed
            if (
                isImageChanged &&
                formData.image
            ) {
                sendData.append(
                    "image",
                    formData.image
                );
            }

            const response =
                await client.put(
                    `product/update/${param}`,
                    sendData
                );

            if (!response.data.success) {
                toast.error(
                    response.data.message ||
                    "Product update failed"
                );

                setWait(false);
                return;
            }

            // =====================================
            // STEP 2: ADDITIONAL IMAGES
            // =====================================

            if (newImages.length > 0) {
                setImageUploading(true);

                const imageData =
                    new FormData();

                newImages.forEach((file) => {
                    imageData.append(
                        "images",
                        file
                    );
                });

                const imageResponse =
                    await client.post(
                        `product/add-multiple-images/${param}`,
                        imageData
                    );

                if (
                    !imageResponse.data.success
                ) {
                    toast.error(
                        imageResponse.data.message ||
                        "Additional images upload failed"
                    );

                    setImageUploading(false);
                    setWait(false);

                    return;
                }

                setImageUploading(false);
            }

            // =====================================
            // SUCCESS
            // =====================================

            toast.success(
                response.data.message ||
                "Product updated successfully"
            );

            router.push(
                "/admin/product"
            );

        } catch (error) {
            console.log(
                "UPDATE PRODUCT ERROR:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Internal Server Error"
            );

        } finally {
            setWait(false);
            setImageUploading(false);
        }
    };

    // -----------------------------
    // OPTIONS
    // -----------------------------

    const roomOptions = rooms.map(
        (room) => ({
            value: room._id,
            label: room.name,
        })
    );

    const categoryOptions =
        categories.map(
            (category) => ({
                value: category._id,
                label: category.name,
            })
        );

    const selectedRoom =
        roomOptions.find(
            (option) =>
                option.value ===
                formData.roomId
        ) || null;

    const selectedCategory =
        categoryOptions.find(
            (option) =>
                option.value ===
                formData.categoryId
        ) || null;

    // -----------------------------
    // LOADING
    // -----------------------------

    if (
        wait &&
        !formData.name
    ) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f7f8fd]">

                <div className="text-center">

                    <h2 className="text-xl font-semibold text-gray-700">
                        Loading Product...
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Fetching product details
                    </p>

                </div>

            </div>
        );
    }

    // -----------------------------
    // UI
    // -----------------------------

    return (
        <div className="min-h-screen mx-auto bg-[#f7f8fd] p-6">

            <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-[#eef0f8] shadow-md overflow-hidden">

                {/* HEADER */}

                <div className="bg-[#3b497e] px-5 py-4 flex items-center gap-2 text-white">

                    <FiTag size={18} />

                    <h2 className="text-[15px] font-semibold">
                        Product Edit
                    </h2>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-5 space-y-5"
                >

                    {/* NAME + SLUG */}

                    <div className="grid md:grid-cols-2 gap-5">

                        <div className="flex flex-col gap-1.5">

                            <label className="text-xs font-semibold text-[#2a3460]">
                                Product Name *
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) =>
                                    handleNameChange(
                                        e.target.value
                                    )
                                }
                                required
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

                    {/* ROOM + CATEGORY */}

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>

                            <label className="text-xs font-semibold text-[#2a3460]">
                                Room *
                            </label>

                            <Select
                                options={roomOptions}
                                value={selectedRoom}
                                onChange={(selected) =>
                                    setFormData(
                                        (prev) => ({
                                            ...prev,
                                            roomId:
                                                selected?.value ||
                                                "",
                                        })
                                    )
                                }
                                placeholder="Select room"
                            />

                        </div>

                        <div>

                            <label className="text-xs font-semibold text-[#2a3460]">
                                Category *
                            </label>

                            <Select
                                options={
                                    categoryOptions
                                }
                                value={
                                    selectedCategory
                                }
                                onChange={(
                                    selected
                                ) =>
                                    setFormData(
                                        (prev) => ({
                                            ...prev,
                                            categoryId:
                                                selected?.value ||
                                                "",
                                        })
                                    )
                                }
                                placeholder="Select category"
                            />

                        </div>

                    </div>

                    {/* PRICE */}

                    <div className="grid md:grid-cols-3 gap-5">

                        <input
                            type="number"
                            name="originalPrice"
                            placeholder="Original Price"
                            value={
                                formData.originalPrice
                            }
                            onChange={
                                handleChange
                            }
                            className="border rounded-xl px-4 py-3"
                        />

                        <input
                            type="number"
                            name="salePrice"
                            placeholder="Sale Price"
                            value={
                                formData.salePrice
                            }
                            onChange={
                                handleChange
                            }
                            className="border rounded-xl px-4 py-3"
                        />

                        <input
                            type="number"
                            name="discount"
                            placeholder="Discount %"
                            value={
                                formData.discount
                            }
                            readOnly
                            className="border rounded-xl px-4 py-3 bg-gray-50"
                        />

                    </div>

                    {/* MATERIAL */}

                    <div className="grid md:grid-cols-3 gap-5">

                        <input
                            type="text"
                            name="material"
                            placeholder="Material"
                            value={
                                formData.material
                            }
                            onChange={
                                handleChange
                            }
                            className="border rounded-xl px-4 py-3"
                        />

                        <input
                            type="text"
                            name="color"
                            placeholder="Color"
                            value={
                                formData.color
                            }
                            onChange={
                                handleChange
                            }
                            className="border rounded-xl px-4 py-3"
                        />

                        <input
                            type="number"
                            name="weight"
                            placeholder="Weight (KG)"
                            value={
                                formData.weight
                            }
                            onChange={
                                handleChange
                            }
                            className="border rounded-xl px-4 py-3"
                        />

                    </div>

                    {/* DIMENSIONS */}

                    <div className="grid md:grid-cols-3 gap-5">

                        <input
                            type="number"
                            name="width"
                            placeholder="Width"
                            value={
                                formData.width
                            }
                            onChange={
                                handleChange
                            }
                            className="border rounded-xl px-4 py-3"
                        />

                        <input
                            type="number"
                            name="height"
                            placeholder="Height"
                            value={
                                formData.height
                            }
                            onChange={
                                handleChange
                            }
                            className="border rounded-xl px-4 py-3"
                        />

                        <input
                            type="number"
                            name="depth"
                            placeholder="Depth"
                            value={
                                formData.depth
                            }
                            onChange={
                                handleChange
                            }
                            className="border rounded-xl px-4 py-3"
                        />

                    </div>

                    {/* DESCRIPTION */}

                    <div className="grid md:grid-cols-2 gap-5">

                        <textarea
                            name="shortDescription"
                            placeholder="Short Description"
                            value={
                                formData.shortDescription
                            }
                            onChange={
                                handleChange
                            }
                            rows={5}
                            className="border rounded-xl col-span-full px-4 py-3"
                        />

                        <div className="border rounded-xl col-span-full px-4 py-3">

                            <Editor
                                value={
                                    formData.description
                                }
                                onTextChange={(e) => {
                                    setFormData(
                                        (prev) => ({
                                            ...prev,
                                            description:
                                                e.htmlValue,
                                        })
                                    );
                                }}
                            />

                        </div>

                    </div>

                    {/* SEO */}

                    <div className="grid md:grid-cols-2 gap-5">

                        <input
                            type="text"
                            name="seoTitle"
                            placeholder="SEO Title"
                            value={
                                formData.seoTitle
                            }
                            onChange={
                                handleChange
                            }
                            className="border rounded-xl px-4 py-3"
                        />

                        <textarea
                            name="seoDescription"
                            placeholder="SEO Description"
                            value={
                                formData.seoDescription
                            }
                            onChange={
                                handleChange
                            }
                            rows={3}
                            className="border rounded-xl px-4 py-3"
                        />

                    </div>

                    {/* =====================================
                        THUMBNAIL
                    ===================================== */}

                    <div className="flex flex-col gap-1.5">

                        <label className="text-xs font-semibold text-[#2a3460]">
                            Thumbnail
                        </label>

                        {existingImage &&
                            !isImageChanged && (
                                <div className="mb-2">

                                    <p className="text-xs text-gray-500 mb-1">
                                        Current thumbnail:
                                    </p>

                                    <img
                                        src={
                                            existingImage
                                        }
                                        alt="Current product"
                                        className="w-28 h-28 object-cover rounded-xl border"
                                    />

                                </div>
                            )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={
                                handleImage
                            }
                            className="border-[1.5px] border-[#c3c9e3] rounded-xl px-4 py-3 text-sm text-[#3a3f5c]"
                        />

                        {isImageChanged &&
                            formData.image && (
                                <div className="mt-2">

                                    <p className="text-xs text-gray-500 mb-1">
                                        New thumbnail:
                                    </p>

                                    <img
                                        src={URL.createObjectURL(
                                            formData.image
                                        )}
                                        alt="New thumbnail"
                                        className="w-28 h-28 object-cover rounded-xl border"
                                    />

                                </div>
                            )}

                        <span className="text-[11px] text-[#7a84a6]">
                            Leave empty to keep current thumbnail
                        </span>

                    </div>

                    {/* =====================================
                        ADDITIONAL IMAGES
                    ===================================== */}

                    <div className="flex flex-col gap-2">

                        <label className="text-xs font-semibold text-[#2a3460]">
                            Additional Images
                        </label>

                        {/* EXISTING */}

                        {existingImages.length > 0 && (
                            <div>

                                <p className="text-xs text-gray-500 mb-2">
                                    Current images:
                                </p>

                                <div className="flex flex-wrap gap-3">

                                    {existingImages.map(
                                        (
                                            image,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    index
                                                }
                                                className="relative"
                                            >

                                                <img
                                                    src={
                                                        image
                                                    }
                                                    alt={`Product ${index + 1}`}
                                                    className="w-24 h-24 object-cover rounded-xl border"
                                                />

                                                <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md">
                                                    Image{" "}
                                                    {index +
                                                        1}
                                                </span>

                                            </div>
                                        )
                                    )}

                                </div>

                            </div>
                        )}

                        {/* SELECT NEW */}

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={
                                handleAdditionalImages
                            }
                            className="border-[1.5px] border-[#c3c9e3] rounded-xl px-4 py-3 text-sm text-[#3a3f5c]"
                        />

                        {/* NEW PREVIEW */}

                        {newImages.length > 0 && (
                            <div>

                                <p className="text-xs text-gray-500 mb-2">
                                    New images:
                                </p>

                                <div className="flex flex-wrap gap-3">

                                    {newImages.map(
                                        (
                                            file,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    index
                                                }
                                                className="relative"
                                            >

                                                <img
                                                    src={URL.createObjectURL(
                                                        file
                                                    )}
                                                    alt={`New image ${index + 1}`}
                                                    className="w-24 h-24 object-cover rounded-xl border"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeNewImage(
                                                            index
                                                        )
                                                    }
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                                >
                                                    <FiX
                                                        size={
                                                            12
                                                        }
                                                    />
                                                </button>

                                                <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md">
                                                    New{" "}
                                                    {index +
                                                        1}
                                                </span>

                                            </div>
                                        )
                                    )}

                                </div>

                            </div>
                        )}

                        <span className="text-[11px] text-[#7a84a6]">
                            Select up to 4 additional images
                        </span>

                    </div>

                    {/* BUTTONS */}

                    <div className="flex items-center justify-end gap-3 pt-2">

                        <button
                            type="button"
                            onClick={() =>
                                router.push(
                                    "/admin/product"
                                )
                            }
                            className="px-5 py-2.5 rounded-xl border-[1.5px] border-[#c3c9e3] text-sm font-medium text-[#3a3f5c] hover:bg-[#f4f5fb]"
                        >
                            Cancel
                        </button>

                        {!wait ? (
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 bg-[#3b497e] hover:bg-[#2a3460] text-white rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md"
                            >

                                <FiSave
                                    size={16}
                                />

                                {imageUploading
                                    ? "Uploading Images..."
                                    : "Update Product"}

                            </button>
                        ) : (
                            <button
                                type="button"
                                disabled
                                className="bg-gray-400 text-white px-5 py-2.5 rounded-xl cursor-not-allowed"
                            >
                                Updating...
                            </button>
                        )}

                    </div>

                </form>

            </div>

        </div>
    );
}