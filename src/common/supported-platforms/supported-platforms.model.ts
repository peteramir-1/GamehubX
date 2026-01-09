// Components
import { FaGamepad } from "react-icons/fa6";
import { BsNintendoSwitch } from "react-icons/bs";
import { ComputerDesktopIcon, CubeIcon } from "@heroicons/react/24/solid";

// Types
import type { SupportedPlatform } from "./supported-platforms.types";

export const supportedPlatformsList: SupportedPlatform[] = [
  { name: "Pc", value: "pc", icon: ComputerDesktopIcon, id: 4 },
  { name: "Xbox One", value: "xbox-one", icon: CubeIcon, id: 1 },
  {
    name: "Playstation 4",
    value: "playstation-4",
    icon: FaGamepad,
    id: 18,
  },
  {
    name: "Nintendo Switch",
    value: "nintendo-switch",
    icon: BsNintendoSwitch,
    id: 7,
  },
];
