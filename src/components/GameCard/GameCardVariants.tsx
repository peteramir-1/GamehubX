export type GameCardVariant = "default" | "compact" | "featured";

export const variantClasses: Record<GameCardVariant, string> = {
  default: "bg-white dark:bg-zinc-800 rounded-xl shadow hover:shadow-lg",
  compact: "bg-zinc-50 dark:bg-zinc-900 rounded-lg",
  featured: "bg-gradient-to-t from-black/80 to-transparent rounded-2xl",
};

export const imageHeights: Record<GameCardVariant, string> = {
  default: "h-80",
  compact: "h-28",
  featured: "h-full",
};

export const SkeletonHeights: Record<GameCardVariant, number> = {
  default: 320,
  compact: 112,
  featured: 420,
};

export const SkeletonClasses: Record<GameCardVariant, string> = {
  default: "rounded-xl shadow-lg",
  compact: "rounded-lg shadow-lg",
  featured: "rounded-2xl shadow-md",
};
