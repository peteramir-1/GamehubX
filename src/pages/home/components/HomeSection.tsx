// Components
// import Skeleton from "react-loading-skeleton";
import { AnimatePresence } from "motion/react";
import { GameCard, GameCardSkeleton } from "@/components/GameCard";
import SectionHeader from "./SectionHeader";

// Models
import { DEFAULT_PAGE_SIZE } from "@/pages/home/common/home-variables";
import { useContext } from "react";
import { GamesContext } from "../GamesContext";

const HomeSection = () => {
  const { error, loading, games, cardVariant } = useContext(GamesContext);

  if (error) {
    return (
      <article>
        <SectionHeader />
        <section>
          <p className="text-red-500">Failed to load trending games</p>
        </section>
      </article>
    );
  }

  if (loading) {
    return (
      <article>
        <SectionHeader />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, i) => (
            <GameCardSkeleton variant={cardVariant} key={i} />
          ))}
        </div>
      </article>
    );
  }

  return (
    <article>
      <SectionHeader />
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence>
          {games.map((game) => (
            <GameCard
              variant={cardVariant}
              key={`trending-game-${game.id}`}
              game={game}
            />
          ))}
        </AnimatePresence>
      </section>
    </article>
  );
};

export default HomeSection;
