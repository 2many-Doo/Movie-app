"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const usePagination = (totalPage: number) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const maxButton = 3;
  const pageLimit = Math.min(totalPage, 10);
  const currentPage = searchParams.get("page") ?? 1;
  const currentPageAsNumber = Number(currentPage);

  const handlePageChange = (pageNumber: number) => () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    push(`${pathname}?${params.toString()}`);
  };

  const handlePreviousPage = () => {
    if (currentPageAsNumber > 1) {
      handlePageChange(currentPageAsNumber - 1)();
    }
  };

  const handleNextPage = () => {
    if (currentPageAsNumber < pageLimit) {
      handlePageChange(currentPageAsNumber + 1)();
    }
  };

  let start = Math.max(currentPageAsNumber - Math.floor(maxButton / 2), 1);
  let end = start + maxButton - 1;

  if (end > pageLimit) {
    end = pageLimit;
    start = end - maxButton + 1;
  }

  const displayButtons = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );

  return {
    currentPageAsNumber,
    pageLimit,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    displayButtons,
  };
};

export default usePagination;
