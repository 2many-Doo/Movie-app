"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const GenrePageSkeleton = () => {
  return (
    <div className="md:flex gap-3 md:gap-5 md:py-10 px-5 md:px-20">
      <div className="px-7 w-100 md:w-150 md:h-1/3 md:border-r-2 md:border-gray-200 flex flex-wrap gap-4 md:pl-20">
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-4 w-full" />
        {Array.from({ length: 13 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 md:w-28 rounded-full border" />
        ))}
      </div>

      <div className="grid grid-cols-2 grid-rows-6 gap-5 md:grid-cols-4 md:grid-rows-3 md:w-2/3 md:gap-9 px-3 py-8 md:py-0 md:px-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className=" bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg">
            <Skeleton className="rounded-t-lg h-61 md:h-70 w-full" />
            <div className="py-4 pl-3 space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
