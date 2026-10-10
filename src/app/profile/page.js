"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি");
      return;
    }
    toast.success("সাইন আউট করা হয়েছে");
    router.push("/");
    router.refresh();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    toast.success("তথ্য আপডেট হয়েছে");
  };


  if (isPending || isPageLoading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 animate-pulse">
        {/* Title Skeleton */}
        <div className="mb-6 space-y-2">
          <div className="h-8 w-40 rounded bg-gray-200"></div>
          <div className="h-4 w-60 rounded bg-gray-200"></div>
        </div>

     
        <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-5 w-32 rounded bg-gray-200"></div>
              <div className="h-4 w-48 rounded bg-gray-200"></div>
            </div>
          </div>
          <div className="h-9 w-28 rounded-xl bg-gray-200"></div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
          <div className="h-6 w-20 rounded bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-4 w-12 rounded bg-gray-200"></div>
            <div className="h-12 w-full rounded-xl bg-gray-200"></div>
          </div>
          <div className="h-12 w-full rounded-xl bg-gray-200"></div>
        </div>
      </main>
    );
  }

  if (!session?.user) {
    router.replace("/signin");
    return null;
  }

  const user = session.user;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Profile Card */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-gray-100">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-400">
                {user.name?.[0] || "👤"}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {user.name || "User Name"}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-1 rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          ← সাইন আউট
        </button>
      </div>

      {/* Info & Update Card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-bold text-gray-900">তথ্য</h3>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:bg-white"
              placeholder="আপনার নাম লিখুন"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            আপডেট
          </button>
        </form>
      </div>
    </main>
  );
}