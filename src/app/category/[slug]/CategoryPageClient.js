"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";


export default function CategoryPageClient({ slug }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(false);

      try {
        const [categories, items] = await Promise.all([
          getCategories(),
          getProducts(slug),
        ]);

        if (cancelled) return;

        const foundCategory = categories.find((item) => item.slug === slug);

        setCategory(foundCategory || null);
        setProducts(Array.isArray(items) ? items : []);
      } catch (err) {
        console.error("ডেটা লোড করতে সমস্যা হয়েছে:", err);
        if (!cancelled) {
          setError(true);
          setCategory(null);
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sort === "low") return Number(a.today) - Number(b.today);
      if (sort === "high") return Number(b.today) - Number(a.today);
      return 0;
    });
  }, [products, sort]);

  return (
    <>

      <main className="mx-auto min-h-[50vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {loading ? (
          <>
            <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-52 animate-pulse rounded-2xl bg-gray-100"
                />
              ))}
            </div>
          </>
        ) : error ? (
          <div className="py-12 text-center">
            <h1 className="text-2xl font-bold">পণ্যের তথ্য লোড করা যায়নি!</h1>
            <p className="mt-2 text-muted">
              ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করো।
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-primary px-5 py-3 text-white"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : !category || products.length === 0 ? (
          <div className="py-12 text-center">
            <h1 className="text-2xl font-bold">কোনো পণ্য পাওয়া যায়নি!</h1>
            <p className="mt-2 text-muted">
              এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।
            </p>
            <Link
              href="/"
              className="mt-5 inline-block rounded-lg bg-primary px-5 py-3 text-white"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-bold">
                {category.icon} {category.nameBn}
              </h1>

              <label className="flex items-center gap-2 text-sm">
                সাজান:
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="rounded-lg border border-border bg-white px-3 py-2"
                >
                  <option value="default">ডিফল্ট</option>
                  <option value="low">দাম: কম থেকে বেশি</option>
                  <option value="high">দাম: বেশি থেকে কম</option>
                </select>
              </label>
            </div>

            <p className="mt-3 text-muted">
              {products.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id ?? product.slug}
                  product={product}
                />
              ))}
            </div>
          </>
        )}
      </main>

    </>
  );
}