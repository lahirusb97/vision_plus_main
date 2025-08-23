import { useState } from "react";
import { useNavigate } from "react-router";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import toast from "react-hot-toast";
import { getUserCurentBranch } from "../../utils/authDataConver";
import ConfirmDialog from "../../components/ConfirmDialog";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import RefractionNumberDialog from "./RefractionNumberDialog";
import { RefractionNumberModel } from "../../model/RefractionModel";
import PatientTable from "../../components/common/PatientTable";
import { Box } from "@mui/material";

export default function ExistingCustomerRefractionNumber() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createPatient, setCreatePatient] = useState({
    searchName: "",
    searchNic: "",
    searchMobile: "",
  });

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<{
    name: string;
    nic: string | null;
    mobile: string | null;
    patient_id: number;
  } | null>(null);
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const generateRefractionNumber = async () => {
    if (!selectedPatient || !selectedPatient.patient_id) {
      toast.error("Patient ID is missing");
      return;
    }
    const payload = {
      customer_full_name: selectedPatient.name,
      customer_mobile: selectedPatient?.mobile,
      nic: selectedPatient?.nic,
      patient_id: selectedPatient.patient_id,
      branch_id: getUserCurentBranch()?.id,
    };
    try {
      const responseData: { data: { data: RefractionNumberModel } } =
        await postHandler("refractions/create/", payload);
      navigate(`${responseData.data.data.id}/success/`);
      toast.success("Refraction Number Generated Successfully");
    } catch (error) {
      extractErrorMessage(error);
    } finally {
      setConfirmDialogOpen(false);
      setSelectedPatient(null);
    }
  };

  const handleGenerateRefraction = (patient: {
    name: string;
    nic: string | null;
    mobile: string | null;
    patient_id: number;
  }) => {
    setSelectedPatient(patient);
    setConfirmDialogOpen(true);
  };

  const handleConfirmGenerate = async () => {
    if (!selectedPatient) return;

    try {
      await generateRefractionNumber();
      setConfirmDialogOpen(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error("Error generating refraction number:", error);
    }
  };

  return (
    <Box>
      <PatientTable
        createPatientBtnLable="Create New Patient"
        existingPatinetBtnLable="Select Patient"
        onCreatePatientClick={(data) => {
          setCreatePatient(data);
          setIsDialogOpen(true);
        }}
        onRawSelect={(row) => {
          handleGenerateRefraction({
            name: row.name,
            nic: row.nic,
            mobile: row.phone_number,
            patient_id: row.id,
          });
        }}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        closeDialog={() => setConfirmDialogOpen(false)}
        apiCall={handleConfirmGenerate}
        onSuccess={() => {
          // Refresh or update the UI as needed
        }}
        message={`Are you sure you want to generate refraction number for ${selectedPatient?.name}?`}
      />
      <RefractionNumberDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        name={createPatient.searchName}
        nic={createPatient.searchNic}
        mobile={createPatient.searchMobile}
      />
    </Box>
  );
}
