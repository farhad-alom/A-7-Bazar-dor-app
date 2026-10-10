"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Skeleton from "@/components/Skeleton"; // স্কেলেটন কম্পোনেন্ট ইমপোর্ট করা হলো

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // পেজ মাউন্ট স্টেট

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (data.password !== data.confirmPassword) {
      return setError("পাসওয়ার্ড দুটি মেলেনি!");
    }

    setLoading(true);

    try {
      const res = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (res?.error) return setError(res.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      router.push("/signin");
    } catch {
      setError("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(provider) {
    setError("");

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Social login করা যায়নি।");
      }
    } catch {
      setError("Social login করা যায়নি। আবার চেষ্টা করো।");
    }
  }

  const inputClass = "w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-green-600 focus:bg-white";

  // যদি মাউন্ট না হয় বা লোডিং অবস্থায় থাকে, তবে এই স্কেলেটন দেখাবে
  if (!isMounted) {
    return (
      <main className="flex flex-col items-center bg-[#f3f6f3] px-4 pt-6 pb-12 text-slate-800">
        {/* Header Skeleton */}
        <div className="mb-6 text-center space-y-2">
          <Skeleton className="h-9 w-60 mx-auto rounded" />
          <Skeleton className="h-4 w-72 mx-auto rounded" />
        </div>

        {/* Card Form Skeleton */}
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm space-y-4">
          <div className="space-y-4">
            <div>
              <Skeleton className="h-4 w-12 mb-1 rounded" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-4 w-16 mb-1 rounded" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-1 rounded" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-4 w-36 mb-1 rounded" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
          </div>

          <Skeleton className="h-11 w-full rounded-lg mt-6" />

          {/* Divider Skeleton */}
          <div className="relative my-6 text-center">
            <Skeleton className="h-4 w-12 mx-auto rounded" />
          </div>

          {/* Social Buttons Skeleton */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Skeleton className="h-11 w-full rounded-lg" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>

          {/* Footer Link Skeleton */}
          <div className="mt-6 flex justify-center">
            <Skeleton className="h-4 w-48 rounded" />
          </div>
        </div>

        <div className="mt-6">
          <Skeleton className="h-4 w-32 rounded" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center bg-[#f3f6f3] px-4 pt-6 pb-12 text-slate-800">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-2 text-sm text-slate-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Card Form */}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold">নাম</label>
            <input name="name" placeholder="যেমন: রহিম উদ্দিন" required className={inputClass} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">ইমেইল</label>
            <input name="email" type="email" placeholder="you@example.com" required className={inputClass} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">পাসওয়ার্ড</label>
            <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" minLength={8} required className={inputClass} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input name="confirmPassword" type="password" placeholder="আবার লিখুন" minLength={8} required className={inputClass} />
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#008744] py-3 text-sm font-medium text-white hover:bg-[#007038] disabled:opacity-60"
          >
            {loading ? "তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center text-xs text-slate-400">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
          <span className="relative bg-white px-3">অথবা</span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            className="flex items-center justify-center gap-2 rounded-lg border border-[#dfe7df] px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-green-50 transition"
          >
            <FcGoogle className="text-lg" />
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            className="flex items-center justify-center gap-2 rounded-lg border border-[#dfe7df] px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-green-50 transition"
          >
            <FaGithub className="text-lg text-slate-800" />
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-xs text-slate-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-green-600 hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-6 text-xs text-slate-500 hover:underline">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}