"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { applyForVendor } from "@/lib/api/vendor";
// import { applyForVendor } from "@/lib/api/vendor";

const Page = () => {
  const router = useRouter();
  const { accessToken, user: authUser, loading,updateUser } = useAuth();

  const [form, setForm] = useState({ shopName: "", description: "", logo: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!accessToken || !authUser) {
    router.replace("/signin");
    return null;
  }


  const hasApplied = Boolean(authUser.vendorProfile?.shopName);

  if (hasApplied) {
    return (
      <section className="min-h-screen bg-[#faf7f2] px-6 py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {authUser.vendorProfile.isApproved
              ? "You're already a seller"
              : "Application pending"}
          </h1>
          <p className="text-gray-500 mt-2">
            {authUser.vendorProfile.isApproved
              ? "Your shop is live — head to your vendor dashboard to manage listings."
              : "Your seller application is under review. We'll notify you once it's approved."}
          </p>
        </div>
      </section>
    );
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.shopName.trim()) {
      setError("Shop name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await applyForVendor(form, accessToken);

      updateUser({ vendorProfile: res.vendorProfile ?? form });
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-screen bg-[#faf7f2] px-6 py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Application submitted
          </h1>
          <p className="text-gray-500 mt-2">
            We'll review your shop details and notify you once approved.
          </p>
          <button
            onClick={() => router.push("/profile")}
            className="mt-6 h-11 px-6 rounded-full bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors"
          >
            Back to profile
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#faf7f2] px-6 py-24">
      <div className="mx-auto max-w-lg">
        <h1 className="text-3xl font-bold text-gray-900">Become a seller</h1>
        <p className="text-gray-500 mt-2">
          Tell us about your shop — we'll review your application before you
          can start listing.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Shop name
            </label>
            <input
              name="shopName"
              value={form.shopName}
              onChange={handleChange}
              placeholder="e.g. Marlowe & Co."
              className="w-full h-11 rounded-lg border border-gray-300 px-3.5 text-sm focus:outline-none focus:border-amber-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="What do you make, and what makes your shop different?"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-700 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Logo URL
            </label>
            <input
              name="logo"
              value={form.logo}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full h-11 rounded-lg border border-gray-300 px-3.5 text-sm focus:outline-none focus:border-amber-700"
            />
            <p className="text-xs text-gray-400 mt-1">
              Paste a hosted image URL for now — file upload can come later.
            </p>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-full bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Page;