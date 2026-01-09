import type { Order } from "@/types";
import { supportedPlatformsList } from "./supported-platforms/supported-platforms.model";
import { type Platform } from "./supported-platforms/supported-platforms.types";
import { DOMAIN } from "./rawg-variables";
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

/* =======================
   Type Aliases
======================= */

/**
 * RAWG "dates" parameter
 * Represents game **release dates**
 */
type ReleaseDates = Date[];

/**
 * RAWG "updated" parameter
 * Represents last **update timestamps** on RAWG
 */
type UpdatedDates = Date[];

/* =======================
   Types
======================= */

export interface RawgUrlKeyParameters {
  page?: number;
  page_size?: number;
  ordering?: Order | null;
  platforms?: Platform | null;
  search?: string | null;
  search_exact?: boolean;
  search_precise?: boolean;

  /**
   * RAWG "dates" query parameter.
   *
   * Represents **game release dates**, NOT arbitrary date ranges.
   * Serialized as:
   * `&dates=YYYY-MM-DD,YYYY-MM-DD,...`
   */
  dates?: ReleaseDates;

  /**
   * RAWG "updated" query parameter.
   *
   * Filters games by **last updated dates** on RAWG.
   * Serialized as:
   * `&updated=YYYY-MM-DD,YYYY-MM-DD,...`
   */
  updated?: UpdatedDates;
}

type RawgEndpoints =
  | "games"
  | "platforms/lists/parents"
  | "tags"
  | `games/${string}`;

/* =======================
   Helpers
======================= */

const typedEntries = <T extends object>(obj: T): Array<[keyof T, T[keyof T]]> =>
  Object.entries(obj) as Array<[keyof T, T[keyof T]]>;

const buildUrlBase = (endpoint: string) =>
  `${DOMAIN}/${endpoint}?key=${RAWG_API_KEY}`;

const buildQueryParam = <K extends keyof RawgUrlKeyParameters>(
  key: K,
  value: string
) => `&${key}=${value}`;

const formatYearMonth = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-indexed
  return `${year}-${month}`;
};

/* =======================
   Special Query Builders
======================= */

function buildPlatformsQueryParam(selectedPlatform?: Platform | null): string {
  const platformIds =
    selectedPlatform == null
      ? supportedPlatformsList.map((p) => p.id)
      : supportedPlatformsList
          .filter((p) => p.value === selectedPlatform)
          .map((p) => p.id);

  return platformIds.length ? `&platforms=${platformIds.join(",")}` : "";
}

function buildDateRangeQueryParam(
  key: "dates" | "updated",
  dates?: ReleaseDates | UpdatedDates
): string {
  if (!dates?.length) return "";

  const formattedDates = dates.map((d) => formatYearMonth(d));

  return `&${key}=${formattedDates.join(",")}`;
}

function buildOrderingQueryParam(order?: Order | null): string {
  return order ? `&ordering=${order}` : "";
}

function buildSearchQueryParam(
  search?: string | null,
  search_exact: boolean = false,
  search_precise: boolean = false
): string {
  if (!search || search === "") return "";

  return `${buildQueryParam("search", search)}${buildQueryParam(
    "search_exact",
    String(search_exact)
  )}${buildQueryParam("search_precise", String(search_precise))}`;
}

/* =======================
   Reserved Keys / Endpoints
======================= */

const RESERVED_QUERY_KEYS = new Set<keyof RawgUrlKeyParameters>([
  "platforms",
  "ordering",
  "dates",
  "updated",
  "search",
  "search_exact",
  "search_precise",
]);

const RESERVED_ENDPOINTS = new Set<RawgEndpoints>([
  "platforms/lists/parents",
  "tags",
]);

/* =======================
   Public API
======================= */

export function buildRawgUrl(
  endpoint: RawgEndpoints,
  params: RawgUrlKeyParameters
): string {
  let url = buildUrlBase(endpoint);

  if (RESERVED_ENDPOINTS.has(endpoint)) return url;

  // generic query parameters
  for (const [key, value] of typedEntries(params)) {
    if (value == null) continue;
    if (RESERVED_QUERY_KEYS.has(key)) continue;

    url += buildQueryParam(key, String(value));
  }

  // special parameters
  url += buildPlatformsQueryParam(params.platforms);
  url += buildDateRangeQueryParam("updated", params.updated);
  url += buildDateRangeQueryParam("dates", params.dates);
  url += buildOrderingQueryParam(params.ordering);
  url += buildSearchQueryParam(
    params.search,
    params.search_exact,
    params.search_precise
  );

  return url;
}
