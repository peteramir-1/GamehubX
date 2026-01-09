import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  SkeletonClasses,
  SkeletonHeights,
  type GameCardVariant,
} from "./GameCardVariants";
import clsx from "clsx";

const GameCardSkeleton = ({
  variant = "default",
}: {
  variant?: GameCardVariant;
}) => {
  const isFeatured = variant === "featured";
  return (
    <div
      className={clsx(
        "bg-white dark:bg-zinc-800 overflow-hidden",
        SkeletonClasses[variant],
        {
          "p-4": !isFeatured,
        }
      )}
    >
      <Skeleton
        height={SkeletonHeights[variant]}
        baseColor="#27272a"
        highlightColor="#3f3f46"
      />
      {!isFeatured && (
        <>
          <Skeleton height={20} className="mt-3" />
          <Skeleton height={14} width="50%" />
        </>
      )}
    </div>
  );
};

export default GameCardSkeleton;
