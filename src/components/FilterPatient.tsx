import React, { ChangeEvent, useEffect, useState } from "react";
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
  Pagination,
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
import useGetAllPatient from "../hooks/useGetAllPatient";

export default function FilterPatient({
  open,
  searchType,
  handleClose,
}: {
  open: boolean;
  searchType: string;
  handleClose: () => void;
}) {
  const [fetchpatientData, setfetchPatientData] = useState<boolean>(false);
  const {
    patientLimit,
    patientsList,
    patientLoading,
    totalPatientCount,
    handlePatientSearch,
    patientPageNavigation,
    refreshPatientList,
  } = useGetAllPatient({ open: fetchpatientData });

  const { setValue, watch } = useFormContext();
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedPatient, setEditedPatient] = useState<Partial<PatientModel>>({});

  useEffect(() => {
    if (open) {
      if (searchType === "phone_number") {
        handlePatientSearch("phone_number", watch("phone_number"));
        setfetchPatientData(true);
      } else if (searchType === "name") {
        handlePatientSearch("name", watch("name"));
        setfetchPatientData(true);
      } else if (searchType === "nic") {
        handlePatientSearch("nic", watch("nic"));
        setfetchPatientData(true);
      }
    } else {
      setEditedPatient({});
      setEditMode(null);
      setfetchPatientData(false);
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
    try {
      const response: { data: PatientModel } = await axiosClient.put(
        `patients/${id}/`,
        editedPatient
      );
      setEditedPatient({});
      setfetchPatientData(true);
      refreshPatientList();
      setEditMode(null);
      toast.success(`Patient ${response.data.name} new changes saved`);
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Search Patient</DialogTitle>
      <DialogContent>
        {patientLoading ? (
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
                  <TableCell>address</TableCell>
                  <TableCell>Peatint Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patientsList.map((patient: PatientModel) => (
                  <TableRow key={patient.id}>
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
            <Pagination
              count={Math.ceil(totalPatientCount / patientLimit)}
              onChange={(_e: ChangeEvent<unknown>, value: number) => {
                patientPageNavigation(value);
              }}
            ></Pagination>
          </TableContainer>
        )}

        {patientsList.length === 0 && !patientLoading && (
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
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
