import React from "react";
import { TextField, Box, Button, Paper, Typography } from "@mui/material";
import { History } from "@mui/icons-material";

export default function PationtDetails() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button color="info" variant="contained">
          <History />
        </Button>
        <Paper sx={{ p: 1, flexGrow: 2 }}>
          <Typography>R.N0: 10</Typography>
        </Paper>
        <Paper>
          <Typography sx={{ p: 1 }}>
            Date {new Date().toLocaleDateString()}
          </Typography>
        </Paper>
        <TextField sx={{ width: 120 }} size="small" label="Staff Code" />
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField sx={{ flexGrow: 1 }} size="small" label="name" />
        <TextField sx={{ width: 80 }} size="small" label="Age" />
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField sx={{ flexGrow: 1 }} size="small" label="Mobile Number" />
        <TextField sx={{ flexGrow: 1 }} size="small" label="NIC" />
      </Box>
      <TextField size="small" label="Address" />
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button color="error" variant="contained">
          Note
        </Button>
        <Button color="primary" variant="contained">
          Frames
        </Button>
        <Button color="primary" variant="contained">
          Stock Lense
        </Button>
        <Button color="secondary" variant="contained">
          None Stock Lense
        </Button>
      </Box>
    </Box>
  );
}
