"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return <p className="py-20 text-center">প্রোফাইল লোড হচ্ছে...</p>;
  }

  const user = session.user;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/" className="text-primary hover:underline">
        ← হোম পেজে ফিরে যান
      </Link>

      <section className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
          {(user.name || user.email || "U").charAt(0).toUpperCase()}
        </div>

        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-sm text-muted">নাম</p>
            <p className="font-medium">{user.name || "নাম দেওয়া নেই"}</p>
          </div>

          <div>
            <p className="text-sm text-muted">ইমেইল</p>
            <p className="break-all font-medium">{user.email}</p>
          </div>
        </div>

        <Link
          href="/profile/update"
          className="mt-8 inline-block rounded-xl bg-primary px-5 py-3 font-medium text-white hover:opacity-90"
        >
          তথ্য আপডেট করুন
        </Link>
      </section>
    </main>
  );
}