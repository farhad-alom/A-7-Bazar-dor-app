'use client';

import PriceChangeSections from "@/components/PriceChangeSections";
import ProductList from "@/components/ProductList";
import { useSyncExternalStore } from "react";
import Image from "next/image";

function subscribe() {
  return () => { };
}

function getSnapshot() {
  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

function getServerSnapshot() {
  return "";
}

const Home = () => {
  const banglaDate = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-green-950 px-6 py-6 text-white sm:px-10 sm:py-8 mt-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">

            {/* left side text content */}
            <div className="relative z-10 max-w-2xl mb-14">
              {!banglaDate ? (
      
                <div className="space-y-4 animate-pulse">
                  <div className="h-8 w-32 rounded-full bg-green-900/60 mb-9" />
                  <div className="space-y-2">
                    <div className="h-9 w-3/4 rounded bg-green-900/60" />
                    <div className="h-9 w-1/2 rounded bg-green-900/60" />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="h-4 w-full rounded bg-green-900/60" />
                    <div className="h-4 w-5/6 rounded bg-green-900/60" />
                  </div>
                  <div className="h-10 w-36 rounded-xl bg-green-900/60 mt-6" />
                </div>
              ) : (
                <>
                  <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm text-green-200 min-h-7.5 mb-9">
                    {banglaDate}
                  </span>

                  <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                    আজকের বাজারের দাম এক নজরে
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-green-100 sm:text-base">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                  </p>

                  <a
                    href="#সব-পণ্য"
                    className="mt-6 inline-flex rounded-xl bg-white px-5 py-2.5 font-semibold text-green-950 transition hover:bg-green-100"
                  >
                    সব পণ্য দেখুন →
                  </a>
                </>
              )}
            </div>

            {/* right side image */}
            <div className="relative flex justify-center lg:justify-end">
              {!banglaDate ? (
                <div className="h-[250px] w-full max-w-[450px] rounded-2xl bg-green-900/60 animate-pulse shadow-lg" />
              ) : (
                <Image
                  src="/bazar-hero.png"
                  alt="বাজারের ছবি"
                  width={450}
                  height={300}
                  className="rounded-2xl object-cover shadow-lg"
                  priority
                />
              )}
            </div>

          </div>
        </section>
      </main>

      <PriceChangeSections />

      <ProductList />
    </>
  );
};

export default Home;