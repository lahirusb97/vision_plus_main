import { useState } from "react";
import { useNavigate } from "react-router";
import PatientTable from "../../../components/common/PatientTable";
import { Box } from "@mui/material";
import { PatientModel } from "../../../model/Patient";
import PatientCreateDialog from "../../../components/common/PatientCreateDialog";
import PatientUpdateDialog from "../../../components/common/PatientUpdateDialog";
import PatientSearchOnType from "../../../components/common/PatientSearchOnType";
import useGetPatientList from "../../../hooks/useGetPatientList";
import CustomerPagination from "../../../components/CustomPagination";

export default function NormalOrderIndex() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [createPatient, setCreatePatient] = useState({
    searchName: "",
    searchNic: "",
    searchMobile: "",
  });
  const [editPatient, setEditPatient] = useState<PatientModel | null>(null);
  const {
    PatientList,
    PatientListChangePageSize,
    PatientListError,
    PatientListLimit,
    PatientListLoading,
    PatientListPageNavigation,
    PatientListSearch,
    PatientListTotalCount,
  } = useGetPatientList();
  return (
    <Box>
      <PatientSearchOnType
        onSearch={(data) => {
          PatientListSearch({
            name: data.name,
            nic: data.nic,
            phone_number: data.mobile,
            page: 1,
            page_size: 10, // Add this line
          });
        }}
        createPatientBtnLable="Register Patient & Create Frame Only Order"
        onCreatePatientClick={(data) => {
          setCreatePatient(data);
          setIsDialogOpen(true);
        }}
      />

      <PatientTable
        PatientListError={PatientListError}
        PatientListLoading={PatientListLoading}
        PatientList={PatientList}
        existingPatinetBtnLable="Create Frame Only Order for "
        onRawSelect={(row) => {
          navigate(`/normal-order/${row.id}/order_create`);
        }}
        onEditPatientClick={(row) => {
          setEditPatient(row);
          setIsUpdateDialogOpen(true);
        }}
      />
      <CustomerPagination
        totalCount={PatientListTotalCount}
        handlePageNavigation={PatientListPageNavigation}
        changePageSize={PatientListChangePageSize}
        page_size={PatientListLimit}
      />
      <PatientCreateDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialData={{
          name: createPatient.searchName,
          nic: createPatient.searchNic,
          phone_number: createPatient.searchMobile,
        }}
        onSuccess={(data) => {
          setIsDialogOpen(false);
          navigate(`/normal-order/${data.id}/order_create`);
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
          updateSucess={(data) => {
            setIsUpdateDialogOpen(false);
            setEditPatient(null);
            navigate(`/normal-order/${data.id}/order_create`);
          }}
        />
      )}
    </Box>
  );
}
