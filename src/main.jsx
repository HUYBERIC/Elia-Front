import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/main.scss";
import App from "./App.jsx";

const clientId =
  "522967352271-54aub3k94o9kg41e45icivraj3oiqv7n.apps.googleusercontent.com"; // Your actual Client ID

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
      <BrowserRouter>
        <App />
      </BrowserRouter>
    
  </StrictMode>
);
