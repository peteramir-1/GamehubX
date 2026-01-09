import type { RawgScreenshot } from "./rawg-screenshot";
import type { RawgPlatformInfo } from "./rawg-platform";

export interface RawgGameDetails {
  id: number;
  name: string;
  description: string;
  description_raw: string;
  released: string;
  rating: number;
  metacritic: number | null;
  playtime: number;
  background_image: string;
  platforms: RawgPlatformInfo[];
  short_screenshots: RawgScreenshot[];
}
