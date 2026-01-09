// Components
import { Link } from "react-router-dom";
import GameCardImage from "./GameCardImage";
import { StarIcon } from "@heroicons/react/16/solid";
import { FcLike } from "react-icons/fc";

// Helpers
import clsx from "clsx";

// Types
import type { RawgGame } from "@/types";
import {
  type GameCardVariant,
  variantClasses,
  imageHeights,
} from "./GameCardVariants";

// Models
import { APP_PATHS } from "@/routes";

type GameCardProps = {
  game: RawgGame;
  variant?: GameCardVariant;
};

const GameCard = ({ game, variant = "default" }: GameCardProps) => {
  const isFeatured = variant === "featured";

  return (
    <Link
      to={`${APP_PATHS.game_details}${game.id}`}
      className={clsx(
        "group relative block overflow-hidden transition-transform hover:-translate-y-1",
        variantClasses[variant],
        { "h-105": isFeatured }
      )}
    >
      {/* Game Image */}
      <GameCardImage
        src={game.background_image}
        alt={game.name}
        heightClass={imageHeights[variant]}
      />

      {/* Hover Overlay */}
      {isFeatured && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Base gradient overlay (always visible, semi-transparent) */}
          <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-t from-black via-transparent to-transparent dark:from-black/50 dark:via-transparent" />

          {/* Hover dark overlay */}
          <div className="absolute inset-0 transition-all duration-300 bg-black/0 group-hover:bg-black/30 dark:group-hover:bg-black/40" />

          {/* Hover shine effect */}
          <div className="absolute top-0 left-0 w-1/2 h-full transition-all duration-700 transform -translate-x-full opacity-0 bg-white/5 dark:bg-white/10 group-hover:opacity-40 group-hover:translate-x-full" />
        </div>
      )}

      {/* Content */}
      <div
        className={clsx(
          "absolute bottom-0 w-full p-4 z-20",
          isFeatured ? "text-white" : "text-zinc-900 dark:text-white"
        )}
      >
        {isFeatured && (
          <article>
            <h3 className="mb-2 text-lg font-bold line-clamp-1">{game.name}</h3>
            <section
              className={clsx(
                "flex flex-row flex-nowrap gap-6 text-sm font-medium drop-shadow-md",
                {
                  "text-gray-200 dark:text-gray-300": isFeatured,
                  "text-zinc-600 dark:text-zinc-400": !isFeatured,
                }
              )}
            >
              <section
                title="Review counts"
                className="flex flex-row items-center justify-start gap-2 "
              >
                <FcLike className="w-5 h-5 text-blue-500 flex-nowrap" />
                <p className="font-semibold text-zinc-200">{`${game.suggestions_count}`}</p>
              </section>
              <section
                title="Review counts"
                className="flex flex-row items-center justify-start gap-2"
              >
                <StarIcon className="w-5 h-5 text-yellow-300" />
                <p className="text-zinc-200">{game.reviews_text_count}</p>
              </section>
            </section>
          </article>
        )}
      </div>

      {variant === "default" && (
        <article className="p-4">
          <h3 className="font-semibold line-clamp-1 dark:text-white">
            {game.name}
          </h3>
          <section
            className={clsx(
              "flex flex-row flex-nowrap gap-6 mt-1 text-sm font-medium drop-shadow-md",
              isFeatured
                ? "text-gray-200 dark:text-gray-300"
                : "text-zinc-600 dark:text-zinc-400"
            )}
          >
            <section
              title="Review counts"
              className="flex flex-row items-center justify-start gap-2 "
            >
              <FcLike className="w-5 h-5 text-blue-500 flex-nowrap" />
              <p>{`${game.suggestions_count}`}</p>
            </section>
            <section
              title="Review counts"
              className="flex flex-row items-center justify-start gap-2"
            >
              <StarIcon className="w-5 h-5 text-yellow-300" />
              <p>{game.reviews_text_count}</p>
            </section>
          </section>
        </article>
      )}
    </Link>
  );
};

export default GameCard;
