import { fetchCategory, fetchRooms } from "@/utils/api";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineFolder, HiOutlineHome, HiOutlineCheckCircle, HiOutlineXCircle, } from "react-icons/hi";


const isActive = (status) => {
  if (!status) return false;
  const activeValues = ["active", "Active", "ACTIVE", "true", true, 1];
  return activeValues.includes(status);
};

export default async function AdminDashboard() {
  const categories = await fetchCategory();
  const rooms = await fetchRooms();

  // ✅ Support both 'categories' (actual API) and 'data' (fallback)
  const categoriesArray = categories?.categories || categories?.data || [];
  const roomsArray = rooms?.rooms || rooms?.data || [];

  const totalCategories = categoriesArray.length;
  const totalRooms = roomsArray.length;
  const activeCategories = categoriesArray.filter((c) => isActive(c.status)).length;
  const activeRooms = roomsArray.filter((r) => isActive(r.status)).length;
  const inactiveCategories = totalCategories - activeCategories;
  const inactiveRooms = totalRooms - activeRooms;

  const recentCategories = categoriesArray.slice(0, 5);
  const recentRooms = roomsArray.slice(0, 5);

  return (
    <div className="min-h-screen p-4 lg:p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-600 capitalize">
          “Welcome back—your furniture legacy, updated below.”
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {/* Total Categories */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Total Categories</p>
              <p className="text-2xl font-bold text-gray-800">{totalCategories}</p>
            </div>
            <div className="rounded-full bg-blue-50 p-3 text-blue-600">
              <HiOutlineFolder size={24} />
            </div>
          </div>
        </div>

        {/* Total Room Types */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Total Room-Types</p>
              <p className="text-2xl font-bold text-gray-800">{totalRooms}</p>
            </div>
            <div className="rounded-full bg-purple-50 p-3 text-purple-600">
              <HiOutlineHome size={24} />
            </div>
          </div>
        </div>

        {/* Active Categories */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Active Categories</p>
              <p className="text-2xl font-bold text-green-600">{activeCategories}</p>
            </div>
            <div className="rounded-full bg-green-50 p-3 text-green-600">
              <HiOutlineCheckCircle size={24} />
            </div>
          </div>
        </div>

        {/* Active Room Types */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Active Room-Types</p>
              <p className="text-2xl font-bold text-green-600">{activeRooms}</p>
            </div>
            <div className="rounded-full bg-green-50 p-3 text-green-600">
              <HiOutlineCheckCircle size={24} />
            </div>
          </div>
        </div>

        {/* Inactive Categories */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Inactive Categories</p>
              <p className="text-2xl font-bold text-red-600">{inactiveCategories}</p>
            </div>
            <div className="rounded-full bg-red-50 p-3 text-red-600">
              <HiOutlineXCircle size={24} />
            </div>
          </div>
        </div>

        {/* Inactive Room Types */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Inactive Room-Types</p>
              <p className="text-2xl font-bold text-red-600">{inactiveRooms}</p>
            </div>
            <div className="rounded-full bg-red-50 p-3 text-red-600">
              <HiOutlineXCircle size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tables Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Categories (with Image column added) */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="font-semibold text-gray-800">Recent Categories</h2>
            <Link
              href="/admin/category"
              className="text-xs text-blue-600 hover:underline"
            >
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-3">Image</th>  
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Slug</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCategories.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-5 py-8 text-center text-gray-400">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  recentCategories.map((cat, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      {/* Image column */}
                      <td className="px-5 py-3">
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="h-10 w-10 rounded-lg object-cover shadow-sm"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                            No img
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-900">{cat.name}</td>
                      <td className="px-5 py-3 text-gray-600">{cat.slug}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${isActive(cat.status)
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                        >
                          {isActive(cat.status) ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Room Types (unchanged – no image field in your room data) */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="font-semibold text-gray-800">Recent Room-Types</h2>
            <Link
              href="/admin/room-type"
              className="text-xs text-blue-600 hover:underline"
            >
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Slug</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRooms.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-5 py-8 text-center text-gray-400">
                      No room types found
                    </td>
                  </tr>
                ) : (
                  recentRooms.map((room, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-gray-900">{room.name}</td>
                      <td className="px-5 py-3 text-gray-600">{room.slug}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${isActive(room.status)
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                        >
                          {isActive(room.status) ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}