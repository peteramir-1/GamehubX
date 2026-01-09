// Helpers
import clsx from "clsx";

// Types
import type { Order } from "@/types";

export type FilterOption<T = string> = {
  id: number | string;
  label: string;
  value: T;
};

export type SearchHeaderProps<TFilter = string> =
  React.HTMLAttributes<HTMLElement> & {
    /** Header */
    title: string;
    description?: string;
    totalResults?: number;

    /** Search */
    searchQuery?: string;
    searchPlaceholder?: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit: () => void;

    /** Filters */
    filters?: FilterOption<TFilter>[];
    selectedFilter?: TFilter;
    onFilterChange?: (value: TFilter) => void;

    /** Sorting */
    sortOptions?: { name: string; value: Order }[];
    selectedSort?: Order;
    onSortChange?: (sort: Order) => void;
  };

const SearchHeader = <TFilter,>({
  title,
  description,
  totalResults,

  searchQuery = "",
  searchPlaceholder = "Search…",
  onSearchChange,
  onSearchSubmit,

  filters,
  selectedFilter,
  onFilterChange,

  sortOptions,
  selectedSort,
  onSortChange,

  className,
  ...props
}: SearchHeaderProps<TFilter>) => {
  const hasControls = Boolean(
    (filters?.length && onFilterChange) || (sortOptions?.length && onSortChange)
  );

  return (
    <header {...props} className={clsx("mb-10 space-y-8", className)}>
      {/* Title + Search */}
      <div className="flex flex-col items-center gap-6 text-center">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            {title}
          </h1>

          {(description || totalResults !== undefined) && (
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {description}
              {totalResults !== undefined && (
                <span className="ml-2 text-sm text-zinc-500">
                  ({totalResults.toLocaleString()})
                </span>
              )}
            </p>
          )}
        </div>

        {/* Search Input */}
        <input
          type="search"
          value={searchQuery}
          placeholder={searchPlaceholder}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearchSubmit()}
          className="w-full max-w-xl px-4 py-3 font-medium text-center bg-white border rounded-lg border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder-zinc-500"
        />
      </div>

      {/* Controls */}
      {hasControls && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Filters */}
          {filters && onFilterChange && (
            <div className="flex flex-wrap gap-2">
              {filters.map(({ id, label, value }) => {
                const isActive = Object.is(selectedFilter, value);

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onFilterChange(value)}
                    className={clsx(
                      "px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer",
                      isActive
                        ? "bg-indigo-500 text-white"
                        : `
                          bg-zinc-100 text-zinc-700 hover:bg-zinc-200
                          dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700
                        `
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Sorting */}
          {sortOptions && onSortChange && (
            <select
              value={selectedSort ?? ""}
              onChange={(e) => onSortChange(e.target.value as Order)}
              className="px-3 py-2 text-sm bg-white border rounded-lg border-zinc-300 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200"
            >
              {sortOptions.map(({ name, value }) => (
                <option key={value} value={value}>
                  {name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </header>
  );
};

export default SearchHeader;
