"use client";

import ActionDropdown from "@/components/admin/ActionDropdown";
import TableHeader from "@/components/admin/TableHeader";
import TableFilter from "@/components/admin/TableFilter";
import StatusBtn from "@/components/admin/StatusBtn";

import { fetchRooms } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Page() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await fetchRooms();

                if (response?.success === false) {
                    console.log("Fetch rooms error:", response.message);
                }

                setRooms(response?.data || []);
            } catch (error) {
                console.log("Room Type Error:", error);
                setRooms([]);
            } finally {
                setLoading(false);
            }
        };

        getRooms();
    }, []);

    return (
        <div className="min-h-screen p-4 lg:p-6">

            {/* Header */}
            <TableHeader
                title="Room Type"
                path="/admin/room-type/add"
            />

            <div className="rounded-[28px] border border-gray-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)]">

                {/* Filter */}
                <TableFilter />

                {/* Table Header */}
                <div className="hidden grid-cols-12 border-b border-gray-100 bg-gray-50 pl-6 pr-4 py-3 lg:grid">

                    <div className="col-span-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            ID
                        </p>
                    </div>

                    <div className="col-span-5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Name
                        </p>
                    </div>

                    <div className="col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Slug
                        </p>
                    </div>

                    <div className="col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Status
                        </p>
                    </div>

                    <div className="col-span-2 text-right">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Action
                        </p>
                    </div>

                </div>

                {/* TABLE BODY */}

                {loading ? (

                    <div className="flex min-h-75 items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-gray-700">
                                Loading...
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">
                                Fetching room types
                            </p>
                        </div>
                    </div>

                ) : rooms.length === 0 ? (

                    <div className="flex min-h-75 items-center justify-center">
                        <div className="text-center">

                            <h2 className="text-2xl font-bold text-gray-800">
                                No Room Type Found
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                There are no room types available right now.
                            </p>

                        </div>
                    </div>

                ) : (

                    <div>

                        {rooms.map((item, index) => (

                            <div
                                key={item._id || index}
                                className="grid grid-cols-1 gap-3 border-b border-gray-100 px-4 py-4 transition-all duration-300 hover:bg-gray-50/60 lg:grid-cols-12 lg:items-center"
                            >

                                {/* ID */}

                                <div className="hidden lg:block lg:col-span-1">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-xs font-bold text-gray-700">
                                        {index + 1}
                                    </div>

                                </div>

                                {/* NAME */}

                                <div className="lg:col-span-5 flex items-center gap-3">

                                    <div className="min-w-0">

                                        <h2 className="truncate text-sm font-bold text-gray-900">
                                            {item.name}
                                        </h2>

                                        <p className="mt-1 text-[11px] text-gray-500 lg:hidden">
                                            {item.slug}
                                        </p>

                                    </div>

                                </div>

                                {/* SLUG */}

                                <div className="hidden lg:block lg:col-span-2">

                                    <div className="inline-flex rounded-xl bg-gray-100 px-3 py-1.5 text-[11px] font-medium text-gray-600">
                                        {item.slug}
                                    </div>

                                </div>

                                {/* STATUS */}

                                <div className="lg:col-span-2">

                                    <StatusBtn
                                        status={item.status}
                                        path={`room-type/status-update/${item._id}`}
                                    />

                                </div>

                                {/* ACTION */}

                                <div className="hidden justify-end lg:col-span-2 lg:flex">

                                    <ActionDropdown
                                        module="room-type"
                                        id={item._id}
                                    />

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}