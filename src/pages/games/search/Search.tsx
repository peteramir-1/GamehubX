// Components
import { Pagination } from "@/components/Pagination";
import { GameCardSkeleton } from "@/components/GameCard";
import SearchHeader from "./SearchHeader";
import GamesGrid from "@/components/GameGrid/GameGrid";

// Hooks
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGames from "@/hooks/useGames";

// Models
import { DEFAULT_PAGE_SIZE } from "@/common/global-variables";
import { OrderOptions } from "@/common/rawg-variables";
import { supportedPlatformsList } from "@/common/supported-platforms/supported-platforms.model";

// Types
import type { Order } from "@/types";
import type { Platform } from "@/common/supported-platforms/supported-platforms.types";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  /** URL-driven state */
  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? 1);

  /** UI-only state */
  const [sorting, setSorting] = useState<Order>("-added");
  const [platform, setPlatform] = useState<Platform | undefined>();
  const [searchInput, setSearchInput] = useState(query);

  /** Redirect invalid search */
  useEffect(() => {
    if (!query.trim()) {
      navigate("/game/discover", { replace: true });
    }
  }, [query, navigate]);

  /** Fetch games */
  const { games, loading, error, next, previous } = useGames(
    { page, page_size: DEFAULT_PAGE_SIZE },
    platform,
    undefined,
    sorting,
    query
  );

  /** Error handling */
  useEffect(() => {
    if (error) navigate("/404", { replace: true });
  }, [error, navigate]);

  /** Scroll on page change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  /** Helpers */
  const updateParams = (updates: Record<string, string>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      Object.entries(updates).forEach(([k, v]) => params.set(k, v));
      return params;
    });
  };

  const handleSearch = () => {
    if (!searchInput.trim()) {
      navigate("/game/discover");
      return;
    }

    updateParams({ q: searchInput, page: "1" });
  };

  const goToPage = (page: number) => {
    updateParams({ q: query, page: String(page) });
  };

  return (
    <div className="min-h-screen px-6 py-10 transition-colors md:px-16 lg:px-32 bg-zinc-50 dark:bg-zinc-900 animate-fade-in">
      <SearchHeader
        title="Search Results"
        searchQuery={searchInput}
        searchPlaceholder="Search for games..."
        onSearchChange={setSearchInput}
        onSearchSubmit={handleSearch}
        sortOptions={OrderOptions}
        selectedSort={sorting}
        onSortChange={(sort) => {
          setSorting(sort);
          goToPage(1);
        }}
        filters={supportedPlatformsList.map((p) => ({
          id: p.id,
          label: p.name,
          value: p.value,
        }))}
        selectedFilter={platform}
        onFilterChange={(value) => {
          setPlatform(value);
          goToPage(1);
        }}
      />

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && <GamesGrid games={games} page={page} className="mt-6" />}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        hasNextPage={Boolean(next)}
        hasPrevPage={Boolean(previous)}
        onPageChange={goToPage}
        className="mt-12"
      />
    </div>
  );
};

export default Search;
