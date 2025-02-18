import React from "react";
import { TextField, Box, Button, Paper, Typography } from "@mui/material";
import { History } from "@mui/icons-material";
import DrawerStock from "./inputui/DrawerStock";

export default function PationtDetails() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

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
        <Button onClick={toggleDrawer} color="error" variant="contained">
          Note
        </Button>
        <Button onClick={toggleDrawer} color="primary" variant="contained">
          Frames
        </Button>
        <Button onClick={toggleDrawer} color="primary" variant="contained">
          Stock Lense
        </Button>
        <Button onClick={toggleDrawer} color="secondary" variant="contained">
          None Stock Lense
        </Button>
      </Box>
      <DrawerStock open={open} toggleDrawer={toggleDrawer} />
    </Box>
  );
}
