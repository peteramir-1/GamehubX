// Models
import { OrderOptions } from "@/common/rawg-variables";
import { supportedPlatformsList } from "@/common/supported-platforms/supported-platforms.model";

// Types
import { type Platform } from "@/common/supported-platforms/supported-platforms.types";
import type { Order } from "@/types";

type AllGamesHeaderProps = React.HTMLAttributes<HTMLElement> & {
  totalGames?: number;
  selectedPlatform?: Platform;
  selectedSort?: Order;
  onPlatformChange: (platform: Platform) => void;
  onSortChange: (sort: Order) => void;
};

const DiscoverHeader = ({
  totalGames,
  selectedPlatform,
  selectedSort,
  onPlatformChange,
  onSortChange,
}: AllGamesHeaderProps) => {
  return (
    <header className="mb-8">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          🎮 All Games
        </h1>

        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Browse and discover games across all platforms
          {totalGames && (
            <span className="ml-2 text-sm text-zinc-500">
              ({totalGames.toLocaleString()} games)
            </span>
          )}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Platform Filters */}
        <div className="flex gap-2">
          {supportedPlatformsList.map(({ name, id, value }) => {
            const isActive = selectedPlatform === value;

            return (
              <button
                key={`filter-${id}`}
                onClick={() => onPlatformChange(value)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-indigo-500 text-white"
                      : `
                        bg-zinc-100 text-zinc-700 hover:bg-zinc-200
                        dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700
                      `
                  }
                `}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Sort */}
        <div>
          <select
            value={selectedSort || ""}
            onChange={(e) => onSortChange(e.target.value as Order)}
            className="px-3 py-2 text-sm bg-white border rounded-lg border-zinc-300 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700"
          >
            {OrderOptions.map((option, index) => {
              return (
                <option key={`ordering-${index}`} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </header>
  );
};

export default DiscoverHeader;
