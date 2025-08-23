import { useState } from "react";
import { useNavigate } from "react-router";
import PatientTable from "../../../components/common/PatientTable";
import { Box } from "@mui/material";
import PatientUpdateCreateDialog from "../../../components/common/PatientCreateDialog";
import { PatientModel } from "../../../model/Patient";

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

      <PatientUpdateCreateDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialData={{
          name: createPatient.searchName,
          nic: createPatient.searchNic,
          phone_number: createPatient.searchMobile,
        }}
        patientId={null}
      />
      {editPatient && (
        <PatientUpdateCreateDialog
          open={isUpdateDialogOpen}
          onClose={() => {
            setIsUpdateDialogOpen(false);
            setEditPatient(null);
          }}
          initialData={editPatient}
          patientId={editPatient?.id}
        />
      )}
    </Box>
  );
}
