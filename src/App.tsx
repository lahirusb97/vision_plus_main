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
import { MutationDialogProvider } from "./context/MutationDialogContext";
import MutationDialog from "./components/common/MutationDialog";
import { ReminderDialogProvider } from "./context/ReminderDialogContext";
import ReminderDialog from "./components/common/ReminderDialog";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthContext>
          <ReminderDialogProvider>
            <MutationDialogProvider>
              <DeleteDialogProvider>
                <RouterProvider router={router} />
                {/* <ThemeSwitch /> */}
                <Toaster position="bottom-center" gutter={8} />
                <DeleteDialog />
                <ReminderDialog />
              </DeleteDialogProvider>
              <MutationDialog />
            </MutationDialogProvider>
          </ReminderDialogProvider>
          <DrawerStock />
        </AuthContext>
      </ThemeProvider>
    </>
  );
}

export default App;
