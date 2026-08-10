"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { verifyOtp, resendOtp } from "@/lib/api/auth";

const RESEND_COOLDOWN = 30;

function VerifyOtpForm() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      toast.error("Missing email — please sign up again.");
      router.push("/signup");
    }
  }, [email, router]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.trim().length < 4) {
      toast.error("Enter the OTP sent to your email.");
      return;
    }

    setLoading(true);
    try {
      await toast.promise(verifyOtp({ email, otp: otp.trim() }), {
        loading: "Verifying...",
        success: "Account verified! Please sign in.",
        error: (err) => err?.message || "Invalid or expired OTP.",
      });
      router.push("/signin");
    } catch {
      // toasted already
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    try {
      await toast.promise(resendOtp({ email }), {
        loading: "Resending OTP...",
        success: "OTP sent. Check your email.",
        error: (err) => err?.message || "Couldn't resend OTP.",
      });
      setCooldown(RESEND_COOLDOWN);
    } catch {
      // toasted already
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-[#faf7f2] px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
        <span className="inline-flex items-center rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-700 shadow-sm">
          ✨ Verify your account
        </span>

        <h1 className="mt-6 text-3xl font-bold leading-tight text-gray-900">
          Check your email
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          We sent a code to <span className="font-medium text-gray-900">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="mt-8 space-y-5">
          <div>
            <label htmlFor="otp" className="mb-2 block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              disabled={loading}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-center text-2xl tracking-widest text-gray-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20 disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-amber-700 px-8 py-4 font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Didn't get a code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0}
            className="font-semibold text-amber-700 hover:text-amber-800 disabled:cursor-not-allowed disabled:text-gray-400"
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
          </button>
        </p>
      </div>
    </section>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#faf7f2]">Loading...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}