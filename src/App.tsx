import { ThemeContextProvider } from "./context/ThemeContext";
import { AuthContext } from "./context/AuthContext";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { darkTheme } from "./theme/darkTheme";
import { lightTheme } from "./theme/liteTheme";

function App() {
  const savedTheme = localStorage.getItem("theme");
  return (
    <>
      <ThemeContextProvider>
        <AuthContext>
          <RouterProvider router={router} />
        </AuthContext>
      </ThemeContextProvider>
    </>
  );
}

export default App;
