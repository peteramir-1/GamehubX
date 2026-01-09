// Components
import Button from "@/components/Button/Button";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

// Models
import { supportedPlatformsList } from "@/common/supported-platforms/supported-platforms.model";

// Types
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GamesContext } from "../GamesContext";

const SectionHeader = () => {
  const { title, selectedPlatform, loading, moreLinkTo } =
    useContext(GamesContext);

  return (
    <header className="flex flex-row items-center gap-5 mb-8">
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      {supportedPlatformsList.map((platform) => {
        if (platform.value === selectedPlatform) {
          const Icon = platform.icon;
          return (
            <Icon
              className="px-2 py-1 overflow-hidden rounded h-9 w-9 bg-zinc-200 dark:text-white dark:bg-zinc-700"
              key={platform.id}
              title={platform.name}
            />
          );
        }
      })}
      {!loading && (
        <Link to={moreLinkTo || ""}>
          <Button color="neutral">
            More
            <ArrowRightIcon className="w-6 h-5" />
          </Button>
        </Link>
      )}
    </header>
  );
};

export default SectionHeader;
