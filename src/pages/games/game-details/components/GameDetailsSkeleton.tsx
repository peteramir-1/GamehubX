const GameDetailsSkeleton = () => {
  return (
    <div className="px-6 py-10 md:px-16 lg:px-32 animate-pulse">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="h-80 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        <div className="space-y-4">
          <div className="w-3/4 h-8 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="w-1/2 h-4 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-10 rounded bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsSkeleton;
