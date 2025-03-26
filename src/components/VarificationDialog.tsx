import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import {
  schemaUserValidation,
  UserValidationFormModel,
} from "../validations/schemaUserValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import SaveButton from "./SaveButton";
import { useAxiosPost } from "../hooks/useAxiosPost";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { Close } from "@mui/icons-material";
import { ValidationStateModel } from "../hooks/validations/useValidationState";

interface ConfimationState {
  userID: number | null;
  adminID: number | null;
  userName: string | null;
  adminName: string | null;
}
interface DialogProps {
  validationState: ValidationStateModel;
  resetValidation: () => void;
}

export default function VarificationDialog({
  validationState,
  resetValidation,
}: DialogProps) {
  const [confimationState, setConfimationState] =
    React.useState<ConfimationState>({
      userID: null,
      adminID: null,
      userName: null,
      adminName: null,
    });
  const handleClose = () => {
    setConfimationState({
      userID: null,
      adminID: null,
      userName: null,
      adminName: null,
    });
    resetValidation();
  };

  const handleSubmite = async () => {
    try {
      if (validationState.apiCallFunction) {
        await validationState.apiCallFunction();
      }
      resetValidation();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={validationState.openValidationDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // onClose={handleClose}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          id="alert-dialog-title"
        >
          <Typography variant="h6" gutterBottom>
            {"Employee Varification"}
          </Typography>
          <IconButton onClick={handleClose} size="large" color="error">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Paper
            sx={{
              p: 2,
              width: 400,
            }}
          >
            <Box>
              {(validationState.validationType === "user" ||
                validationState.validationType === "both") &&
                !confimationState.userID && (
                  <UserForm
                    onValidationSuccess={(userID, userName) =>
                      setConfimationState((prev) => ({
                        ...prev,
                        userID,
                        userName,
                      }))
                    }
                  />
                )}
              {validationState.validationType === "both" &&
                confimationState.userID &&
                !confimationState.adminID && (
                  <AdminForm
                    onValidationSuccess={(adminID, adminName) =>
                      setConfimationState((prev) => ({
                        ...prev,
                        adminID,
                        adminName,
                      }))
                    }
                  />
                )}
              {validationState.validationType === "admin" &&
                !confimationState.adminID && (
                  <AdminForm
                    onValidationSuccess={(adminID, adminName) =>
                      setConfimationState((prev) => ({
                        ...prev,
                        adminID,
                        adminName,
                      }))
                    }
                  />
                )}
              {validationState.validationType === "both" &&
                confimationState.userID &&
                confimationState.adminID && (
                  <>
                    <Typography sx={{ mb: 2 }} variant="body1">
                      Varified User Name: {confimationState.userName}
                    </Typography>
                    <Typography sx={{ mb: 2 }} variant="body1">
                      Varified Admin Name: {confimationState.adminName}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleSubmite}
                    >
                      Save
                    </Button>
                  </>
                )}

              {validationState.validationType === "user" &&
                confimationState.userID && (
                  <>
                    <Typography sx={{ mb: 2 }} variant="body1">
                      Varified User Name: {confimationState.userName}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleSubmite}
                    >
                      Save
                    </Button>
                  </>
                )}
              {validationState.validationType === "admin" &&
                confimationState.adminID && (
                  <>
                    <Typography sx={{ mb: 2 }} variant="body1">
                      Varified Admin Name: {confimationState.adminName}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleSubmite}
                    >
                      Save
                    </Button>
                  </>
                )}
            </Box>
          </Paper>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

function AdminForm({
  onValidationSuccess,
}: {
  onValidationSuccess: (adminID: number, adminName: string) => void;
}) {
  const { postHandler, postHandlerloading } = useAxiosPost();

  const { register, handleSubmit, reset } = useForm<UserValidationFormModel>({
    resolver: zodResolver(schemaUserValidation),
    defaultValues: {
      user_code: "",
    },
  });
  const userValidationSubmit = async (data: UserValidationFormModel) => {
    try {
      const response: { data: AdminResponse } = await postHandler(
        "admin/check-code/",
        data
      );
      onValidationSuccess(response.data.id, response.data.username);

      reset();
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        onSubmit={handleSubmit(userValidationSubmit)}
      >
        <>
          <Typography variant="h6">Admin Varification Required</Typography>
          <TextField
            fullWidth
            label="Admin Code"
            type="text"
            {...register("user_code")}
          />
          <TextField fullWidth label="Password " type="password" />
        </>

        <SaveButton btnText="Varify" loading={postHandlerloading} />
      </form>
    </div>
  );
}

//! USER FORM
function UserForm({
  onValidationSuccess,
}: {
  onValidationSuccess: (userID: number, userName: string) => void;
}) {
  const { postHandler, postHandlerloading } = useAxiosPost();

  const { register, handleSubmit, reset } = useForm<UserValidationFormModel>({
    resolver: zodResolver(schemaUserValidation),
    defaultValues: {
      user_code: "",
    },
  });
  const userValidationSubmit = async (data: UserValidationFormModel) => {
    try {
      const response: { data: UserResponse } = await postHandler(
        "user/check-code/",
        data
      );

      onValidationSuccess(response.data.id, response.data.username);
      reset();
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        onSubmit={handleSubmit(userValidationSubmit)}
      >
        <>
          <Typography variant="h6">User Varification Required</Typography>

          <TextField
            fullWidth
            label="User Code"
            type="text"
            {...register("user_code")}
          />
          <TextField fullWidth label="Password " type="password" />
        </>

        <SaveButton btnText="Varify" loading={postHandlerloading} />
      </form>
    </div>
  );
}
interface UserResponse {
  id: number;
  username: string;
}
interface AdminResponse {
  id: number;
  username: string;
  role: "admin" | "user";
}
