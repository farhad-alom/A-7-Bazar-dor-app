'use client';

import { useState, useEffect } from "react";

const products = [
  { emoji: "🍚", name: "চাল", price: "৬৮", change: "+২.১" },
  { emoji: "🧅", name: "পেঁয়াজ", price: "৬০", change: "-১.৫" },
  { emoji: "🥔", name: "আলু", price: "৩৫", change: "-২.০" },
  { emoji: "🥚", name: "ডিম", price: "১২", change: "+১.২" },
  { emoji: "🌶️", name: "মরিচ", price: "৮০", change: "+৩.০" },
];

const PriceTicker = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="overflow-hidden bg-green-950 py-3 text-white">
        <div className="flex w-max gap-8 px-4 animate-pulse">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex shrink-0 items-center gap-2 text-sm opacity-60"
            >
              <div className="h-4 w-4 rounded bg-gray-600" />
              <div className="h-4 w-12 rounded bg-gray-600" />
              <div className="h-4 w-16 rounded bg-gray-600" />
              <div className="h-4 w-10 rounded bg-gray-600" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-green-950 py-3 text-white">
      <div className="flex w-max animate-[ticker_25s_linear_infinite] gap-8">
        {[...products, ...products].map((product, index) => (
          <div
            key={index}
            className="flex shrink-0 items-center gap-2 text-sm"
          >
            <span>{product.emoji}</span>
            <span>{product.name}</span>
            <span>{product.price} টাকা/কেজি</span>
            <span
              className={
                product.change.startsWith("+")
                  ? "text-green-300"
                  : "text-red-300"
              }
            >
              {product.change.startsWith("+") ? "▲" : "▼"}{" "}
              {product.change.replace(/[+-]/, "")}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTicker;