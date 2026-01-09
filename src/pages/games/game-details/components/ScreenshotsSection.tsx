// Components
import { motion, AnimatePresence } from "framer-motion";
import ScreenshotCarousel from "./ScreenshotCarousel";

// Hooks
import { useState } from "react";

type ScreenshotsSectionProps = React.HTMLAttributes<HTMLElement> & {
  screenshots: string[];
};

const ScreenshotsSection = ({ screenshots }: ScreenshotsSectionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!screenshots.length) return null;

  return (
    <article>
      <header>
        <h2 className="mb-4 text-2xl font-semibold">Screenshots</h2>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {screenshots.map((src, index) => (
            <motion.img
              key={src}
              src={src}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.05 }}
              className="rounded-lg cursor-zoom-in"
            />
          ))}
        </section>
      </header>

      <AnimatePresence>
        {activeIndex !== null && (
          <ScreenshotCarousel
            screenshots={screenshots}
            index={activeIndex}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>
    </article>
  );
};

export default ScreenshotsSection;
