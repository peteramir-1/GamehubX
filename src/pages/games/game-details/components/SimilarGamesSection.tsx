// Components
import { Link } from "react-router-dom";

// Assets
import placeholderImage from "@/assets/placeholder.jpg";

// Types
import type { RawgGame } from "@/types/rawg/rawg";

type SimilarGamesSectionProps = React.HTMLAttributes<HTMLElement> & {
  games: RawgGame[];
};

const SimilarGamesSection = ({ games }: SimilarGamesSectionProps) => {
  if (!games.length) return null;

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">Similar Games</h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {games.map((game) => (
          <Link key={game.id} to={`/games/${game.id}`} className="group">
            <img
              src={game.background_image || placeholderImage}
              className="transition rounded-lg group-hover:scale-105"
            />
            <p className="mt-2 font-medium">{game.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SimilarGamesSection;
