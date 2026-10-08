"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("পণ্যের তথ্য লোড করা যায়নি।"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="সব-পণ্য" className="py-10">
      <h2 className="text-2xl font-bold">সব পণ্য</h2>
      <p className="mt-2 text-muted">
        নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার দর।
      </p>

      {loading ? (
        <p className="py-10 text-muted">পণ্যের তথ্য লোড হচ্ছে...</p>
      ) : error ? (
        <p className="py-10 text-red-600">{error}</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;

