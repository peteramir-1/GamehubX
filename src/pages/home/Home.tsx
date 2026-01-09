// Components
import Head from "@/components/Head";
import HomeSection from "./components/HomeSection";

// Hooks
import { useState } from "react";

// Types
import { type Platform } from "@/common/supported-platforms/supported-platforms.types";
import HeroSection from "./components/HeroSection";
import useGames from "@/hooks/useGames";
import { DEFAULT_PAGE_SIZE } from "./common/home-variables";

// Contexts
import { GamesContext } from "./GamesContext";

const Home = () => {
  const today = new Date();
  const lastYear = new Date(today.getFullYear() - 1, 0, 1);

  const [selectedPlatform, setSelectedPlatform] = useState<
    Platform | undefined
  >(undefined);

  const useFeaturedGames = useGames(
    { page_size: DEFAULT_PAGE_SIZE },
    selectedPlatform
  );

  const useTrendingThisYearsGames = useGames(
    { page_size: DEFAULT_PAGE_SIZE },
    selectedPlatform,
    [lastYear, today],
    "-rating"
  );

  return (
    <>
      <Head title="Home | GameHubX" description="Browse games on GameHubX" />

      <div className="flex flex-wrap items-center min-h-screen bg-white flex-column dark:bg-zinc-900 text-zinc-900 dark:text-white">
        {/* Hero Section */}
        <HeroSection
          selectedPlatform={selectedPlatform}
          onFilterChange={setSelectedPlatform}
        ></HeroSection>

        {/* FeaturedGames Section */}
        <section className="w-full px-10 py-16 md:px-16 lg:px-32">
          <GamesContext.Provider
            value={{
              cardVariant: "featured",
              title: "Featured Games",
              selectedPlatform,
              ...useFeaturedGames,
            }}
          >
            <HomeSection />
          </GamesContext.Provider>
        </section>

        {/* Trending Section */}
        <section className="w-full px-10 py-16 md:px-16 lg:px-32">
          <GamesContext.Provider
            value={{
              title: "🔥 Trending This Year",
              selectedPlatform,
              ...useTrendingThisYearsGames,
            }}
          >
            <HomeSection />
          </GamesContext.Provider>
        </section>
      </div>
    </>
  );
};

export default Home;
