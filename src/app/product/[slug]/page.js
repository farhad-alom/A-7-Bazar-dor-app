"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getProducts, getProduct } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";

const UNIT_NAMES = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  piece: "প্রতি পিস",
  dozen: "প্রতি ডজন",
};

const formatPrice = (price) => Number(price || 0).toLocaleString("bn-BD");

export default function ProductDetailsPage() {
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
    return () => { isMounted = false; };
  }, [slug, session, isPending, router]);

  // বাজারদর ক্যালকুলেশন Optimization
  const stats = useMemo(() => {
    const markets = Array.isArray(product?.markets) ? product.markets : [];
    if (!markets.length) return { min: 0, max: 0, avg: 0, markets: [] };

    const mins = markets.map((m) => Number(m.min));
    const maxs = markets.map((m) => Number(m.max));

    const min = Math.min(...mins);
    const max = Math.max(...maxs);
    const avg = Math.round(
      markets.reduce((acc, m) => acc + (Number(m.min) + Number(m.max)) / 2, 0) / markets.length
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
        <Link href="/" className="mt-5 inline-block rounded-xl bg-primary px-5 py-3 text-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <>

     <Navbar />
  <PriceTicker />

      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm text-primary hover:underline">
          ← হোম পেজ
        </Link>

        {/* Product Summary Card */}
        <section className="mt-5 rounded-3xl border border-border bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-6xl">
              {product.image}
            </div>

            <div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <h1 className="mt-3 text-3xl font-bold">{product.nameBn}</h1>
              <p className="mt-2 text-muted">
                {UNIT_NAMES[product.unit] || `প্রতি ${product.unit}`} · আজকের বাজার দর
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="সর্বনিম্ন দাম" price={stats.min} color="bg-green-50 text-primary" />
            <StatCard label="সর্বোচ্চ দাম" price={stats.max} color="bg-orange-50 text-orange-700" />
            <StatCard label="গড় বাজারদর" price={stats.avg} color="bg-blue-50 text-blue-700" />
          </div>
        </section>

        {/* Market Table Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
          <p className="mt-2 text-sm text-muted">বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম।</p>

          <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead className="bg-green-50">
                <tr>
                  <th className="p-4">বাজার</th>
                  <th className="p-4">বিভাগ</th>
                  <th className="p-4">সর্বনিম্ন</th>
                  <th className="p-4">সর্বোচ্চ</th>
                </tr>
              </thead>
              <tbody>
                {stats.markets.length > 0 ? (
                  stats.markets.map((m, idx) => (
                    <tr key={`${m.market}-${idx}`} className="border-t border-border">
                      <td className="p-4 font-medium">{m.market}</td>
                      <td className="p-4">{m.division}</td>
                      <td className="p-4 text-primary">{formatPrice(m.min)} টাকা</td>
                      <td className="p-4">{formatPrice(m.max)} টাকা</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-muted">
                      এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// Reusable Small Component for Stats
function StatCard({ label, price, color }) {
  return (
    <div className={`rounded-2xl p-5 ${color.split(" ")[0]}`}>
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-2 text-2xl font-bold ${color.split(" ")[1]}`}>
        {formatPrice(price)} টাকা
      </p>
    </div>
  );
}