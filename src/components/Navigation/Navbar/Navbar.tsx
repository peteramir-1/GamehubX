// Components
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import NavItem from "../common/NavItem";
import Button, { ButtonPrefix } from "@/components/Button";

// Hooks
import { useEffect, useState } from "react";

// Models
import { navigationPages } from "@/common/navigation";

type NavbarProps = React.HTMLAttributes<HTMLElement> & {
  onMenuClick: () => void;
};

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { pathname } = useLocation();

  const [isSearchHidden, setIsSearchHidden] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((d) => !d);
  };

  const navigate = useNavigate();

  useEffect(() => {
    setQuery(searchParams.get("q") || "");

    if (pathname.startsWith("/game/search")) {
      setIsSearchHidden(true);
    } else {
      setIsSearchHidden(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSearch = () => {
    if (!query.trim()) navigate("/game/discover");
    else navigate(`/game/search?q=${query}&page=1`);
  };

  return (
    <nav className="bg-white border-b border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="px-10 md:px-16 lg:px-32">
        <div className="grid items-center h-16 grid-cols-3">
          {/* Logo */}
          <div className="flex items-center justify-start gap-2">
            <Link to="/">
              <span className="text-xl font-bold text-zinc-900 dark:text-white">
                GameHub<span className="text-indigo-500">X</span>
              </span>
            </Link>
          </div>

          <div className="flex lg:hidden"></div>
          {/* Platform Links */}
          <div className="items-center hidden gap-6 lg:flex lg:justify-center">
            {navigationPages.map((page) => (
              <NavItem
                key={`nav-${page.path}`}
                variant="navbar"
                to={page.path}
                label={page.title}
                activePathPrefix={page.activePathPrefix}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2">
            {/* Search Input */}

            {/* Search Button */}
            {!isSearchHidden && (
              <Button
                containerClassName="flex flex-row gap-1 items-center"
                size="sm"
                onButtonClick={handleSearch}
              >
                <ButtonPrefix>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search games..."
                    className="w-30 sm:w-48 rounded-l-lg px-3 py-1.5 text-sm bg-zinc-100 text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 h-full"
                  />
                </ButtonPrefix>
                <MagnifyingGlassIcon className="size-4 sm:size-5 text-dark-500" />
              </Button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg cursor-pointer text-zinc-600 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
              aria-label="Toggle theme"
            >
              {!isDarkMode ? "☀️" : "🌙"}
            </button>

            {/* Mobile Menu */}
            <button
              className="cursor-pointer lg:hidden text-zinc-600 dark:text-zinc-300"
              onClick={onMenuClick}
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
