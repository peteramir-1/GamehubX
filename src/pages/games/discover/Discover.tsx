// Components
import { Pagination } from "@/components/Pagination";
import { GameCardSkeleton } from "@/components/GameCard";
import DiscoverHeader from "./DiscoverHeader";
import GamesGrid from "@/components/GameGrid/GameGrid";

// Hooks
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGames from "@/hooks/useGames";

// Models
import { DEFAULT_PAGE_SIZE } from "@/common/global-variables";

// Types
import type { Order } from "@/types";
import type { Platform } from "@/common/supported-platforms/supported-platforms.types";

const Discover = () => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<Order | undefined>("-added");
  const [platform, setPlatform] = useState<Platform | undefined>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);

  const { games, loading, error, totalGamesCount, next, previous } = useGames(
    { page, page_size: DEFAULT_PAGE_SIZE },
    platform,
    undefined,
    sorting
  );

  useEffect(() => {
    if (error) {
      navigate("/404", { replace: true });
    }
  }, [error, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const goToPage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className="min-h-screen px-6 py-10 transition-colors md:px-16 lg:px-32 bg-zinc-50 dark:bg-zinc-900 animate-fade-in">
      <DiscoverHeader
        totalGames={totalGamesCount}
        selectedSort={sorting}
        selectedPlatform={platform}
        onSortChange={(sort) => {
          setSorting(sort);
          goToPage(1);
        }}
        onPlatformChange={(platform) => {
          setPlatform(platform);
          goToPage(1);
        }}
      />

      {/* Loading Skeleton Grid */}
      {loading && (
        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Games Grid */}
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

export default Discover;
