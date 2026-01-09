import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// application css files
import "./main.css";
import "react-loading-skeleton/dist/skeleton.css";

import App from "./App.tsx";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
