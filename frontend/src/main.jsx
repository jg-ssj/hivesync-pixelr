// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Cambia de "./App.jsx" a "./App" (sin extensión o .tsx)
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
