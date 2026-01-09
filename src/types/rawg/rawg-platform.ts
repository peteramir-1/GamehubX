export type PlatformSlug =
  | "pc"
  | "playstation"
  | "playstation-4"
  | "playstation-5"
  | "playstation-3"
  | "xbox"
  | "xbox-one"
  | "xbox-series-x"
  | "nintendo-switch"
  | "ios"
  | "android"
  | "linux"
  | "mac";

// Parent platforms (e.g., PC, PlayStation, Xbox)
export interface RawgParentPlatform {
  platform: RawgPlatform;
}

// Platform info including platform object
export interface RawgPlatformInfo {
  platform: RawgPlatform;
  released_at: string | null;
  requirements: {
    minimum?: string;
    recommended?: string;
  };
}

// Platform details with strongly typed slug
export interface RawgPlatform {
  id: number;
  name: string;
  slug: PlatformSlug; // <-- updated to strongly typed union
}
