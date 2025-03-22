import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  adminConfirmed,
  colseValidationDialog,
  userConfirmed,
} from "../features/validationDialogSlice";
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

interface UserResponse {
  id: number;
  username: string;
}
interface AdminResponse {
  id: number;
  username: string;
  role: "admin" | "user";
}

export default function VarificationDialog() {
  const { postHandler, postHandlerloading } = useAxiosPost();
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state: RootState) => state.validation_dialog.openDialog
  );
  const userId = useSelector(
    (state: RootState) => state.validation_dialog.userId
  );
  const userName = useSelector(
    (state: RootState) => state.validation_dialog.userName
  );
  const adminName = useSelector(
    (state: RootState) => state.validation_dialog.adminName
  );
  const adminId = useSelector(
    (state: RootState) => state.validation_dialog.adminId
  );
  const validationType = useSelector(
    (state: RootState) => state.validation_dialog.validationType
  );
  const Validationconfirmed = useSelector(
    (state: RootState) => state.validation_dialog.Validationconfirmed
  );
  const handleClose = () => {
    dispatch(colseValidationDialog());
  };
  const { register, handleSubmit, reset } = useForm<UserValidationFormModel>({
    resolver: zodResolver(schemaUserValidation),
    defaultValues: {
      user_code: "",
    },
  });
  console.log(userId);

  const userValidationSubmit = async (data: UserValidationFormModel) => {
    if (validationType === "user") {
      try {
        if (!userId) {
          const responce: { data: UserResponse } = await postHandler(
            "user/check-code/",
            data
          );
          dispatch(
            userConfirmed({
              userName: responce.data.username,
              userId: responce.data.id,
            })
          );

          reset();
        }
      } catch (error) {
        extractErrorMessage(error);
        reset();
      }
    } else if (validationType === "admin") {
      try {
        if (!userId) {
          const responce: { data: UserResponse } = await postHandler(
            "user/check-code/",
            data
          );
          dispatch(
            userConfirmed({
              userName: responce.data.username,
              userId: responce.data.id,
            })
          );

          reset();
        } else if (userId && !adminId) {
          console.log(data);

          const responce: { data: AdminResponse } = await postHandler(
            "admin/check-code/",
            data
          );
          dispatch(
            adminConfirmed({
              adminName: responce.data.username,
              adminId: responce.data.id,
            })
          );
          reset();
        }
      } catch (error) {
        extractErrorMessage(error);
        reset();
      }
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={dialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={handleClose}
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
              minHeight: 100,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {validationType === "user" &&
                !userId &&
                "User Varification Required"}
              {validationType === "admin" &&
                !userId &&
                "User Varification Required"}
              {validationType === "admin" &&
                userId &&
                !adminId &&
                "Admin Varification Required"}
            </Typography>

            {!Validationconfirmed && (
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
                onSubmit={handleSubmit(userValidationSubmit)}
              >
                {validationType === "admin" ? (
                  <>
                    <TextField
                      fullWidth
                      label={
                        !userId && !adminId
                          ? "User Code"
                          : userId && !adminId
                          ? "Admin Code"
                          : ""
                      }
                      type="text"
                      {...register("user_code")}
                    />
                    <TextField fullWidth label="Password" type="password" />
                  </>
                ) : (
                  <>
                    <TextField
                      fullWidth
                      label="User Code"
                      type="text"
                      {...register("user_code")}
                    />
                    <TextField fullWidth label="Password " type="password" />
                  </>
                )}

                <SaveButton btnText="Varify" loading={postHandlerloading} />
              </form>
            )}
            {Validationconfirmed && (
              <>
                <Typography
                  fontWeight={"bold"}
                  textAlign={"center"}
                  variant="h6"
                  gutterBottom
                >
                  {"Varified"}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {userId && `Varified User Name - ${userName} `}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {adminId && `Varified Admin Name - ${adminName}`}
                </Typography>
                <Button
                  onClick={handleClose}
                  fullWidth
                  variant="contained"
                  color="success"
                >
                  Close
                </Button>
              </>
            )}
          </Paper>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
