import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Payment } from "@mui/icons-material";
import { useNavigate } from "react-router";

import useGetDoctors from "../../../hooks/useGetDoctors";
import { useDeleteDialog } from "../../../context/DeleteDialogContext";
import { EyeIcon } from "lucide-react";

const statusColors = {
  available: "success",
  unavailable: "error",
  on_leave: "warning",
} as const;

const DoctorTable: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, refresh } = useGetDoctors();
  const { openDialog } = useDeleteDialog();
  const handleUpdate = (doctor_id: number) => {
    navigate(`${doctor_id}/update`);
  };
  const handleFeesUpdate = (doctor_id: number) => {
    navigate(`${doctor_id}/fees`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={3}>
      <Button
        sx={{ m: 1 }}
        variant="contained"
        onClick={() => navigate("create")}
        startIcon={<EditIcon />}
      >
        Add Doctor
      </Button>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography variant="h6">Doctors List</Typography>
        {/* <Button
          variant="contained"
          onClick={refresh}
          startIcon={<RefreshIcon />}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </Button> */}
      </Box>

      <Table size="small" sx={{ minWidth: 650 }} aria-label="doctors table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Actions</TableCell>

            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((doctor) => (
            <TableRow
              key={doctor.id}
              hover
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                <Box display="flex" gap={0} justifyContent="flex-start">
                  <Tooltip title="Edit doctor">
                    <IconButton
                      onClick={() => handleUpdate(doctor.id)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit doctor">
                    <IconButton
                      onClick={() => handleFeesUpdate(doctor.id)}
                      color="primary"
                      size="small"
                    >
                      <EyeIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete doctor">
                    <IconButton
                      size="small"
                      onClick={() => {
                        openDialog(
                          `/doctors/${doctor.id}/`,
                          "doctor",
                          "This will Deactivate this doctor and all the data related to this doctor including Appointments",
                          "Deactivate",
                          refresh
                        );
                      }}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell>{doctor.name}</TableCell>
              <TableCell>{doctor.contact_info}</TableCell>
              <TableCell>
                <Chip
                  label={doctor.status.replace("_", " ")}
                  color={
                    statusColors[doctor.status as keyof typeof statusColors]
                  }
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DoctorTable;
