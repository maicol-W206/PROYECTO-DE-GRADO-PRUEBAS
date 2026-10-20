import { BrowserRouter } from "react-router-dom";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./global.css";

const container = document.getElementById("root");

const root = createRoot(container as Element);
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <--- AGREGA ESTO */}
      <App />
    </BrowserRouter> {/* <--- Y CIERRA ESTO */}
  </React.StrictMode>
);

reportWebVitals();