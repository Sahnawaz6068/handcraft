"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call auth API with { identifier, password }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#faf7f2]">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col-reverse items-center gap-14 px-6 py-16 lg:flex-row">
        {/* Left Image Panel */}
        <div className="relative hidden flex-1 items-center justify-center lg:flex">
          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80"
            alt="Jewelry"
            className="h-[520px] w-[420px] rounded-3xl object-cover shadow-2xl"
          />

          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-10 rounded-2xl bg-white p-5 shadow-2xl">
            <div className="text-sm text-gray-500">Welcome back to</div>
            <h3 className="mt-1 font-semibold text-gray-900">HandCraft</h3>
            <p className="mt-2 text-sm text-gray-500">
              ⭐ 4.9 • 50K+ Happy Customers
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
            <span className="inline-flex items-center rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-700 shadow-sm">
              ✨ Sign in to your account
            </span>

            <h1 className="mt-6 text-3xl font-bold leading-tight text-gray-900">
              Welcome back,
              <br />
              <span className="text-amber-700">
                let's get you signed in.
              </span>
            </h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email or Phone */}
              <div>
                <label
                  htmlFor="identifier"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email or phone number
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    id="identifier"
                    type="text"
                    autoComplete="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="you@example.com or 98765 43210"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <a
                    href="/forgot-password"
                    className="text-sm font-medium text-amber-700 hover:text-amber-800"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-12 text-gray-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
                className="w-full rounded-xl bg-amber-700 px-8 py-4 font-semibold text-white transition hover:bg-amber-800"
              >
                Sign In
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-semibold text-amber-700 hover:text-amber-800"
              >
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;