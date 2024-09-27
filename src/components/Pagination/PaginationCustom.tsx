import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";

interface PaginationCustomProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationCustom({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationCustomProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToPage = (page: number) => {
    onPageChange(page);
    // Implement logic to fetch data for the selected page
    // For example: fetchData(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const renderPaginationLinks = () => {
    const pages = [];

    if (isMobile) {
      pages.push(
        <PaginationItem key={currentPage}>
          <PaginationLink href="#" isActive={true}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );
    } else {
      if (currentPage > 1) {
        pages.push(
          <PaginationItem key={1}>
            <PaginationLink href="#" onClick={() => goToPage(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        );

        if (currentPage > 2) {
          pages.push(
            <PaginationItem key="ellipsis-start">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
      }

      pages.push(
        <PaginationItem key={currentPage}>
          <PaginationLink href="#" isActive={true}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage < totalPages) {
        if (currentPage < totalPages - 1) {
          pages.push(
            <PaginationItem key="ellipsis-end">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink href="#" onClick={() => goToPage(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePrevious} />
        </PaginationItem>
        {renderPaginationLinks()}
        <PaginationItem>
          <PaginationNext href="#" onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
