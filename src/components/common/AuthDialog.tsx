import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { useAxiosPost } from "../../hooks/useAxiosPost";

type OperationType = "admin" | "user";

interface VerificationDialogProps {
  open: boolean;
  operationType: OperationType;
  onVerified: (result: DialogAuthData) => Promise<void>;
  onClose: () => void;
}
export interface DialogAuthData {
  admin_id: number | null;
  user_id: number | null;
}
interface UserData {
  id: number;
  username: string;
  role: "admin" | "user";
}

const codeSchema = z.object({
  user_code: z.string().min(1, "Code is required"),
  password: z.string().min(1, "Password is required"),
});
type CodeFormData = z.infer<typeof codeSchema>;

const AuthDialog: React.FC<VerificationDialogProps> = ({
  open,
  operationType,
  onVerified,
  onClose,
}) => {
  const [step, setStep] = useState<"input" | "admin">("input");
  const [firstUser, setFirstUser] = useState<UserData | null>(null);

  const { postHandler } = useAxiosPost();
  const mainForm = useForm<CodeFormData>({ resolver: zodResolver(codeSchema) });
  const {
    formState: { isSubmitting },
  } = mainForm;

  // Unified verification function
  const verifyHandler = async (data: CodeFormData) => {
    try {
      const res = await postHandler("admin-and-user/check-code/", data);
      const userData: UserData = res.data;

      if (operationType === "user") {
        // Step 1, user or admin OK
        if (userData.role === "admin") {
          await doSave({ admin_id: userData.id, user_id: null });
        } else {
          await doSave({ admin_id: null, user_id: userData.id });
        }
      } else {
        // operationType === "admin"
        if (step === "input") {
          if (userData.role === "admin") {
            await doSave({ admin_id: userData.id, user_id: null });
          } else {
            setFirstUser(userData);
            setStep("admin");
            mainForm.reset();
          }
        } else if (step === "admin") {
          if (userData.role !== "admin") {
            toast.error("Only admins can confirm this action");
            return;
          }
          // Save both user_id and admin_id
          await doSave({
            admin_id: userData.id,
            user_id: firstUser?.id ?? null,
          });
        }
      }
    } catch (err) {
      extractErrorMessage(err);
    }
  };

  const doSave = async (result: {
    admin_id: number | null;
    user_id: number | null;
  }) => {
    await onVerified(result);
    handleClose();
  };

  const handleClose = () => {
    setStep("input");
    setFirstUser(null);
    mainForm.reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {operationType === "admin"
              ? "Admin Authorization Required"
              : "User or Admin Authorization"}
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box p={2}>
          <form onSubmit={mainForm.handleSubmit(verifyHandler)}>
            <Typography mb={2}>
              {step === "admin"
                ? "Admin credentials required. Please enter an admin's code and password."
                : operationType === "admin"
                ? "Enter your code and password. If you are not an admin, an admin must confirm next."
                : "Enter user or admin code and password."}
            </Typography>
            <TextField
              label={step === "admin" ? "Admin Code" : "Code"}
              fullWidth
              margin="normal"
              {...mainForm.register("user_code")}
              autoFocus
              error={!!mainForm.formState.errors.user_code}
              helperText={mainForm.formState.errors.user_code?.message}
            />
            <TextField
              label={step === "admin" ? "Admin Password" : "Password"}
              type="password"
              fullWidth
              margin="normal"
              {...mainForm.register("password")}
              error={!!mainForm.formState.errors.password}
              helperText={mainForm.formState.errors.password?.message}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isSubmitting}
            >
              {step === "admin" ? "Confirm by Admin" : "Authorize"}
            </Button>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
