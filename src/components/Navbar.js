'use client';

import { useSyncExternalStore } from "react";
import Link from "next/link";
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

const getBanglaDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

const subscribe = () => () => {};

const Navbar = () => {
  const router = useRouter();

  const banglaDate = useSyncExternalStore(
    subscribe,
    getBanglaDate,
    () => ""
  );

  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
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
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-bold text-primary">
            🛒 বাজার দর
          </span>
          <span className="text-sm text-muted">{banglaDate}</span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <span className="text-sm text-muted">লোড হচ্ছে...</span>
          ) : session?.user ? (
            <>
              <Link
                href="/profile"
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100"
              >
                👤 প্রোফাইল
              </Link>

              <button
                onClick={handleSignOut}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                সাইন আউট
              </button>
            </>
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

