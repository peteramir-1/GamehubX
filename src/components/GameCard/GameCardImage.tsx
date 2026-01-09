import { useState } from "react";
import placeholderImage from "@/assets/placeholder.jpg";

type GameCardImageProps = {
  src?: string | null;
  alt: string;
  heightClass: string;
};

const GameCardImage = ({ src, alt, heightClass }: GameCardImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-zinc-200 dark:bg-zinc-700" />
      )}

      <img
        src={src || placeholderImage}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`object-cover w-full h-full transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {!loaded && (
        <div className="absolute bottom-0 w-full h-1 overflow-hidden bg-gray-200 dark:bg-zinc-700">
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 animate-loading"></div>
        </div>
      )}
    </div>
  );
};

export default GameCardImage;
