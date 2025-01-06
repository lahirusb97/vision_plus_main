import React from "react";
import { TextField, Box } from "@mui/material";


const FormUI = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        width: 400,
        backgroundColor: "#f0f7ff",
        border: "1px solid #c4c4c4",
        borderRadius: 2,
        boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <TextField label="NIC" variant="outlined" defaultValue="1998255700227" />
      <TextField
        label="Address"
        variant="outlined"
        defaultValue="Aluthgama Road, Mathugama"
      />
      <TextField
        label="Contact No"
        variant="outlined"
        defaultValue="+94717152625"
      />
      <TextField label="Age" variant="outlined" defaultValue="28" />
    </Box>
  );
};

export default FormUI;
  