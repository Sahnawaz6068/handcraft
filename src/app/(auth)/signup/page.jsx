"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, User, ImagePlus } from "lucide-react";
import Link from 'next/link';

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Build payload — role and avatar are optional, only sent if provided
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      ...(formData.avatar && { avatar: formData.avatar }),
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data?.successResponse?.success) {
        throw new Error(
          data?.successResponse?.message || data?.message || "Registration failed"
        );
      }

      // data.successResponse.data -> created user (no password)
      // TODO: redirect to sign in, or auto-login and redirect to dashboard
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#faf7f2]">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col-reverse items-center gap-14 px-6 py-12 lg:flex-row">
        {/* Left Image Panel */}
        <div className="relative hidden flex-1 items-center justify-center lg:flex">
          <img
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80"
            alt=""
            className="h-[520px] w-[420px] rounded-3xl object-cover shadow-2xl"
          />

          <div className="absolute -bottom-6 -left-10 rounded-2xl bg-white p-5 shadow-2xl">
            <div className="text-sm text-gray-500">Join</div>
            <h3 className="mt-1 font-semibold text-gray-900">HandCraft</h3>
            <p className="mt-2 text-sm text-gray-500">
              600+ Verified Artisans Already Here
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex flex-1 mt-10 items-center justify-center">
          <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
            <span className="inline-flex items-center rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-700 shadow-sm">
              ✨ Create your account
            </span>

            <h1 className="mt-6 text-3xl font-bold leading-tight text-gray-900">
              Shop unique pieces, 
              <br />
              <span className="text-amber-700">or start selling your own.</span>
            </h1>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alice"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alice@example.com"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
              </div>

              {/* Avatar URL — optional */}
              <div>
                <label
                  htmlFor="avatar"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Avatar URL{" "}
                  <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <div className="relative">
                  <ImagePlus className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="avatar"
                    name="avatar"
                    type="url"
                    value={formData.avatar}
                    onChange={handleChange}
                    placeholder="https://example.com/your-photo.jpg"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-12 text-gray-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-amber-700 px-8 py-4 font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-amber-700 hover:text-amber-800"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;