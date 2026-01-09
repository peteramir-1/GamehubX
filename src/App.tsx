// application main components
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Sidebar } from "./components/Navigation";
import { Navbar } from "./components/Navigation";
import Head from "./components/Head";

// application pages
import Home from "./pages/home";
import NotFoundPage from "./pages/error";
import { GameDetails } from "./pages/games";
import { Discover } from "./pages/games";

// Hooks
import { useState } from "react";
import Search from "./pages/games/search/Search";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Default head for all pages */}
      <Head title="GameHubX" description="Welcome to GameHubX" />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      {/* Routes */}
      <section className="relative left-0 z-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game">
            <Route path="discover" element={<Discover />} />
            <Route path="search" element={<Search />} />
            <Route path="details/:id" element={<GameDetails />} />
            <Route path="" element={<Navigate to="discover" />} />
          </Route>

          {/* Catch ALL unknown routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </section>

      {/* SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key={"sidebar"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sidebar
              closeOverlay={() => {
                setSidebarOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default App;
