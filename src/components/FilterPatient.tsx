import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import axiosClient from "../axiosClient";
import { PatientModel } from "../model/Patient";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import DateInput from "./inputui/DateInput";
import dayjs from "dayjs";
import { grey } from "@mui/material/colors";
import useGetPatientList from "../hooks/useGetPatientList";
import CustomerPagination from "./CustomPagination";
export default function FilterPatient({
  open,
  searchType,
  handleClose,
}: {
  open: boolean;
  searchType: string;
  handleClose: () => void;
}) {
  const {
    PatientListLimit,
    PatientList,
    PatientListLoading,
    PatientListError,
    PatientListTotalCount,
    PatientListPageNavigation,
    PatientListSearch,
    PatientListChangePageSize,
  } = useGetPatientList();

  const { setValue, watch } = useFormContext();
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedPatient, setEditedPatient] = useState<Partial<PatientModel>>({});

  useEffect(() => {
    if (open) {
      if (searchType === "phone_number") {
        PatientListSearch({
          page_size: 10,
          page: 1,
          nic: null,
          search: null,
          phone_number: watch("phone_number"),
        });
      } else if (searchType === "name") {
        PatientListSearch({
          page_size: 10,
          page: 1,
          nic: null,
          search: watch("name"),
          phone_number: null,
        });
      } else if (searchType === "nic") {
        PatientListSearch({
          page_size: 10,
          page: 1,
          nic: watch("nic"),
          search: null,
          phone_number: null,
        });
      }
    } else {
      setEditedPatient({});
      setEditMode(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, searchType]);

  const handleEditClick = (patient: PatientModel) => {
    setEditMode(patient.id);
    setEditedPatient(patient);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedPatient({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPatient({
      ...editedPatient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (id: number) => {
    const postData: Partial<PatientModel> = {
      name: editedPatient.name,
      phone_number: editedPatient.phone_number,
      nic: editedPatient.nic,
      address: editedPatient.address,
      patient_note: editedPatient.patient_note,
      date_of_birth: editedPatient.date_of_birth
        ? dayjs(editedPatient.date_of_birth).format("YYYY-MM-DD")
        : null,
    };
    try {
      const response: { data: PatientModel } = await axiosClient.put(
        `patients/${id}/`,
        postData
      );
      setEditedPatient({});
      setValue("name", response.data.name);
      setValue("phone_number", response.data.phone_number);
      setValue("nic", response.data.nic);
      setValue("address", response.data.address);
      setValue("date_of_birth", response.data.date_of_birth);
      setEditMode(null);
      handleClose();
      toast.success(`Patient ${response.data.name} new changes saved`);
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Search Patient</DialogTitle>
      <DialogContent>
        {PatientListLoading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Add</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>NIC</TableCell>
                  <TableCell>Birth Day</TableCell>
                  <TableCell>address</TableCell>
                  <TableCell>Peatint Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {PatientList.map((patient: PatientModel) => (
                  <TableRow
                    sx={{
                      cursor: "pointer",
                      //hover bg color
                      "&:hover": {
                        bgcolor: grey[200],
                      },
                    }}
                    key={patient.id}
                  >
                    {/* Select Button */}
                    <TableCell>
                      <IconButton
                        color="primary"
                        size="large"
                        onClick={() => {
                          setValue("name", patient.name);
                          setValue("phone_number", patient.phone_number);
                          setValue("nic", patient.nic);
                          setValue("address", patient.address);
                          handleClose();
                        }}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {editMode === patient.id ? (
                        <>
                          <IconButton
                            color="success"
                            onClick={() => handleSave(patient.id)}
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton color="error" onClick={handleCancelEdit}>
                            <CloseIcon />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton
                          color="primary"
                          onClick={() => handleEditClick(patient)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                    {/* Editable Name Field */}
                    <TableCell>
                      {editMode === patient.id ? (
                        <TextField
                          name="name"
                          value={editedPatient.name || ""}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        patient.name
                      )}
                    </TableCell>

                    {/* Editable Phone Number Field */}
                    <TableCell>
                      {editMode === patient.id ? (
                        <TextField
                          name="phone_number"
                          value={editedPatient.phone_number || ""}
                          onChange={handleChange}
                          size="small"
                          type="number"
                        />
                      ) : (
                        patient.phone_number
                      )}
                    </TableCell>

                    {/* Editable NIC Field */}
                    <TableCell>
                      {editMode === patient.id ? (
                        <TextField
                          name="nic"
                          value={editedPatient.nic || ""}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        patient.nic
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode === patient.id ? (
                        //birthday date picker
                        <DateInput />
                      ) : (
                        patient.date_of_birth
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode === patient.id ? (
                        <TextField
                          name="address"
                          value={editedPatient.address || ""}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        patient.address
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode === patient.id ? (
                        <TextField
                          name="patient_note"
                          value={editedPatient.patient_note || ""}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        patient.patient_note
                      )}
                    </TableCell>

                    {/* Edit Actions */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CustomerPagination
              totalCount={PatientListTotalCount}
              handlePageNavigation={PatientListPageNavigation}
              changePageSize={PatientListChangePageSize}
              page_size={PatientListLimit}
            />
          </TableContainer>
        )}

        {PatientList.length === 0 && !PatientListLoading && (
          <Typography p={1} textAlign={"center"} color="error">
            No patients information found for{" "}
            {`${searchType === "nic" ? "NIC - " + watch("nic") : ""} ${
              searchType === "name" ? "Name - " + watch("name") : ""
            } ${
              searchType === "phone_number"
                ? "Phone Number - " + watch("phone_number")
                : ""
            }`}
          </Typography>
        )}
        {PatientListError && !PatientListLoading && (
          <Typography p={1} textAlign={"center"} color="error">
            Netowrk Error Try Again
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
