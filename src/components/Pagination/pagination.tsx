type PaginationProps = React.HTMLAttributes<HTMLDivElement> & {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  className,
  ...props
}: PaginationProps) => {
  if (!hasNextPage && !hasPrevPage) return null;

  return (
    <div
      {...props}
      className={`flex items-center justify-center gap-4 mt-10 ${
        className ?? ""
      }`}
    >
      {/* Previous */}
      <button
        disabled={!hasPrevPage}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className="cursor-pointer select-none px-4 py-2 text-sm font-medium bg-white border rounded-lg  disabled:opacity-40 disabled:cursor-not-allowed text-zinc-700 border-zinc-300 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-700"
      >
        ← Previous
      </button>

      {/* Page indicator */}
      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 select-none">
        Page {currentPage}
      </span>

      {/* Next */}
      <button
        disabled={!hasNextPage}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className="cursor-pointer select-none px-4 py-2 text-sm font-medium bg-white border rounded-lg  disabled:opacity-40 disabled:cursor-not-allowed text-zinc-700 border-zinc-300 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-700"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
