import { AuthContext } from "./context/AuthContext";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
// import ThemeSwitch from "./theme/ThemeSwitch";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthContext>
          <RouterProvider router={router} />
          {/* <ThemeSwitch /> */}

          <Toaster position="bottom-center" gutter={8}/>
        </AuthContext>
      </ThemeProvider>
    </>
  );
}

export default App;
