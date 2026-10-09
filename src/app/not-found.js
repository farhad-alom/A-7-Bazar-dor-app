import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-primary">404</p>

      <h1 className="mt-5 text-2xl font-bold">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h1>

      <p className="mt-2 text-muted">
        তুমি যে পেজটি খুঁজছ, সেটি হয়তো সরানো হয়েছে অথবা URL ভুল।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-xl bg-primary px-5 py-3 text-white"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}