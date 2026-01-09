// Components
import {
  GameCard,
  GameCardSkeleton,
  type GameCardVariant,
} from "@/components/GameCard";

// Types
import type { RawgGame } from "@/types/rawg";

// Models
import { DEFAULT_PAGE_SIZE } from "@/common/global-variables";

type GamesGridProps = React.HTMLAttributes<HTMLDivElement> & {
  games?: RawgGame[];
  loading?: boolean;
  skeletonCount?: number;
  title?: string;
  page: number;
  emptyMessage?: string;
  cardVariant?: GameCardVariant;
};

const GamesGrid: React.FC<GamesGridProps> = ({
  games = [],
  loading = false,
  skeletonCount = DEFAULT_PAGE_SIZE,
  title,
  emptyMessage = "No games found",
  className,
  page,
  cardVariant = "default",
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {title && (
        <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-white">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <GameCardSkeleton variant={cardVariant} key={i} />
          ))}

        {!loading &&
          games.length > 0 &&
          games.map((game) => (
            <GameCard
              variant={cardVariant}
              key={`${page}-${game.id}`}
              game={game}
            />
          ))}

        {!loading && games.length === 0 && (
          <p className="text-center col-span-full text-zinc-500 dark:text-zinc-400">
            {emptyMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default GamesGrid;
