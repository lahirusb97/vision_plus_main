import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router";
import PatientForm from "./PatientForm";
import { PatientFormModel } from "../../validations/schemaPartient";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { useEffect, useState } from "react";
import { extractErrorMessage } from "../../utils/extractErrorMessage";

interface PatientCreateDialogProps {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<PatientFormModel>;
}

export default function PatientCreateDialog({
  open,
  onClose,
  initialData,
}: PatientCreateDialogProps) {
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
      setPatientData({
        name: "",
        date_of_birth: null,
        phone_number: "",
        address: "",
        nic: "",
        patient_note: "",
        extra_phone_number: "",
        ...initialData,
      });
    }
  }, [open]);
  const navigate = useNavigate();
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register New Patient</DialogTitle>
      <DialogContent>
        <PatientForm
          dataOnSubmit={async (data) => {
            try {
              const response = await postHandler("patients/create/", data);
              setPatientData({
                name: "",
                date_of_birth: null,
                phone_number: "",
                address: "",
                nic: "",
                patient_note: "",
                extra_phone_number: "",
              });
              navigate(`/frame-only/${response.data.id}/order_create`);
              onClose();
            } catch (error) {
              extractErrorMessage(error);
            }
          }}
          initialData={patintData}
          isLoading={postHandlerloading}
          isError={postHandlerError}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
