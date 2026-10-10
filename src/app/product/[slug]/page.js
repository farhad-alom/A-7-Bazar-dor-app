"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProducts, getProduct } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

const formatPrice = (price) => Number(price || 0).toLocaleString("bn-BD");

function ProductDetailsContent() {
  const { slug } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) return router.replace("/signin");
    if (!slug) return;

    let isMounted = true;

    async function loadProduct() {
      try {
        setLoading(true);
        setError(false);

        const products = await getProducts();
        const found = products.find((item) => item.slug === slug);

        if (!found) throw new Error("Product not found");

        const details = found.id ? await getProduct(found.id) : found;

        if (isMounted) setProduct(details);
      } catch (err) {
        console.error("পণ্যের তথ্য লোড হয়নি:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProduct();
    return () => {
      isMounted = false;
    };
  }, [slug, session, isPending, router]);

  // বাজার দর ক্যালকুলেশন
  const stats = useMemo(() => {
    const markets = Array.isArray(product?.markets) ? product.markets : [];
    if (!markets.length) return { min: 0, max: 0, avg: 0, markets: [] };

    const mins = markets.map((m) => Number(m.min));
    const maxs = markets.map((m) => Number(m.max));

    const min = Math.min(...mins);
    const max = Math.max(...maxs);
    const avg = Math.round(
      markets.reduce((acc, m) => acc + (Number(m.min) + Number(m.max)) / 2, 0) /
        markets.length
    );

    return { min, max, avg, markets };
  }, [product]);

  if (isPending || loading) {
    return <p className="py-20 text-center text-muted">পণ্যের তথ্য লোড হচ্ছে...</p>;
  }

  if (error || !product) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">পণ্যটি খুঁজে পাওয়া যায়নি!</h1>
        <Link
          href="/"
          className="mt-5 inline-block rounded-xl bg-primary px-5 py-3 text-white"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const isUp = product.change?.dir === "up";

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* 1. Breadcrumb Navigation */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          হোম
        </Link>
        {" › "}
        <span className="hover:underline">
          {product.categoryNameBn || "ক্যাটাগরি"}
        </span>
        {" › "}
        <span className="font-medium text-gray-800">{product.nameBn}</span>
      </nav>

      {/* 2. Top Header Card */}
      <div className="flex flex-col justify-between gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50 text-5xl">
            {product.image}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.nameBn}</h1>
            <p className="mt-1 text-xs text-gray-400">
              প্রতি {product.unit || "কেজি"} · {product.categoryNameBn}
            </p>
            {product.change && (
              <p className="mt-2 text-xs text-gray-500">
                গতকালের তুলনায় আজ দাম {isUp ? "বেড়েছে" : "কমেছে"} ·{" "}
                {formatPrice(Math.abs(product.change.diff || 2))} টাকা
              </p>
            )}
          </div>
        </div>

        {/* Right Side Today Price Box */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50/80 px-6 py-3 text-center sm:items-end">
          <p className="text-xs text-gray-400">আজকের দাম</p>
          <p className="mt-1 text-3xl font-extrabold text-gray-900">
            {formatPrice(product.today || stats.avg)}
          </p>
          <p className="text-xs text-gray-400">টাকা / {product.unit || "কেজি"}</p>
          {product.change && (
            <span
              className={`mt-1 text-xs font-semibold ${
                isUp ? "text-red-500" : "text-green-600"
              }`}
            >
              {isUp ? "▲" : "▼"}{" "}
              {formatPrice(Math.abs(product.change.pct || 0))}%
            </span>
          )}
        </div>
      </div>

      {/* 3. Price Summary Section */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs text-gray-400">সর্বনিম্ন দাম</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {formatPrice(stats.min)} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-400">সবচেয়ে কম দামের বাজার</p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs text-gray-400">সর্বাধিক দাম</p>
            <p className="mt-2 text-2xl font-bold text-rose-500">
              {formatPrice(stats.max)} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs text-gray-400">গড় দাম</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {formatPrice(stats.avg)} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-400">
              প্রতি {product.unit || "কেজি"}-এর হিসাব
            </p>
          </div>
        </div>
      </section>

      {/* 4. Market Table Section */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50/50 text-xs text-gray-400">
              <tr>
                <th className="p-4 font-normal">বাজার</th>
                <th className="p-4 font-normal">বিভাগ</th>
                <th className="p-4 font-normal">সর্বনিম্ন</th>
                <th className="p-4 font-normal">সর্বাধিক</th>
                <th className="p-4 font-normal text-right">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.markets.length > 0 ? (
                stats.markets.map((m, idx) => {
                  const marketAvg = Math.round(
                    (Number(m.min) + Number(m.max)) / 2
                  );
                  return (
                    <tr
                      key={`${m.market}-${idx}`}
                      className="hover:bg-gray-50/50"
                    >
                      <td className="p-4 font-medium text-gray-800">
                        {m.market}
                      </td>
                      <td className="p-4 text-gray-500">{m.division}</td>
                      <td className="p-4 text-gray-800">
                        {formatPrice(m.min)} টাকা
                      </td>
                      <td className="p-4 text-gray-800">
                        {formatPrice(m.max)} টাকা
                      </td>
                      <td className="p-4 text-right font-medium text-gray-800">
                        {formatPrice(marketAvg)} টাকা
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">
                    এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={<p className="py-20 text-center text-muted">লোডিং হচ্ছে...</p>}
    >
      <ProductDetailsContent />
    </Suspense>
  );
}