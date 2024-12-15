import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, RouterProvider } from "react-router";
import { router } from "./routes/router.tsx";
import { AuthContext } from "./context/AuthContext.tsx";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
    </ThemeContextProvider>
  </StrictMode>
);
