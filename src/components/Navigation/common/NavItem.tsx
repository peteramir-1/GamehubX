// Components
import { NavLink, useLocation } from "react-router-dom";

// Models
import { navItemVariantClasses } from "./NavItemVariants";

// Types
import type { NavItemVariant } from "./NavItemVariants";

// Helpers
import clsx from "clsx";

type NavbarItemProps = {
  label: string;
  to: string;
  variant: NavItemVariant;
  activePathPrefix?: string;
};

const NavItem = ({ label, variant, to, activePathPrefix }: NavbarItemProps) => {
  const Location = useLocation();

  const isActive = !!activePathPrefix
    ? Location.pathname.startsWith(String(activePathPrefix))
    : Location.pathname === to;

  return (
    <NavLink to={to}>
      <button
        type="button"
        aria-describedby="navigation"
        className={clsx([navItemVariantClasses[variant].baseClass], {
          [navItemVariantClasses[variant].activeClass]: isActive,
          [navItemVariantClasses[variant].inactiveClass]: !isActive,
        })}
      >
        {label}
      </button>
    </NavLink>
  );
};

export default NavItem;
