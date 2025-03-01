import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import { DeleteForever, Edit, Info } from "@mui/icons-material";
import axiosClient from "../../axiosClient";
import useGetDoctors from "../../hooks/useGetDoctors";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  contact_info: string;
  status: string;
}

const Doctor = () => {
  const [doctorName, setDoctorName] = useState("Dr. Smith");
  const [specialization, setSpecialization] = useState("Cardiologist");
  const [contactInfo, setContactInfo] = useState("dr.smith@hospital.com");
  const [status, setStatus] = useState("available");

  const {
    data: doctorList,
    loading: loadingDoctors,
    error: errorDoctors,
    refresh: refreshDoctors,
  } = useGetDoctors();

  const handleAddDoctor = async () => {
    if (doctorName.trim() && specialization.trim() && contactInfo.trim()) {
      const newDoctor = {
        name: doctorName,
        specialization,
        contact_info: contactInfo,
        status,
      };
      try {
        await axiosClient.post("/doctors/", newDoctor);
        refreshDoctors();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleDeleteDoctor = async (doctorId: number) => {
    try {
      await axiosClient.delete(`/doctors/${doctorId}`);
      refreshDoctors();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 1000,
        margin: "auto",
        textAlign: "center",
      }}
    >
      {/* Input Fields */}
      <Box sx={{ mb: 4, display: "flex", flexWrap: "wrap", gap: 2 }}>
        <TextField
          fullWidth
          label="Doctor Name"
          variant="outlined"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Specialization"
          variant="outlined"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
        <TextField
          fullWidth
          label="Contact Info"
          variant="outlined"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
        <TextField
          fullWidth
          select
          label="Status"
          variant="outlined"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="unavailable">Unavailable</MenuItem>
        </TextField>
        <Button
          fullWidth
          variant="contained"
          sx={{
            textTransform: "capitalize",
            background: "linear-gradient(to right, #E8C2F3 70%, #D4F492)",
          }}
          onClick={handleAddDoctor}
        >
          Add Doctor
        </Button>
      </Box>

      {/* Doctor List */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Doctor List
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {doctorList &&
          doctorList.map((doctor) => (
            <Paper
              key={doctor.id}
              sx={{
                width: 600,
                padding: 2,
                textAlign: "left",
                background:
                  "linear-gradient(to right, rgb(185, 203, 227), rgb(226, 226, 226))",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="h6">{doctor.name}</Typography>
              <Typography variant="body2">
                <strong>Specialization:</strong> {doctor.specialization}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {doctor.status}
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
              >
                <IconButton color="secondary">
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => {
                    handleDeleteDoctor(doctor.id);
                  }}
                  color="error"
                >
                  <DeleteForever />
                </IconButton>
              </Box>
            </Paper>
          ))}
      </Box>
    </Box>
  );
};

export default Doctor;
