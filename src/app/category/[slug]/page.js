"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";

const CategoryPage = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([getCategories(), getProducts(slug)])
      .then(([categories, items]) => {
        setCategory(categories.find((item) => item.slug === slug) || null);
        setProducts(items);
      })
      .catch(() => {
        setCategory(null);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return a.today - b.today;
    if (sort === "high") return b.today - a.today;
    return 0;
  });

  if (loading) {
    return <main className="mx-auto max-w-6xl px-4 py-12">পণ্য লোড হচ্ছে...</main>;
  }

  if (!category || products.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">কোনো পণ্য পাওয়া যায়নি!</h1>
        <Link href="/" className="mt-5 inline-block rounded-lg bg-primary px-5 py-3 text-white">
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  return (
    <>
        <Navbar />
        <PriceTicker />
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
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

      <p className="mt-2 text-muted">
        {products.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
    </>
  );
};

export default CategoryPage;