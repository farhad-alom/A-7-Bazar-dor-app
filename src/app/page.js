'use client';

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";

function subscribe() {
  return () => {};
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
      <Navbar />
      <PriceTicker />

      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-green-950 px-6 py-6 text-white sm:px-10 sm:py-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            
            {/* left side text content*/}
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm text-green-200 min-h-[30px]">
                {banglaDate}
              </span>

              <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                আজকের বাজার দর, <br />
                এখন আপনার হাতেই
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-green-100 sm:text-base">
                চাল, ডাল, তেল, মাছ ও নিত্যপ্রয়োজনীয় পণ্যের দাম
                সহজেই দেখুন। বাজারের দর জানুন, সচেতনভাবে কেনাকাটা করুন।
              </p>

              <a
                href="#সব-পণ্য"
                className="mt-6 inline-flex rounded-xl bg-white px-5 py-2.5 font-semibold text-green-950 transition hover:bg-green-100"
              >
                পণ্যের দাম দেখুন →
              </a>
            </div>

            {/* right side image */}
            <div className="relative flex justify-center lg:justify-end">
              <Image
                src="/bazar-hero.png"
                alt="বাজারের ছবি"
                width={450}
                height={300}
                className="rounded-2xl object-cover shadow-lg"
                priority
              />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;