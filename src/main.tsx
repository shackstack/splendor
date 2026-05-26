import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";
import { OverlayProvider } from "overlay-kit";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OverlayProvider>
      <App />
    </OverlayProvider>
  </StrictMode>
);
