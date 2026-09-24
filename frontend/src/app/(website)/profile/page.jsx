"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/utils/helper";
import { fetchMyOrders } from "@/utils/api";
import { toast } from "sonner";
import { MdCurrencyRupee } from "react-icons/md";
import { LuSofa } from "react-icons/lu";
import { HiMenu, HiX } from "react-icons/hi";
import { IoAddSharp } from "react-icons/io5";
import MenuItems from "@/components/website/profile/MenuItems";

// ---------- Orders Component ----------
const OrdersSection = ({ orders, loading }) => {
  const statusStyles = {
    PLACED: "bg-[#FFF3CD] text-[#856404]",
    PROCESSING: "bg-[#FFF3CD] text-[#856404]",
    SHIPPED: "bg-[#DCEEFA] text-[#2A6F97]",
    DELIVERED: "bg-[#EAF3DE] text-[#3B6D11]",
    CANCELLED: "bg-[#FADBD8] text-[#943126]",
  };

  if (loading) {
    return (
      <div className="bg-white border border-[#E8E0D5] rounded-xl p-4 sm:p-5">
        <div className="text-[13px] text-[#6B7280]">Loading orders...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white border border-[#E8E0D5] rounded-xl p-8 sm:p-10 text-center">
        <div className="text-[13px] font-medium text-[#1E1E1E] mb-1">
          No orders yet
        </div>
        <div className="text-[11px] text-[#6B7280]">
          Your placed orders will show up here.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E8E0D5] rounded-xl p-4 sm:p-5">
      <div className="text-[13px] font-medium text-[#1E1E1E] mb-4 pb-3 border-b border-[#E8E0D5]">
        Recent Orders
      </div>
      {orders.map((order) => {
        const firstItem = order.items?.[0];
        const extraCount = order.items?.length - 1;
        const productName = firstItem?.productId?.name || "Product";

        return (
          <div
            key={order._id}
            className="flex flex-wrap sm:flex-nowrap items-center gap-3 border-b border-[#E8E0D5] py-3 last:border-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F5F0EB] rounded-lg flex items-center justify-center text-[18px] sm:text-[20px] text-[#C6A27E] shrink-0">
              <LuSofa />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] sm:text-[12px] font-medium text-[#1E1E1E] truncate">
                {productName}
                {extraCount > 0 && ` + ${extraCount} more`}
              </div>
              <div className="text-[9px] sm:text-[10px] mt-0.5 text-[#6B7280]">
                Order #{order.orderId} ·{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
              <span
                className={`${
                  statusStyles[order.orderStatus] ||
                  "bg-[#F0EBE3] text-[#6B7280]"
                } text-[9px] sm:text-[10px] py-0.5 px-2 rounded-[10px] whitespace-nowrap`}
              >
                {order.orderStatus}
              </span>
              <div className="text-[12px] sm:text-[13px] font-medium text-[#1E1E1E] flex items-center whitespace-nowrap">
                <MdCurrencyRupee /> {order.totalAmount?.toLocaleString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- Personal Info Component ----------
const PersonalInfoSection = ({ user, onUpdated }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }

    setSaving(true);
    try {
      const res = await client.put("user/update-profile", formData);
      if (res.data.success) {
        toast.success(res.data.message || "Profile updated");
        onUpdated(res.data.data.user);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-[#E8E0D5] rounded-xl p-4 sm:p-5">
      <div className="text-[13px] font-medium text-[#1E1E1E] mb-4 pb-3 border-b border-[#E8E0D5]">Personal Information</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="text-[#6B7280] text-[11px] block mb-1.25">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] outline-none focus:border-[#8B5E3C]"
          />
        </div>
        <div>
          <label className="text-[#6B7280] text-[11px] block mb-1.25">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] outline-none focus:border-[#8B5E3C]"
          />
        </div>
        <div>
          <label className="text-[#6B7280] text-[11px] block mb-1.25">Phone</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="9876543210"
            className="w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] outline-none focus:border-[#8B5E3C]"
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-[#8B5E3C] text-[#FFF8F3] text-[11px] tracking-[0.08em] py-2.75 px-5.5 mt-4 rounded-sm font-medium inline-flex items-center disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

// ---------- Addresses Component ----------
const AddressesSection = ({ addresses, onAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
    country: "India",
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const { fullName, mobile, pincode, addressLine, city, state } = formData;
    if (!fullName || !mobile || !pincode || !addressLine || !city || !state) {
      toast.error("Please fill all required fields");
      return;
    }

    setSaving(true);
    try {
      const res = await client.post("user/add-address", formData);
      if (res.data.success) {
        toast.success(res.data.message || "Address added");
        onAdded(res.data.data.addresses);
        setShowForm(false);
        setFormData({
          fullName: "",
          mobile: "",
          pincode: "",
          addressLine: "",
          city: "",
          state: "",
          country: "India",
          isDefault: false,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add address");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-[#E8E0D5] rounded-xl p-4 sm:p-5">
      <div className="text-[13px] font-medium text-[#1E1E1E] mb-4 pb-3 border-b border-[#E8E0D5]">Saved Addresses</div>

      {addresses.length === 0 ? (
        <div className="text-[12px] text-[#6B7280] mb-4">No saved addresses yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {addresses.map((addr, index) => (
            <div key={index} className="border border-[#E8E0D5] rounded-lg p-3.5 relative">
              {addr.isDefault && (
                <div className="absolute top-2.5 right-2.5 text-[9px] bg-[#F5EDE4] text-[#8B5E3C] py-0.5 px-2 rounded-[10px]">Default</div>
              )}
              <div className="text-[12px] font-medium mb-1.5">{addr.fullName}</div>
              <div className="text-[11px] text-[#6B7280] leading-[1.6]">
                {addr.addressLine}<br />
                {addr.city}, {addr.state} {addr.pincode}<br />
                {addr.country} · {addr.mobile}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="border border-[#E8E0D5] rounded-lg p-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="py-2 px-3 border border-[#E8E0D5] rounded-md text-[12px] outline-none focus:border-[#8B5E3C]" />
            <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" className="py-2 px-3 border border-[#E8E0D5] rounded-md text-[12px] outline-none focus:border-[#8B5E3C]" />
            <input name="addressLine" value={formData.addressLine} onChange={handleChange} placeholder="Address" className="py-2 px-3 border border-[#E8E0D5] rounded-md text-[12px] outline-none focus:border-[#8B5E3C] sm:col-span-2" />
            <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="py-2 px-3 border border-[#E8E0D5] rounded-md text-[12px] outline-none focus:border-[#8B5E3C]" />
            <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="py-2 px-3 border border-[#E8E0D5] rounded-md text-[12px] outline-none focus:border-[#8B5E3C]" />
            <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="py-2 px-3 border border-[#E8E0D5] rounded-md text-[12px] outline-none focus:border-[#8B5E3C]" />
            <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="py-2 px-3 border border-[#E8E0D5] rounded-md text-[12px] outline-none focus:border-[#8B5E3C]" />
          </div>
          <label className="flex items-center gap-2 mt-3 text-[11px] text-[#6B7280]">
            <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} className="accent-[#8B5E3C]" />
            Set as default address
          </label>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSubmit} disabled={saving} className="bg-[#8B5E3C] text-[#FFF8F3] text-[11px] py-2 px-4 rounded-sm font-medium disabled:opacity-50">
              {saving ? "Saving..." : "Save Address"}
            </button>
            <button onClick={() => setShowForm(false)} className="text-[#6B7280] text-[11px] py-2 px-4">
              Cancel
            </button>
          </div>
        </div>
      )}

      {!showForm && (
        <button onClick={() => setShowForm(true)} className="bg-transparent text-[#8B5E3C] text-[11px] tracking-[0.08em] py-2.5 px-5.5 mt-4 border border-[#C6A27E] rounded-sm font-medium inline-flex items-center gap-1.75">
          <IoAddSharp /> Add New Address
        </button>
      )}
    </div>
  );
};

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
      </div>
    </div>
  );
};

// ---------- Main Page ----------
export default function ProfilePage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("My Orders");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await client.get("user/profile");
        if (!res.data.success) {
          router.push("/login");
        } else {
          setUser(res.data.user);
          setCheckingAuth(false);
        }
      } catch (err) {
        router.push("/login");
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    async function loadOrders() {
      const res = await fetchMyOrders();
      setOrders(res.data || []);
      setOrdersLoading(false);
    }
    loadOrders();
  }, []);

  const handleSignOut = async () => {
    try {
      await client.post("user/logout");
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
    } finally {
      localStorage.removeItem("token");
      toast.success("Signed out successfully");
      router.push("/login");
    }
  };

  const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const renderContent = () => {
    switch (activeTab) {
      case "My Orders": return <OrdersSection orders={orders} loading={ordersLoading} />;
      case "Personal Info": return <PersonalInfoSection user={user} onUpdated={setUser} />;
      case "Addresses": return <AddressesSection addresses={user?.addresses || []} onAdded={(addrs) => setUser((prev) => ({ ...prev, addresses: addrs }))} />;
      case "Settings": return <SettingsSection />;
      case "Sign Out":
        handleSignOut();
        return <div className="text-center py-10">Signing you out...</div>;
      default: return <OrdersSection orders={orders} loading={ordersLoading} />;
    }
  };

  if (checkingAuth) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#F8F5F1]">
        <div className="text-[13px] text-[#6B7280]">Loading...</div>
      </div>
    );
  }

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
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F8F5F1] rounded-lg p-3 text-center">
                  <div className="text-[18px] sm:text-[20px] text-[#8B5E3C] font-medium mb-1">{orders.length}</div>
                  <div className="text-[9px] sm:text-[10px] text-[#6B7280] tracking-wide">orders</div>
                </div>
                <div className="bg-[#F8F5F1] rounded-lg p-3 text-center">
                  <div className="text-[18px] sm:text-[20px] text-[#8B5E3C] font-medium mb-1 flex items-center justify-center gap-0">
                    <MdCurrencyRupee />{totalSpent.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-[#6B7280] tracking-wide">spent</div>
                </div>
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