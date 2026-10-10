'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const categories = [
  { name: "সব পণ্য", slug: "" },
  { name: "চাল", slug: "chal" },
  { name: "ডাল", slug: "dal" },
  { name: "তেল", slug: "tel" },
  { name: "সবজি", slug: "sobji" },
  { name: "মাছ", slug: "mach" },
  { name: "মাংস", slug: "mangsho" },
];

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [banglaDate, setBanglaDate] = useState("");

  const { data: session, isPending } = authClient.useSession();


  useEffect(() => {
    setMounted(true);
    const dateStr = new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    }).format(new Date());
    setBanglaDate(dateStr);
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("সাইন আউট করা যায়নি");
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="relative border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl text-white">
            🛒
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary">বাজার দর</span>
            <span className="text-xs text-muted">
              {mounted ? banglaDate : ""}
            </span>
          </div>
        </Link>

        {/* Right Side Auth / User Dropdown */}
        <div className="flex items-center gap-2">
          {!mounted || isPending ? (
            <span className="text-sm text-muted">লোড হচ্ছে...</span>
          ) : session?.user ? (
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-100"
              >
                <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-gray-200">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-bold text-gray-500">
                      {session.user.name?.[0] || "👤"}
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {session.user.name?.split(" ")[0] || "User"}
                </span>
                <span className="text-xs text-gray-400">▾</span>
              </button>

              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsOpen(false)}
                  />

                  <div className="absolute right-0 z-20 mt-2 w-64 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
                    <div className="border-b border-gray-100 pb-3">
                      <p className="font-bold text-gray-900">
                        {session.user.name || "User"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {session.user.email}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-col gap-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        👤 আমার প্রোফাইল
                      </Link>

                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        ↩ সাইন আউট
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Category Navigation Bar */}
      <nav className="border-t border-border">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.slug ? `/category/${cat.slug}` : "/#সব-পণ্য"}
              className="shrink-0 rounded-full px-4 py-2 text-sm font-medium hover:bg-green-50 hover:text-primary"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;