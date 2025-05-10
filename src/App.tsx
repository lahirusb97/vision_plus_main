import { AuthContext } from "./context/AuthContext";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
// import ThemeSwitch from "./theme/ThemeSwitch";
import { Toaster } from "react-hot-toast";
import { DeleteDialogProvider } from "./context/DeleteDialogContext";
import DeleteDialog from "./components/DeleteDialog";
import DrawerStock from "./components/inputui/DrawerStock";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthContext>
          <DeleteDialogProvider>
            <RouterProvider router={router} />
            {/* <ThemeSwitch /> */}
            <Toaster position="bottom-center" gutter={8} />
            <DeleteDialog />
          </DeleteDialogProvider>
          <DrawerStock />
        </AuthContext>
      </ThemeProvider>
    </>
  );
}

export default App;
