import React from "react";
import { Box, Button, TextField, Typography, ToggleButtonGroup, ToggleButton, Chip } from "@mui/material";

const LenseEdit = () => {
  const [alignment, setAlignment] = React.useState("lensType");

  function handleAlignment(event: any, newAlignment: React.SetStateAction<string> | null) {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        
      }}
    >
      <Box
        sx={{
          width: 400,
          p: 3,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" textAlign="Left" mb={2}>
          Price and Stock Limit Edit
        </Typography>

        <Box sx={{ marginY: 2 }}>
          <Chip label="Lens type" color="primary" sx={{ marginX: 0.5, backgroundColor: "blue" }} />
          <Chip label="Lens brand" color="primary" sx={{ marginX: 0.5, backgroundColor: "blue" }} />
          <Chip label="Coating" color="primary" sx={{ marginX: 0.5, backgroundColor: "blue" }} />
        </Box>
        <TextField fullWidth label="Price" variant="outlined" margin="normal" />
        <TextField fullWidth label="Stock Limit" variant="outlined" margin="normal" />

        <Button fullWidth variant="contained"  sx={{ mt: 2, backgroundColor:"blue" }}>
          SAVE
        </Button>
      </Box>
    </Box>
  );
};

export default LenseEdit;
