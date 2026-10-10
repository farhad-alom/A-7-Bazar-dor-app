"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/signin");
    }

    if (session?.user?.name) {
      setName(session.user.name || "");
    }
  }, [isPending, session, router]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("তোমার নাম লিখো");
      return;
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
      });

      if (result.error) {
        toast.error(result.error.message || "তথ্য আপডেট করা যায়নি");
        return;
      }

      toast.success("তোমার তথ্য আপডেট হয়েছে");
      router.push("/profile");
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setSaving(false);
    }
  }

  if (isPending || isPageLoading || !session?.user) {
    return (
      <main className="mx-auto max-w-xl px-4 py-12 animate-pulse">
        <div className="h-5 w-36 rounded bg-gray-200 mb-6"></div>

        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="h-8 w-48 rounded bg-gray-200"></div>
            <div className="h-4 w-64 rounded bg-gray-200"></div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="h-4 w-20 rounded bg-gray-200"></div>
            <div className="h-12 w-full rounded-xl bg-gray-200"></div>
          </div>

          <div className="h-12 w-full rounded-xl bg-gray-200"></div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <Link href="/profile" className="text-primary hover:underline">
        ← প্রোফাইলে ফিরে যান
      </Link>

      <section className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="mt-2 text-sm text-muted">
          এখানে তোমার নাম পরিবর্তন করতে পারবে।
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              তোমার নাম
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
              placeholder="তোমার নাম লিখো"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-primary px-5 py-3 font-medium text-white disabled:opacity-60"
          >
            {saving ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
          </button>
        </form>
      </section>
    </main>
  );
}