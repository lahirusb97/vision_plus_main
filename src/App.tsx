import { ThemeContextProvider } from "./context/ThemeContext";
import { AuthContext } from "./context/AuthContext";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";

function App() {
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
