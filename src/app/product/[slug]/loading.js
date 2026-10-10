import Skeleton from "@/components/Skeleton";

export default function ProductLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Big Product Image */}
      <Skeleton className="w-full h-96 rounded-xl" />

      {/* Details Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-40 rounded-lg" />
      </div>
    </div>
  );
}