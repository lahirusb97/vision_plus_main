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
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import axiosClient from "../axiosClient";
import { PatientModel } from "../model/Patient";
import { Search } from "@mui/icons-material";

export default function FilterPatient() {
  const [open, setOpen] = useState(false);
  const [patients, setPatients] = useState<PatientModel[]>([]);
  const [loading, setLoading] = useState(false);
  const { setValue, watch } = useFormContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const fetchPatients = async () => {
        setLoading(true);
        try {
          const response = await axiosClient.get(
            `patients/?search=${watch("name")}&phone_number=${watch(
              "phone_number"
            )}`
          );
          setPatients(response.data.results);
        } catch (error) {
          console.error("Error fetching patients:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPatients();
    }
  }, [open]);

  return (
    <>
      <IconButton onClick={handleClickOpen} color="info">
        <Search />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Search Patient</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>NIC</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map((patient: PatientModel) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => {
                            setValue("name", patient.name);
                            setValue("phone_number", patient.phone_number);
                            setValue("nic", patient.nic);
                            handleClose();
                          }}
                        >
                          Select
                        </Button>
                      </TableCell>

                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.phone_number}</TableCell>
                      <TableCell>{patient.nic}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {patients.length === 0 && !loading && (
            <Typography p={1} textAlign={"center"} color="error">
              No patients found for Under Name of {watch("name")} & mobile
              Number {watch("phone_number")}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
