// Components
import { motion } from "motion/react";

// Assets
import heroBg from "@/assets/hero-bg.jpg";

// Models
import { supportedPlatformsList } from "@/common/supported-platforms/supported-platforms.model";

// Types
import type { Platform } from "@/common/supported-platforms/supported-platforms.types";

// Helpers
import clsx from "clsx";
import RippleButton from "@/components/RippleButton/RippleButton";

type HeroSectionProps = {
  selectedPlatform?: Platform;
  onFilterChange: (platform?: Platform) => void;
};

const HeroSection = ({
  selectedPlatform,
  onFilterChange,
}: HeroSectionProps) => {
  return (
    <section className="relative flex items-center justify-center w-full overflow-hidden min-h-[80vh]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-linear-to-b from-black/70 via-black/60 to-black/90"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-4 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Welcome to GameHubX
        </h1>

        <p className="mb-10 text-lg text-gray-200 md:text-xl">
          Discover the latest PC, Xbox, and PlayStation games
        </p>

        {/* Platforms */}
        <div className="flex flex-wrap justify-center gap-6">
          {supportedPlatformsList.map((platform) => {
            const Icon = platform.icon;
            const isSelected = selectedPlatform === platform.value;

            return (
              <RippleButton
                key={platform.name}
                selected={isSelected}
                onClick={() => onFilterChange(platform.value)}
                className={clsx(
                  "flex flex-col items-center gap-2 px-6 py-4 backdrop-blur-md transition-all duration-300 ease-in-out",
                  {
                    "bg-indigo-600/90 text-white shadow-xl": isSelected,
                    "bg-white/90 text-indigo-600 hover:bg-indigo-100 dark:bg-zinc-800 dark:text-indigo-200 dark:hover:bg-indigo-700":
                      !isSelected,
                  }
                )}
              >
                <Icon className="w-8 h-8" />
                <span className="font-medium">{platform.name}</span>
              </RippleButton>
            );
          })}
        </div>

        {/* Clear filter */}
        {selectedPlatform && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10"
          >
            <button
              onClick={() => onFilterChange(undefined)}
              className="px-6 py-3 text-sm font-medium text-white transition border cursor-pointer border-white/30 rounded-xl backdrop-blur-md hover:bg-white/10"
            >
              ✕ Clear Filter
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
