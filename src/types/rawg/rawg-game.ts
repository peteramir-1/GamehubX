import type { RawgSimpleItem } from "./rawg-common";
import type { RawgParentPlatform, RawgPlatformInfo } from "./rawg-platform";
import type { RawgRating } from "./rawg-rating";
import type { RawgScreenshot } from "./rawg-screenshot";
import type { RawgStoreInfo } from "./rawg-store";

export interface RawgGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawgGame[];
}

// A single game in the list
export interface RawgGame {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  tba: boolean;
  background_image: string | null;
  rating: number;
  rating_top: number;
  ratings: RawgRating[];
  ratings_count: number;
  reviews_count: number;
  reviews_text_count: string;
  metacritic: number | null;
  playtime: number;
  suggestions_count: number;
  updated: string;
  added: number;
  added_by_status: Record<string, number>;
  short_screenshots: RawgScreenshot[];

  // Nested metadata
  esrb_rating: RawgSimpleItem | null;
  genres: RawgSimpleItem[];
  parent_platforms: RawgParentPlatform[];
  platforms: RawgPlatformInfo[];
  stores: RawgStoreInfo[];
  tags: RawgSimpleItem[];
}
