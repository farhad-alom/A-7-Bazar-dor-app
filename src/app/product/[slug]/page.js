"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { getProducts } from "@/lib/api";

const formatPrice = (price) =>
  Number(price).toLocaleString("bn-BD");

const ProductDetailsPage = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts()
      .then((products) => {
        const found = products.find((item) => item.slug === slug);

        if (!found) {
          setError(true);
          return;
        }

        setProduct(found);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const unitNames = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
  };

  const markets = product?.markets ?? [];

  const minPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : 0;

  const maxPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : 0;

  const averagePrice = markets.length
    ? Math.round(
        markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0
        ) / markets.length
      )
    : 0;

  return (
    <>
      <Navbar />
      <PriceTicker />

      <main className="mx-auto min-h-[50vh] max-w-6xl px-4 py-10">
        {loading ? (
          <p className="py-16 text-center text-muted">
            পণ্যের তথ্য লোড হচ্ছে...
          </p>
        ) : error || !product ? (
          <div className="py-16 text-center">
            <h1 className="text-2xl font-bold">
              পণ্যটি খুঁজে পাওয়া যায়নি!
            </h1>

            <Link
              href="/"
              className="mt-5 inline-block rounded-xl bg-primary px-5 py-3 text-white"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <>
            <Link href="/" className="text-sm text-primary hover:underline">
              ← হোম পেজ
            </Link>

            <section className="mt-5 rounded-3xl border border-border bg-white p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-6xl">
                  {product.image}
                </div>

                <div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                    {product.categoryIcon} {product.categoryNameBn}
                  </span>

                  <h1 className="mt-3 text-3xl font-bold">
                    {product.nameBn}
                  </h1>

                  <p className="mt-2 text-muted">
                    {unitNames[product.unit] || `প্রতি ${product.unit}`}
                    {" · "}আজকের বাজার দর
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-green-50 p-5">
                  <p className="text-sm text-muted">সর্বনিম্ন দাম</p>
                  <p className="mt-2 text-2xl font-bold text-primary">
                    {formatPrice(minPrice)} টাকা
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-5">
                  <p className="text-sm text-muted">সর্বোচ্চ দাম</p>
                  <p className="mt-2 text-2xl font-bold text-orange-700">
                    {formatPrice(maxPrice)} টাকা
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-5">
                  <p className="text-sm text-muted">গড় বাজারদর</p>
                  <p className="mt-2 text-2xl font-bold text-blue-700">
                    {formatPrice(averagePrice)} টাকা
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                বাজারভিত্তিক আজকের দাম
              </h2>

              <p className="mt-2 text-sm text-muted">
                বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম।
              </p>

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
                    {markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-t border-border"
                      >
                        <td className="p-4 font-medium">{market.market}</td>
                        <td className="p-4">{market.division}</td>
                        <td className="p-4 text-primary">
                          {formatPrice(market.min)} টাকা
                        </td>
                        <td className="p-4">
                          {formatPrice(market.max)} টাকা
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ProductDetailsPage;
