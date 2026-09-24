"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/utils/helper";
import { fetchMyOrders } from "@/utils/api";
import { toast } from "sonner";
import { MdCurrencyRupee } from "react-icons/md";
import { LuSofa } from "react-icons/lu";
import { HiMenu, HiX } from "react-icons/hi";
import { IoAddSharp } from "react-icons/io5";
import MenuItems from "@/components/website/profile/MenuItems";

/* ---------- helpers ---------- */
const TIERS = [
  { name: "Platinum", min: 200000 },
  { name: "Gold", min: 75000 },
  { name: "Silver", min: 25000 },
  { name: "Member", min: 0 },
];
const getTier = (spent) => TIERS.find((t) => spent >= t.min).name;
const nextTierInfo = (spent) => {
  const i = TIERS.findIndex((t) => spent >= t.min);
  return i > 0 ? TIERS[i - 1] : null; // null = already top tier
};
const inr = (n) => Number(n || 0).toLocaleString("en-IN");
const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const PHONE_RE = /^[6-9]\d{9}$/;
const PIN_RE = /^\d{6}$/;
const digits = (v) => v.replace(/\D/g, "");
const norm = (s = "") => s.trim().toLowerCase().replace(/\s+/g, " ");
const errMsg = (e, fb) => e?.response?.data?.message || fb;

const inputCls =
  "w-full py-2.5 px-3 border border-[#E8E0D5] bg-white rounded-md text-[12px] outline-none focus:border-[#8B5E3C]";
const cardCls = "bg-white border border-[#E8E0D5] rounded-xl p-4 sm:p-5";
const titleCls = "text-[13px] font-medium text-[#1E1E1E] mb-4 pb-3 border-b border-[#E8E0D5]";

/* ================= ORDERS ================= */
const OrdersSection = ({ orders, loading, error }) => {
  const statusStyles = {
    PLACED: "bg-[#FFF3CD] text-[#856404]",
    PROCESSING: "bg-[#FFF3CD] text-[#856404]",
    SHIPPED: "bg-[#DCEEFA] text-[#2A6F97]",
    DELIVERED: "bg-[#EAF3DE] text-[#3B6D11]",
    CANCELLED: "bg-[#FADBD8] text-[#943126]",
  };

  if (loading) return <div className={cardCls}><div className="text-[13px] text-[#6B7280]">Loading orders...</div></div>;
  if (error)
    return (
      <div className={`${cardCls} text-center`}>
        <div className="text-[13px] font-medium mb-1">Orders load nahi ho paye</div>
        <div className="text-[11px] text-[#6B7280]">Page refresh karke dobara try karo.</div>
      </div>
    );
  if (orders.length === 0)
    return (
      <div className={`${cardCls} text-center py-10`}>
        <div className="text-[13px] font-medium mb-1">No orders yet</div>
        <div className="text-[11px] text-[#6B7280]">Your placed orders will show up here.</div>
      </div>
    );

  return (
    <div className={cardCls}>
      <div className={titleCls}>My Orders</div>
      {orders.map((order) => {
        const first = order.items?.[0];
        const extra = (order.items?.length || 1) - 1;
        const img = first?.productId?.images?.[0] || first?.productId?.image;
        return (
          <div key={order._id} className="flex flex-wrap sm:flex-nowrap items-center gap-3 border-b border-[#E8E0D5] py-3 last:border-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F5F0EB] rounded-lg flex items-center justify-center text-[18px] text-[#C6A27E] shrink-0 overflow-hidden">
              {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : <LuSofa />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] sm:text-[12px] font-medium truncate">
                {first?.productId?.name || "Product"}
                {extra > 0 && ` + ${extra} more`}
              </div>
              <div className="text-[9px] sm:text-[10px] mt-0.5 text-[#6B7280]">
                Order #{order.orderId} · {fmtDate(order.createdAt)}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
              <span className={`${statusStyles[order.orderStatus] || "bg-[#F0EBE3] text-[#6B7280]"} text-[9px] sm:text-[10px] py-0.5 px-2 rounded-[10px] whitespace-nowrap`}>
                {order.orderStatus}
              </span>
              <div className="text-[12px] sm:text-[13px] font-medium flex items-center whitespace-nowrap">
                <MdCurrencyRupee /> {inr(order.totalAmount)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ================= PERSONAL INFO ================= */
const PersonalInfoSection = ({ user, onUpdated }) => {
  const [formData, setFormData] = useState({ name: user?.name || "", mobile: user?.mobile || "" });
  const [saving, setSaving] = useState(false);
  const dirty = formData.name !== (user?.name || "") || formData.mobile !== (user?.mobile || "");

  const handleSave = async () => {
    if (formData.name.trim().length < 2) return toast.error("Please enter a valid name");
    if (formData.mobile && !PHONE_RE.test(formData.mobile))
      return toast.error("Enter a valid 10 digit mobile number");

    setSaving(true);
    try {
      // email unchanged bheja ja raha hai taaki purana backend na toote
      const res = await client.put("user/update-profile", { ...formData, email: user.email });
      if (res.data.success) {
        toast.success(res.data.message || "Profile updated");
        onUpdated(res.data.data.user);
      }
    } catch (e) {
      toast.error(errMsg(e, "Failed to update profile"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={cardCls}>
      <div className={titleCls}>Personal Information</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="text-[#6B7280] text-[11px] block mb-1.25">Full Name</label>
          <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="text-[#6B7280] text-[11px] block mb-1.25">Email</label>
          <input value={user?.email || ""} disabled className={`${inputCls} bg-[#F8F5F1] text-[#6B7280] cursor-not-allowed`} />
        </div>
        <div>
          <label className="text-[#6B7280] text-[11px] block mb-1.25">Phone</label>
          <input
            inputMode="numeric"
            maxLength={10}
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: digits(e.target.value) })}
            placeholder="10 digit mobile number"
            className={inputCls}
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        disabled={saving || !dirty}
        className="bg-[#8B5E3C] text-[#FFF8F3] text-[11px] tracking-[0.08em] py-2.75 px-5.5 mt-4 rounded-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

/* ================= ADDRESSES ================= */
const EMPTY_ADDR = { fullName: "", mobile: "", pincode: "", addressLine: "", city: "", state: "", country: "India", isDefault: false };
const MAX_ADDRESSES = 5;

const AddressesSection = ({ addresses, onChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(EMPTY_ADDR);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const v = type === "checkbox" ? checked : name === "pincode" ? digits(value).slice(0, 6) : name === "mobile" ? digits(value).slice(0, 10) : value;
    setFormData((p) => ({ ...p, [name]: v }));
  };

  const openNew = () => { setFormData(EMPTY_ADDR); setEditingId(null); setShowForm(true); };
  const openEdit = (a) => { setFormData({ ...EMPTY_ADDR, ...a }); setEditingId(a._id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditingId(null); setFormData(EMPTY_ADDR); };

  const handleSubmit = async () => {
    const { fullName, mobile, pincode, addressLine, city, state } = formData;
    if (![fullName, addressLine, city, state].every((v) => v.trim()))
      return toast.error("Please fill all required fields");
    if (!PHONE_RE.test(mobile)) return toast.error("Enter a valid 10 digit mobile number");
    if (!PIN_RE.test(pincode)) return toast.error("Pincode must be 6 digits");

    const duplicate = addresses.some(
      (a) => a._id !== editingId && norm(a.addressLine) === norm(addressLine) && norm(a.city) === norm(city) && a.pincode === pincode && a.mobile === mobile
    );
    if (duplicate) return toast.error("This address is already saved");

    setSaving(true);
    try {
      const res = editingId
        ? await client.put(`user/edit-address/${editingId}`, formData)
        : await client.post("user/add-address", formData);
      if (res.data.success) {
        toast.success(editingId ? "Address updated" : "Address saved successfully");
        onChange(res.data.data.addresses);
        closeForm();
      }
    } catch (e) {
      toast.error(errMsg(e, "Failed to save address"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await client.delete(`user/delete-address/${id}`);
      if (res.data.success) {
        toast.success("Address removed");
        onChange(res.data.data.addresses);
      }
    } catch (e) {
      toast.error(errMsg(e, "Failed to remove address"));
    } finally {
      setConfirmId(null);
    }
  };

  const handleSetDefault = async (id) => {
    try {
      const res = await client.patch(`user/default-address/${id}`);
      if (res.data.success) {
        toast.success("Default address updated");
        onChange(res.data.data.addresses);
      }
    } catch (e) {
      toast.error(errMsg(e, "Failed to update default address"));
    }
  };

  // default address hamesha sabse upar
  const sorted = [...addresses].sort((a, b) => Number(b.isDefault) - Number(a.isDefault));

  return (
    <div className={cardCls}>
      <div className={titleCls}>Saved Addresses</div>

      {sorted.length === 0 ? (
        <div className="text-[12px] text-[#6B7280] mb-4">No saved addresses yet. Add one to check out faster.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {sorted.map((addr) => (
            <div key={addr._id} className={`border rounded-lg p-3.5 relative ${addr.isDefault ? "border-[#8B5E3C]" : "border-[#E8E0D5]"}`}>
              {addr.isDefault && (
                <div className="absolute top-2.5 right-2.5 text-[9px] bg-[#F5EDE4] text-[#8B5E3C] py-0.5 px-2 rounded-[10px]">Default</div>
              )}
              <div className="text-[12px] font-medium mb-1.5">{addr.fullName}</div>
              <div className="text-[11px] text-[#6B7280] leading-[1.6]">
                {addr.addressLine}<br />
                {addr.city}, {addr.state} {addr.pincode}<br />
                {addr.country} · +91 {addr.mobile}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-3 pt-2.5 border-t border-[#E8E0D5] text-[11px]">
                {confirmId === addr._id ? (
                  <>
                    <span className="text-[#6B7280]">Delete this address?</span>
                    <button onClick={() => handleDelete(addr._id)} className="text-[#943126] font-medium">Yes, delete</button>
                    <button onClick={() => setConfirmId(null)} className="text-[#6B7280]">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => openEdit(addr)} className="text-[#8B5E3C]">Edit</button>
                    {!addr.isDefault && <button onClick={() => handleSetDefault(addr._id)} className="text-[#8B5E3C]">Set as default</button>}
                    <button onClick={() => setConfirmId(addr._id)} className="text-[#943126]">Remove</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="border border-[#E8E0D5] rounded-lg p-4 mt-4">
          <div className="text-[12px] font-medium mb-3">{editingId ? "Edit address" : "New address"}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className={inputCls} />
            <input name="mobile" value={formData.mobile} onChange={handleChange} inputMode="numeric" placeholder="Mobile Number" className={inputCls} />
            <input name="addressLine" value={formData.addressLine} onChange={handleChange} placeholder="House no., street, area" className={`${inputCls} sm:col-span-2`} />
            <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className={inputCls} />
            <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className={inputCls} />
            <input name="pincode" value={formData.pincode} onChange={handleChange} inputMode="numeric" placeholder="Pincode" className={inputCls} />
            <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className={inputCls} />
          </div>
          <label className="flex items-center gap-2 mt-3 text-[11px] text-[#6B7280]">
            <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} className="accent-[#8B5E3C]" />
            Set as default address
          </label>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSubmit} disabled={saving} className="bg-[#8B5E3C] text-[#FFF8F3] text-[11px] py-2 px-4 rounded-sm font-medium disabled:opacity-50">
              {saving ? "Saving..." : editingId ? "Update Address" : "Save Address"}
            </button>
            <button onClick={closeForm} className="text-[#6B7280] text-[11px] py-2 px-4">Cancel</button>
          </div>
        </div>
      )}

      {!showForm &&
        (addresses.length < MAX_ADDRESSES ? (
          <button onClick={openNew} className="bg-transparent text-[#8B5E3C] text-[11px] tracking-[0.08em] py-2.5 px-5.5 mt-4 border border-[#C6A27E] rounded-sm font-medium inline-flex items-center gap-1.75">
            <IoAddSharp /> Add New Address
          </button>
        ) : (
          <div className="text-[11px] text-[#6B7280] mt-4">You can save up to {MAX_ADDRESSES} addresses. Remove one to add another.</div>
        ))}
    </div>
  );
};

/* ================= SETTINGS (ab backend me save hota hai) ================= */
const Toggle = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onChange}
    className={`w-10 h-5.5 rounded-[11px] relative transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#8B5E3C] ${checked ? "bg-[#8B5E3C]" : "bg-[#E8E0D5]"}`}
  >
    <span className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-all ${checked ? "right-0.5" : "left-0.5"}`} />
  </button>
);

const SettingsSection = ({ preferences, onChange }) => {
  const prefs = { emailNotifications: true, smsAlerts: false, ...preferences };

  const toggle = async (key) => {
    const next = { ...prefs, [key]: !prefs[key] };
    onChange(next); // optimistic
    try {
      await client.put("user/update-preferences", next);
      toast.success("Preferences saved");
    } catch (e) {
      onChange(prefs); // rollback
      toast.error(errMsg(e, "Could not save preference"));
    }
  };

  const rows = [
    ["emailNotifications", "Email Notifications", "Order updates & offers"],
    ["smsAlerts", "SMS Alerts", "Delivery & order updates via SMS"],
  ];

  return (
    <div className={cardCls}>
      <div className={titleCls}>Account Settings</div>
      <div className="flex flex-col gap-3.5">
        {rows.map(([key, title, sub]) => (
          <div key={key} className="flex justify-between items-center border border-[#E8E0D5] rounded-lg p-3">
            <div>
              <div className="text-[12px] font-medium">{title}</div>
              <div className="text-[10px] text-[#6B7280]">{sub}</div>
            </div>
            <Toggle checked={prefs[key]} onChange={() => toggle(key)} label={title} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ================= MAIN PAGE ================= */
export default function ProfilePage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("My Orders");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await client.get("user/profile");
        if (!res.data.success) return router.push("/login");
        setUser(res.data.user);
        setCheckingAuth(false);
      } catch {
        router.push("/login");
      }
    })();
  }, [router]);

  // orders tabhi load honge jab user logged in confirm ho jaye
  useEffect(() => {
    if (checkingAuth) return;
    (async () => {
      try {
        const res = await fetchMyOrders();
        setOrders(res.data || []);
      } catch {
        setOrdersError(true);
      } finally {
        setOrdersLoading(false);
      }
    })();
  }, [checkingAuth]);

  // cancelled orders ko count/spent me nahi ginte
  const { orderCount, totalSpent } = useMemo(() => {
    const valid = orders.filter((o) => o.orderStatus !== "CANCELLED");
    return { orderCount: valid.length, totalSpent: valid.reduce((s, o) => s + (o.totalAmount || 0), 0) };
  }, [orders]);
  const tier = getTier(totalSpent);
  const next = nextTierInfo(totalSpent);

  const handleSignOut = async () => {
    try {
      await client.post("user/logout");
    } catch (e) {
      console.log("LOGOUT ERROR:", e);
    } finally {
      localStorage.removeItem("token");
      toast.success("Signed out successfully");
      router.push("/login");
    }
  };

  // Sign Out ab render ke andar nahi, click par chalta hai
  const handleTabChange = (tab) => {
    setMobileSidebarOpen(false);
    if (tab === "Sign Out") return handleSignOut();
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Personal Info":
        return <PersonalInfoSection user={user} onUpdated={setUser} />;
      case "Addresses":
        return <AddressesSection addresses={user?.addresses || []} onChange={(addresses) => setUser((p) => ({ ...p, addresses }))} />;
      case "Settings":
        return <SettingsSection preferences={user?.preferences} onChange={(preferences) => setUser((p) => ({ ...p, preferences }))} />;
      default:
        return <OrdersSection orders={orders} loading={ordersLoading} error={ordersError} />;
    }
  };

  if (checkingAuth)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#F8F5F1]">
        <div className="text-[13px] text-[#6B7280]">Loading...</div>
      </div>
    );

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
            {/* MenuItems me hardcoded naam/email/"Gold Member" hata ke ye props use karo */}
            <MenuItems activeTab={activeTab} onTabChange={handleTabChange} user={user} tier={tier} />
          </div>
          <div className="flex flex-col gap-5">
            <div className={cardCls}>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F8F5F1] rounded-lg p-3 text-center">
                  <div className="text-[18px] sm:text-[20px] text-[#8B5E3C] font-medium mb-1">{orderCount}</div>
                  <div className="text-[9px] sm:text-[10px] text-[#6B7280] tracking-wide">orders</div>
                </div>
                <div className="bg-[#F8F5F1] rounded-lg p-3 text-center">
                  <div className="text-[18px] sm:text-[20px] text-[#8B5E3C] font-medium mb-1 flex items-center justify-center">
                    <MdCurrencyRupee />{inr(totalSpent)}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-[#6B7280] tracking-wide">spent</div>
                </div>
              </div>
              <div className="mt-3 text-[10px] text-[#6B7280] text-center">
                {next ? `Spend ₹${inr(next.min - totalSpent)} more to become a ${next.name} member` : "You're at our highest membership tier"}
              </div>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}