import Skeleton from "./Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
      {/* Product Image Skeleton */}
      <Skeleton className="w-full h-40 rounded-lg" />
      {/* Title Skeleton */}
      <Skeleton className="h-5 w-3/4" />
      {/* Price Skeleton */}
      <Skeleton className="h-4 w-1/2" />
      {/* Button Skeleton */}
      <Skeleton className="h-9 w-full rounded-md mt-2" />
    </div>
  );
}