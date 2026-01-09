// Components
import Button from "@/components/Button/Button";
import { motion } from "motion/react";
import { Info } from "./SupportingComponents";

// Types
import type { RawgGameDetails } from "@/types/rawg/rawg";

type HeroSectionProps = React.HTMLAttributes<HTMLElement> & {
  game: RawgGameDetails;
  isFavorite: boolean;
};

const HeroSection = ({ game, isFavorite }: HeroSectionProps) => {
  const toggleFavorite = () => {
    localStorage.setItem(`favorite-game-${game.id}`, (!isFavorite).toString());
    location.reload();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 gap-10 lg:grid-cols-2"
    >
      <img
        src={game.background_image}
        alt={game.name}
        className="shadow-xl rounded-xl"
      />

      <div>
        <h1 className="text-4xl font-bold">{game.name}</h1>

        <div className="flex flex-wrap gap-2 mt-4">
          {game.platforms.map(({ platform }) => (
            <span
              key={platform.id}
              className="px-3 py-1 text-sm text-indigo-600 bg-indigo-100 rounded-full dark:bg-indigo-900 dark:text-indigo-300"
            >
              {platform.name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          <Info label="Released" value={game.released} />
          <Info label="Rating" value={game.rating.toFixed(1)} />
          <Info label="Metacritic" value={game.metacritic ?? "N/A"} />
          <Info label="Playtime" value={`${game.playtime} hrs`} />
        </div>

        <Button containerClassName="mt-6" size="lg" onClick={toggleFavorite}>
          {isFavorite ? "★ Remove Favorite" : "☆ Add to Favorites"}
        </Button>
      </div>
    </motion.section>
  );
};

export default HeroSection;
