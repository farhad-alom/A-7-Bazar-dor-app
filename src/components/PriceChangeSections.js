"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

const PriceChangeSections = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((error) => console.error("পণ্যের তথ্য লোড হয়নি:", error));
  }, []);

  const risers = products
    .filter((product) => product.change?.dir === "up")
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change?.dir === "down")
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <section>
        <h2 className="text-2xl font-bold"><span className="text-red-600 font-bold">▲</span> আজ দাম বেড়েছে </h2>
        <p className="mt-2 text-muted">যেসব পণ্যের দাম বেড়েছে</p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold"><span className="text-green-600 font-bold">▼</span> আজ দাম কমেছে </h2>
        <p className="mt-2 text-muted">যেসব পণ্যের দাম কমেছে</p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PriceChangeSections;

