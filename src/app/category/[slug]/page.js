
import { Suspense } from "react";
import CategoryPageClient from "./CategoryPageClient";

export default function CategoryPage({ params }) {
  
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-center">ক্যাটাগরি লোড হচ্ছে...</p>
        </main>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }) {
  const { slug } = await params;

  return <CategoryPageClient slug={slug} />;
}