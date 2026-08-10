"use client";

import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { updateProfile } from "@/lib/api/auth";

const AddressModal = ({ address, userId, accessToken, onClose, onUpdated }) => {
  const isEditing = Boolean(address);

  const [form, setForm] = useState({
    lable: address?.lable || "Home",
    line1: address?.line1 || "",
    line2: address?.line2 || "",
    city: address?.city || "",
    state: address?.state || "",
    pinCode: address?.pinCode || "",
    country: address?.country || "India",
    isDefault: address?.isDefault || false,
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = isEditing
        ? { updateAddress: { addressId: address._id, ...form } }
        : { addAddress: form };

      const updated = await updateProfile(userId, payload, accessToken);
      onUpdated(updated);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this address?")) return;
    setDeleting(true);
    setError("");

    try {
      const updated = await updateProfile(
        userId,
        { removeAddressId: address._id },
        accessToken,
      );
      onUpdated(updated);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const fields = [
    { name: "lable", label: "Label (e.g. Home, Work)" },
    { name: "line1", label: "Address line 1" },
    { name: "line2", label: "Address line 2 (optional)" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
    { name: "pinCode", label: "Pin code" },
    { name: "country", label: "Country" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? "Edit address" : "Add address"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="text-sm font-medium text-gray-700">{f.label}</label>
              <input
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none"
                required={f.name !== "line2"}
              />
            </div>
          ))}

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleChange}
            />
            Set as default address
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving || deleting}
              className="flex-1 rounded-xl bg-amber-600 px-4 py-2.5 font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60"
            >
              {saving ? "Saving..." : isEditing ? "Save changes" : "Add address"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving || deleting}
                className="flex items-center justify-center rounded-xl border border-red-200 px-4 py-2.5 text-red-600 transition hover:bg-red-50 disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;