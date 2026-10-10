"use client";

import { useState, useEffect } from "react";
import Skeleton from "@/components/Skeleton";

const Footer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <footer className="mt-12 border-t border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-4 w-80" />
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-12 border-t border-border bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="mt-2 text-sm text-muted">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        <p className="text-sm text-muted" suppressHydrationWarning>
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;