import { APP_PATHS } from "@/routes";

interface Page {
  title: string;
  path: string;
  activePathPrefix?: string;
}

export const navigationPages: Page[] = [
  { title: "Home", path: APP_PATHS.home },
  { title: "Games", path: APP_PATHS.game_discover, activePathPrefix: "/game" },
];
