export const DOMAIN = "https://api.rawg.io/api";
export const RAWG_PLATFORM_IDS = {
  pc: 4,

  "playstation-5": 187,
  "playstation-4": 18,
  "playstation-3": 16,
  "playstation-2": 15,
  "playstation-1": 27,
  "ps-vita": 19,
  psp: 17,

  "xbox-series-x": 186,
  "xbox-one": 1,
  xbox360: 14,
  "xbox-old": 80,

  "nintendo-switch": 7,
  "nintendo-3ds": 8,
  "nintendo-ds": 9,
  "nintendo-dsi": 13,
  "wii-u": 10,
  wii: 11,
  gamecube: 105,
  "nintendo-64": 83,

  "game-boy-advance": 24,
  "game-boy-color": 43,
  "game-boy": 26,

  snes: 79,
  nes: 49,

  macos: 5,
  macintosh: 55,
  linux: 6,

  ios: 3,
  android: 21,

  "apple-ii": 41,
  "commodore-amiga": 166,

  "atari-7800": 28,
  "atari-5200": 31,
  "atari-2600": 23,
  "atari-flashback": 22,
  "atari-8-bit": 25,
  "atari-st": 34,
  "atari-lynx": 46,
  "atari-xegs": 50,

  genesis: 167,
  "sega-saturn": 107,
  "sega-cd": 119,
  "sega-32x": 117,
} as const;

import type { Order } from "@/types/rawg";

export const OrderOptions: { name: string; value: Order }[] = [
  { name: "By Name", value: "-name" },
  { name: "New Released", value: "-released" },
  { name: "New Added", value: "-added" },
  // { name: "Created", value: "created" },
  { name: "Updated", value: "-updated" },
  { name: "Top Rating", value: "-rating" },
  // { name: "Metacritic", value: "metacritic" },
];
