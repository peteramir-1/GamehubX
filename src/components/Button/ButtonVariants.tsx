export type Sizes = "md" | "sm" | "lg";
export type Colors = "primary" | "neutral";

export const BaseClass = `flex flex-row flex-nowrap items-center shadow gap-2 cursor-pointer hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2`;

export const buttonSizesClasses: Record<Sizes, string> = {
  lg: "px-4 py-1.5 text-md font-large",
  md: "px-3 py-1.5 text-sm font-medium",
  sm: "px-2 py-1.5 text-xs font-normal",
};

export const buttonColorClasses: Record<Colors, string> = {
  primary: "bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-500",
  neutral:
    "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 focus:bg-zinc-200",
};

export const prefixClasses = "rounded-r-md!";
export const suffixClasses = "rounded-l-md!";
