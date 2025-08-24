import React from "react";
import { PatientModel } from "../../model/Patient";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import { EditIcon } from "lucide-react";

export default function OrderPatientDetail({
  patientData,
  refractionNumber = null,
  prescription = null,
  onEdit,
}: {
  patientData: PatientModel | null;
  refractionNumber?: string | null;
  prescription?: string | null;
  onEdit: () => void;
}) {
  if (!patientData) return null;

  const details = [
    { label: "Name", value: patientData.name },
    { label: "NIC", value: patientData.nic || "_" },
    { label: "Address", value: patientData.address },
    { label: "Phone Number", value: patientData.phone_number || "_" },
    { label: "Extra Phone", value: patientData.extra_phone_number || "_" },
    { label: "Date of Birth", value: patientData.date_of_birth || "_" },
    { label: "Patient Note", value: patientData.patient_note || "_" },
  ];

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <CardContent sx={{ p: 1 }}>
        <Grid container spacing={0.5}>
          {refractionNumber && (
            <Grid item xs={12} sm={6}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", lineHeight: 1.2 }}
              >
                Refraction Number
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, lineHeight: 1.4 }}
              >
                {refractionNumber}
              </Typography>
            </Grid>
          )}
          {prescription && (
            <Grid item xs={12} sm={6}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", lineHeight: 1.2 }}
              >
                Prescription
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, lineHeight: 1.4 }}
              >
                {prescription}
              </Typography>
            </Grid>
          )}
          {details.map((detail, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", lineHeight: 1.2 }}
              >
                {detail.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, lineHeight: 1.4 }}
              >
                {detail.value}
              </Typography>
            </Grid>
          ))}
          <IconButton onClick={() => onEdit()}>
            <EditIcon />
          </IconButton>
        </Grid>
      </CardContent>
    </Card>
  );
}
