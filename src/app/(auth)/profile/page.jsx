"use client";

import React from "react";
import {
  Mail,
  MapPin,
  ShieldCheck,
  Store,
  BadgeCheck,
  Pencil,
} from "lucide-react";

const user = {
  vendorProfile: {
    shopName: "Sahnawaz Jewels",
    description: "Handcrafted gold and silver jewelry from artisans in Bihar",
    logo: "https://img.magnific.com/free-vector/fashion-repair-service-logo-design_23-2150253063.jpg",
    isApproved: true,
    approvedAt: "2026-07-19T06:18:44.145Z",
  },
  _id: "6a464c9c9109392b9701617d",
  name: "Zeeshan Khan",
  email: "sahnawaz643786@gmail.com",
  role: "vendor",
  isVerified: true,
  isActive: true,
  addresses: [
    {
      lable: "Home",
      line1: "House No. 12",
      line2: "Near Gandhi Chowk",
      city: "Muzaffarpur",
      state: "Bihar",
      pinCode: "842001",
      country: "India",
      isDefault: true,
      _id: "6a464c9c9109392b9701617e",
    },
  ],
  avtar: "https://cdn.phototourl.com/free/2026-07-21-6fb7419b-8e88-4742-a584-54d11659874f.jpg",
  createdAt: "2026-07-02T11:33:48.430Z",
  updatedAt: "2026-07-19T06:18:44.151Z",
  venderProfile: {
    isApproved: false,
  },
  lastLoginAt: "2026-07-19T04:52:55.733Z",
};

const Page = () => {
  const isVendor = user.role === "vendor" && user.vendorProfile;
  const defaultAddress =
    user.addresses?.find((a) => a.isDefault) || user.addresses?.[0];

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#faf7f2]">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 py-16">
        {/* Header Card */}
        <div className="rounded-3xl mt-10 bg-white p-8 shadow-2xl">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              {user.avtar ? (
                <img
                  src={user.avtar}
                  alt={user.name}
                  className="h-20 w-20 rounded-full object-cover shadow-md"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-700 shadow-md">
                  {initials}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.name}
                  </h1>
                  {user.isVerified && (
                    <BadgeCheck
                      className="h-5 w-5 text-amber-700"
                      aria-label="Verified"
                    />
                  )}
                </div>
                <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
                <span className="mt-2 inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium capitalize text-amber-700">
                  {user.role}
                </span>
              </div>
            </div>

            <button className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-amber-700 hover:text-amber-700">
              <Pencil className="h-4 w-4" />
              Edit profile
            </button>
          </div>
        </div>

        {/* Vendor Profile — only for vendors */}
        {isVendor && (
          <div className="mt-6 rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-amber-700" />
              <h2 className="text-lg font-semibold text-gray-900">
                Shop details
              </h2>
              {user.vendorProfile.isApproved && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Approved
                </span>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
              {user.vendorProfile.logo && (
                <img
                  src={user.vendorProfile.logo}
                  alt={user.vendorProfile.shopName}
                  className="h-20 w-20 rounded-2xl object-cover shadow-md"
                />
              )}
              <div>
                <h3 className="font-semibold text-gray-900">
                  {user.vendorProfile.shopName}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {user.vendorProfile.description}
                </p>
                {user.vendorProfile.approvedAt && (
                  <p className="mt-2 text-xs text-gray-400">
                    Approved on{" "}
                    {new Date(
                      user.vendorProfile.approvedAt
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Become a vendor CTA — only for non-vendors */}
        {!isVendor && (
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-3xl bg-white p-8 shadow-2xl sm:flex-row sm:items-center">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Store className="h-5 w-5 text-amber-700" />
                Have a shop of your own?
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Apply to become a vendor and start selling your handcrafted
                pieces on HandCraft.
              </p>
            </div>
            <button className="whitespace-nowrap rounded-xl bg-amber-700 px-6 py-3 font-semibold text-white transition hover:bg-amber-800">
              Apply to sell
            </button>
          </div>
        )}

        {/* Addresses */}
        <div className="mt-6 rounded-3xl bg-white p-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <MapPin className="h-5 w-5 text-amber-700" />
              Addresses
            </h2>
            <button className="text-sm font-semibold text-amber-700 hover:text-amber-800">
              + Add address
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {user.addresses?.map((address) => (
              <div
                key={address._id}
                className="flex items-start justify-between rounded-2xl border border-gray-200 p-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      {address.lable}
                    </span>
                    {address.isDefault && (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {address.line1}
                    {address.line2 && `, ${address.line2}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} {address.pinCode}
                  </p>
                  <p className="text-sm text-gray-500">{address.country}</p>
                </div>
                <button className="text-sm font-medium text-gray-500 hover:text-amber-700">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;