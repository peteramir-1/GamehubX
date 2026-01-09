import type { IconType } from "react-icons";

export type Platform = "pc" | "xbox-one" | "nintendo-switch" | "playstation-4";

export interface SupportedPlatform {
  name: string;
  value: Platform;
  icon:
    | React.ForwardRefExoticComponent<
        Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
          title?: string;
          titleId?: string;
        } & React.RefAttributes<SVGSVGElement>
      >
    | IconType;
  id: number;
}
