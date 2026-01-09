// Components
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { APP_PATHS } from "@/routes";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-zinc-50 dark:bg-zinc-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md text-center"
      >
        {/* 404 */}
        <h1 className="mb-4 font-extrabold text-indigo-500 text-7xl">404</h1>

        {/* Message */}
        <h2 className="mb-2 text-2xl font-semibold text-zinc-900 dark:text-white">
          Game Not Found
        </h2>

        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          Looks like you’ve wandered into an unexplored area. The page you’re
          looking for doesn’t exist.
        </p>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to={APP_PATHS.home}
            className="
              rounded-lg px-6 py-2.5 font-medium
              bg-indigo-500 text-white hover:bg-indigo-600
              transition
            "
          >
            🎮 Back to Home
          </Link>

          <Link
            to={APP_PATHS.game_discover}
            className="
              rounded-lg px-6 py-2.5 font-medium
              border border-zinc-300 text-zinc-700 hover:bg-zinc-100
              dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800
              transition
            "
          >
            Browse Games
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
