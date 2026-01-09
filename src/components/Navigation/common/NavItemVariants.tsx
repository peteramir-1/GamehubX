export type NavItemVariant = "navbar" | "sidebar";

interface NavItemClasses {
  baseClass: string;
  activeClass: string;
  inactiveClass: string;
}

type NavIteNavItemvariantClasses = Record<NavItemVariant, NavItemClasses>;

export const navItemVariantClasses: NavIteNavItemvariantClasses = {
  navbar: {
    baseClass: "text-sm font-bold transition",
    activeClass: "text-zinc-900 dark:text-white",
    inactiveClass:
      "cursor-pointer text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white",
  },
  sidebar: {
    baseClass: "w-full text-left transition",
    activeClass: "text-indigo-500",
    inactiveClass:
      "cursor-pointer text-zinc-700 dark:text-zinc-200 hover:text-indigo-500",
  },
};
