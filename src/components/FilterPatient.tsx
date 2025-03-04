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
import { AxiosError } from "axios";

export default function FilterPatient({
  open,
  searchType,
  handleClose,
}: {
  open: boolean;
  searchType: string;
  handleClose: () => void;
}) {
  const [patients, setPatients] = useState<PatientModel[]>([]);
  const [loading, setLoading] = useState(false);
  const { setValue, watch } = useFormContext();
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedPatient, setEditedPatient] = useState<Partial<PatientModel>>({});

  useEffect(() => {
    if (open) {
      const fetchPatients = async () => {
        setLoading(true);
        try {
          const response = await axiosClient.get(
            `patients/?search=${
              searchType === "phone_number"
                ? watch("phone_number")
                : watch("name")
            }`
          );
          setPatients(response.data.results);
        } catch (error) {
          console.error("Error fetching patients:", error);
          toast.error("Network Error check your internet Connection");
        } finally {
          setLoading(false);
        }
      };
      fetchPatients();
    } else {
      setPatients([]);
      setLoading(false);
      setEditedPatient({});
      setEditMode(null);
    }
  }, [open]);

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
      const response = await axiosClient.put(`patients/${id}/`, editedPatient);
      setPatients((prevPatients) =>
        prevPatients.map((p) => (p.id === id ? response.data : p))
      );
      setEditMode(null);
      toast.success("Patient updated successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ||
            "Patient updated Failed check your internet"
        );
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Search Patient</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Add</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>NIC</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient: PatientModel) => (
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
                          handleClose();
                        }}
                      >
                        <AddCircleIcon />
                      </IconButton>
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

                    {/* Edit Actions */}
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {patients.length === 0 && !loading && (
          <Typography p={1} textAlign={"center"} color="error">
            No patients found for Name: {watch("name")} & Mobile Number:{" "}
            {watch("phone_number")}
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
