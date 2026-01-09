// Components
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/16/solid";
import { motion } from "motion/react";

// Hooks
import { useEffect, useState } from "react";

type ScreenshotCarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  screenshots: string[];
  index: number;
  onClose: () => void;
};

const ScreenshotCarousel = ({
  screenshots,
  index,
  onClose,
}: ScreenshotCarouselProps) => {
  const [current, setCurrent] = useState(index);
  const [loaded, setLoaded] = useState(false);

  const prev = () =>
    setCurrent((c) => (c - 1 + screenshots.length) % screenshots.length);
  const next = () => setCurrent((c) => (c + 1) % screenshots.length);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute text-3xl text-white top-6 right-6"
      >
        ✕
      </button>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous screenshot"
        className="absolute p-3 text-white left-6 z-60"
      >
        <ArrowLeftCircleIcon className="w-8 h-8" />
      </button>

      {/* Image */}
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white rounded-full animate-spin border-t-transparent" />
          </div>
        )}

        <motion.img
          key={current}
          src={screenshots[current]}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > 100) prev();
            if (info.offset.x < -100) next();
          }}
          onLoad={() => setLoaded(true)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`max-h-[85vh] max-w-[90vw] rounded-xl cursor-grab active:cursor-grabbing ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next screenshot"
        className="absolute p-3 text-white cursor-pointer right-6 z-60"
      >
        <ArrowRightCircleIcon className="w-8 h-8" />
      </button>

      {/* Indicator */}
      <div className="absolute px-3 py-1 text-sm font-medium text-white rounded-md select-none bottom-6 bg-black/50">
        {current + 1} / {screenshots.length}
      </div>
    </motion.div>
  );
};

export default ScreenshotCarousel;
