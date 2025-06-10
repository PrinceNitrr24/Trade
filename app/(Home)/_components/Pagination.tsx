import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  sortedOrders: any[];
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  sortedOrders,
  itemsPerPage,
  setCurrentPage,
}: PaginationProps): JSX.Element {
  const handlePrevious = () => {
    setCurrentPage(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    setCurrentPage(Math.min(totalPages, currentPage + 1));
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
      <div className="text-sm text-gray-600">
        Showing{" "}
        {Math.min((currentPage - 1) * itemsPerPage + 1, sortedOrders.length)} to{" "}
        {Math.min(currentPage * itemsPerPage, sortedOrders.length)} of{" "}
        {sortedOrders.length} orders
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
                className="w-8 h-8 p-0"
              >
                {pageNum}
              </Button>
            );
          })}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
