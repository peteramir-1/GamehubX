type APP_PAGES = "home" | "game_details" | "game_discover" | "error";

export const APP_PATHS: Record<APP_PAGES, string> = {
  home: "/",
  game_details: "/game/details/",
  game_discover: "/game/discover",
  error: "/404",
};
