import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import PatientForm from "./PatientForm";
import { PatientFormModel } from "../../validations/schemaPartient";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { useEffect, useState } from "react";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { useAxiosPatch } from "../../hooks/useAxiosPatch";
import { PatientModel } from "../../model/Patient";
interface UserData {
  id: number;
  username: string;
  role: "admin" | "user";
}
interface PatientCreateDialogProps {
  open: boolean;
  onClose: () => void;
  initialData: PatientModel | null;
  updateSucess: () => void;
}

export default function PatientUpdateDialog({
  open,
  onClose,
  initialData,
  updateSucess,
}: PatientCreateDialogProps) {
  const [userAuth, setUserAuth] = useState({
    user_code: "",
    password: "",
  });
  const [isSubmited, setIsSubmited] = useState(false);
  const [patintData, setPatientData] = useState<PatientFormModel>({
    name: "",
    date_of_birth: null,
    phone_number: "",
    address: "",
    nic: "",
    patient_note: "",
    extra_phone_number: "",
  });
  useEffect(() => {
    if (open) {
      if (!initialData) return;
      setPatientData({
        name: initialData.name,
        date_of_birth: initialData.date_of_birth,
        phone_number: initialData.phone_number,
        address: initialData.address,
        nic: initialData.nic,
        patient_note: initialData.patient_note,
        extra_phone_number: initialData.extra_phone_number,
      });
    }
  }, [open]);
  const navigate = useNavigate();
  const { patchHandler, patchHandlerloading, patchHandlerError } =
    useAxiosPatch();
  const { postHandler } = useAxiosPost();
  const verifyHandler = async () => {
    try {
      if (!initialData) return;
      const res = await postHandler("admin-and-user/check-code/", userAuth);
      const userData: UserData = res.data;

      if (userData.id) {
        const response = await patchHandler(
          `patients/${initialData.id}/`,
          patintData
        );
        navigate(`/frame-only/${response.data.id}/order_create`);
        setIsSubmited(false);
        setUserAuth({
          user_code: "",
          password: "",
        });

        updateSucess();
        onClose();
      }
    } catch (err) {
      extractErrorMessage(err);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setIsSubmited(false);
        setUserAuth({
          user_code: "",
          password: "",
        });
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Update Patient</DialogTitle>
      <DialogContent>
        {!isSubmited ? (
          <PatientForm
            dataOnSubmit={async (data) => {
              try {
                setPatientData(data);
                setIsSubmited(true);
                // navigate(`/frame-only/${response.data.id}/order_create`);
              } catch (error) {
                extractErrorMessage(error);
              }
            }}
            initialData={patintData}
            isLoading={patchHandlerloading}
            isError={patchHandlerError}
          />
        ) : (
          <Box>
            <Typography variant="h6">Verify Before Proceeding</Typography>
            <Typography variant="body2">
              You are responsible for modifying
              <span
                style={{ fontWeight: "bold", color: "red", marginRight: 5 }}
              >
                {" "}
                {initialData?.name} patient
              </span>
              records. Please enter your user code and password to confirm.
            </Typography>
            <TextField
              label="User Code"
              fullWidth
              margin="normal"
              autoFocus
              value={userAuth.user_code}
              onChange={(e) =>
                setUserAuth({ ...userAuth, user_code: e.target.value })
              }
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={userAuth.password}
              onChange={(e) =>
                setUserAuth({ ...userAuth, password: e.target.value })
              }
            />
            <Button fullWidth onClick={verifyHandler} variant="contained">
              Verify
            </Button>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
