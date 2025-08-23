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

interface PatientUpdateDialogProps {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<PatientFormModel>;
  patientId: number | null;
}

export default function PatientUpdateDialog({
  open,
  onClose,
  initialData,
  patientId,
}: PatientUpdateDialogProps) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Patient</DialogTitle>

      <DialogContent>
        <PatientForm
          dataOnSubmit={(data) => {
            navigate(`/frame-only/${data.id}/order_create`);
          }}
          patientId={patientId}
          initialData={initialData}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancel
        </Button>
        {/* <SubmitCustomBtn
          btnText="Generate Refraction Number"
          loading={postHandlerloading}
          isError={postHandlerError}
        /> */}
      </DialogActions>
    </Dialog>
  );
}
