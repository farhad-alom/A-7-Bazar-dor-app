import Skeleton from "./Skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="block rounded-2xl border border-border bg-white p-4 shadow-sm">

      <Skeleton className="flex h-24 w-full items-center justify-center rounded-xl bg-gray-200" />


      <Skeleton className="mt-4 h-5 w-3/4 rounded bg-gray-200" />


      <Skeleton className="mt-2 h-4 w-1/2 rounded bg-gray-200" />


      <div className="mt-4 flex items-end justify-between gap-2">
        <div className="space-y-1">
          <Skeleton className="h-3 w-16 rounded bg-gray-200" />
          <Skeleton className="h-5 w-20 rounded bg-gray-200" />
        </div>

        <Skeleton className="h-6 w-14 rounded-full bg-gray-200" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;