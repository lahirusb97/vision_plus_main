import { useState } from "react";
import { useNavigate } from "react-router";
import PatientTable from "../../../components/common/PatientTable";
import { Box } from "@mui/material";
import { PatientModel } from "../../../model/Patient";
import PatientCreateDialog from "../../../components/common/PatientCreateDialog";
import PatientUpdateDialog from "../../../components/common/PatientUpdateDialog";

export default function FrameOnlyOrderIndex() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [createPatient, setCreatePatient] = useState({
    searchName: "",
    searchNic: "",
    searchMobile: "",
  });
  const [editPatient, setEditPatient] = useState<PatientModel | null>(null);

  return (
    <Box>
      <PatientTable
        createPatientBtnLable="Register Patient & Create Frame Only Order"
        existingPatinetBtnLable="Create Frame Only Order for "
        onCreatePatientClick={(data) => {
          setCreatePatient(data);
          setIsDialogOpen(true);
        }}
        onRawSelect={(row) => {
          navigate(`/frame-only/${row.id}/order_create`);
        }}
        onEditPatientClick={(row) => {
          setEditPatient(row);
          setIsUpdateDialogOpen(true);
        }}
      />

      <PatientCreateDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialData={{
          name: createPatient.searchName,
          nic: createPatient.searchNic,
          phone_number: createPatient.searchMobile,
        }}
      />
      {editPatient && (
        <PatientUpdateDialog
          open={isUpdateDialogOpen}
          onClose={() => {
            setIsUpdateDialogOpen(false);
            setEditPatient(null);
          }}
          initialData={editPatient}
          updateSucess={() => {
            setIsUpdateDialogOpen(false);
            setEditPatient(null);
            
          }}
        />
      )}
    </Box>
  );
}
