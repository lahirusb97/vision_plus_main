import React from "react";
import { PatientModel } from "../../model/Patient";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import { EditIcon } from "lucide-react";

export default function OrderPatientDetail({
  patientData,
  onEdit,
}: {
  patientData: PatientModel | null;
  onEdit: () => void;
}) {
  if (!patientData) return null;

  const details = [
    { label: "Name", value: patientData.name },
    { label: "NIC", value: patientData.nic },
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
        p: 0,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <CardContent sx={{ p: 1.5 }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: 600, color: "primary.main", m: 0 }}
        >
          Patient Details
        </Typography>
        <Divider sx={{ mb: 1 }} />

        <Grid container spacing={0.5}>
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
