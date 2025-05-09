import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import usePagination from "@/hooks/usePagination";

type DynamicPaginationProps = {
  totalPage: number;
};

export const DynamicPagination = ({ totalPage }: DynamicPaginationProps) => {
  const {
    currentPageAsNumber,
    pageLimit,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    displayButtons,
  } = usePagination(totalPage);

  return (
    <div className="h-20 font-semibold top-10">
      <Pagination>
        <PaginationContent>
          {currentPageAsNumber > 1 && (
            <PaginationItem
              onClick={handlePreviousPage}
              className="cursor-pointer"
            >
              <PaginationPrevious />
            </PaginationItem>
          )}

          {currentPageAsNumber !== 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {displayButtons.map((pageNumber) => (
            <PaginationItem
              onClick={handlePageChange(pageNumber)}
              key={pageNumber}
              className={
                pageNumber === currentPageAsNumber
                  ? "border border-[#E4E4E7] rounded-md"
                  : ""
              }
            >
              <PaginationLink>{pageNumber}</PaginationLink>
            </PaginationItem>
          ))}

          {pageLimit !== currentPageAsNumber && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {currentPageAsNumber < pageLimit && (
            <PaginationItem onClick={handleNextPage} className="cursor-pointer">
              <PaginationNext />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
