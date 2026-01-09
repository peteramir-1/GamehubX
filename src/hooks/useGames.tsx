// Hooks
import { useState, useEffect } from "react";

// Helpers
import { buildRawgUrl } from "@/common/rawg-helpers";

// Types
import type { Order, RawgGame, RawgGamesResponse } from "@/types/rawg";
import type { Platform } from "@/common/supported-platforms/supported-platforms.types";

interface Pagination {
  page_size: number;
  page?: number;
}

const useGames = (
  { page, page_size }: Pagination,
  platforms?: Platform,
  dates?: [Date, Date],
  ordering?: Order,
  search?: string,
  search_exact: boolean = false,
  search_precise: boolean = false
) => {
  const [games, setGames] = useState<RawgGame[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [totalGamesCount, setTotalGamesCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      buildRawgUrl("games", {
        page,
        page_size,
        platforms,
        dates,
        ordering,
        search,
        search_exact,
        search_precise,
      })
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch trending games");
        return res.json();
      })
      .then((data: RawgGamesResponse) => {
        setTotalGamesCount(data.count);
        setNext(data.next);
        setPrevious(data.previous);
        setGames(data.results);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [platforms, page, ordering, search]);

  return { games, loading, error, totalGamesCount, next, previous };
};

export default useGames;
