"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                setError(error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
                return;
            }

            router.push("/");
            router.refresh();
        } catch {
            setError("লগইন করা যায়নি। আবার চেষ্টা করো।");
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

    return (
       <main className="bg-[#f0f5f0] px-4 py-6 sm:py-8">
            <div className="mx-auto max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-[#1d2b22]">
                        সাইন ইন
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                <div className="rounded-2xl border border-[#e0e9e0] bg-[#fbfdfb] p-5 shadow-sm sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[#26352a]">
                                ইমেইল
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                autoComplete="email"
                                className="w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[#26352a]">
                                পাসওয়ার্ড
                            </label>
                            <input
                                type="password"
                                required
                                minLength={8}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                autoComplete="current-password"
                                className="w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {error && (
                            <p
                                role="alert"
                                className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                            >
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-[#008c43] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#007738] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "লগইন হচ্ছে..." : "সাইন ইন"}
                        </button>
                    </form>

                    <div className="my-4 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-xs text-gray-500">অথবা</span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={() => handleSocialSignIn("google")}
                            className="flex items-center justify-center gap-2 rounded-lg border border-[#dfe7df] px-3 py-2.5 text-sm font-medium text-[#26352a] hover:bg-green-50 transition"
                        >
                            <FcGoogle className="text-lg" />
                            <span>Google দিয়ে চালিয়ে যান</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSocialSignIn("github")}
                            className="flex items-center justify-center gap-2 rounded-lg border border-[#dfe7df] px-3 py-2.5 text-sm font-medium text-[#26352a] hover:bg-green-50 transition"
                        >
                            <FaGithub className="text-lg text-[#1d2b22]" />
                            <span>GitHub দিয়ে চালিয়ে যান</span>
                        </button>
                    </div>

                    <p className="mt-5 text-center text-sm text-gray-600">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-[#008c43] hover:underline"
                        >
                            সাইন আপ করুন
                        </Link>
                    </p>
                </div>

                <div className="mt-5 text-center">
                    <Link
                        href="/"
                        className="text-sm text-gray-500 hover:text-green-700"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </main>
    );
}