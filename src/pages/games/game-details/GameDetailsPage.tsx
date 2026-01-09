// Components
import { GameDetailsSkeleton } from "./components";
import { TrailerSection } from "./components";
import { HeroSection } from "./components";
import { ScreenshotsSection } from "./components";
import { NotFound } from "./components";
import { DescriptionSection } from "./components";
// import {SimilarGamesSection} from "./components";
import Button from "@/components/Button";
import Head from "@/components/Head";

// Hooks
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Helpers
import { buildRawgUrl } from "@/common/rawg-helpers";

// Types
import type {
  RawgMovieResponse,
  RawgScreenshotResponse,
  RawgGameDetails,
} from "@/types";

const GameDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<RawgGameDetails | null>(null);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [trailer, setTrailer] = useState<string | null>(null);
  // const [similarGames, setSimilarGames] = useState<RawgGame[]>([]);
  const [loading, setLoading] = useState(true);

  const isFavorite =
    game && localStorage.getItem(`favorite-game-${game.id}`) === "true";

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    Promise.all([
      fetch(buildRawgUrl(`games/${id}`, {})).then((r) => r.json()),
      fetch(buildRawgUrl(`games/${id}/screenshots`, {})).then((r) => r.json()),
      fetch(buildRawgUrl(`games/${id}/movies`, {})).then((r) => r.json()),
      // fetch(buildRawgUrl(`games/${id}/suggested`, {})).then((r) => r.json()),
    ])
      .then(
        ([gameRes, screenshotsRes, moviesRes]: [
          RawgGameDetails,
          RawgScreenshotResponse,
          RawgMovieResponse
          // { results: RawgGame[] }
        ]) => {
          setGame(gameRes);
          setScreenshots(screenshotsRes.results.map((s) => s.image));
          setTrailer(moviesRes.results[0]?.data?.max ?? null);
          // setSimilarGames(similarRes.results.slice(0, 4));
        }
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <GameDetailsSkeleton />;
  if (!game) return <NotFound />;

  return (
    <>
      <Head
        title={`${game.name} | GameHubX`}
        description={game.description_raw || game.description}
      />
      <main className="px-6 py-10 space-y-16 bg-white md:px-16 lg:px-32 text-zinc-900 dark:bg-zinc-900 dark:text-white">
        <Button
          containerClassName="inline-flex! mb-5 w-fit"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>

        <HeroSection game={game} isFavorite={!!isFavorite} />

        {trailer && <TrailerSection trailer={trailer} />}

        <DescriptionSection
          description={game.description || game.description_raw}
          className="prose prose-zinc dark:prose-invert"
        />

        <ScreenshotsSection screenshots={screenshots} />

        {/* <SimilarGamesSection games={similarGames} /> */}
      </main>
    </>
  );
};

export default GameDetailsPage;
