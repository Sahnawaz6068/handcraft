"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { updateProfile } from "@/lib/api/auth";

const EditProfileModal = ({ profile, userId, accessToken, onClose, onUpdated }) => {
    console.log(accessToken+"........................................")
  const [form, setForm] = useState({
    name: profile.name || "",
    phone: profile.phone || "",
    email: profile.email || "",
    avtar: profile.avtar || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const updated = await updateProfile(userId, form, accessToken);
      onUpdated(updated);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Edit profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Avatar URL</label>
            <input
              name="avtar"
              value={form.avtar}
              onChange={handleChange}
              placeholder="https://..."
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-amber-600 px-4 py-2.5 font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;