import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const FrameUpdate = () => {
  const [quantity, setQuantity] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",

        
      }}
    >
      <Paper sx={{ padding: 4, width: 400, textAlign: "Left",   }} elevation={3}>
        <Typography variant="h6" fontWeight="bold" paddingLeft="9px">
          Frames Update
        </Typography>

        <Box sx={{ marginY: 2 }}>
          <Chip label="Brand Name" color="primary" sx={{ marginX: 0.5, backgroundColor: "blue" }} />
          <Chip label="code" color="primary" sx={{ marginX: 0.5, backgroundColor: "blue" }} />
          <Chip label="color" color="primary" sx={{ marginX: 0.5, backgroundColor: "blue" }} />
        </Box>

        <TextField
          fullWidth
          label="Quantity"
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <Button variant="contained" sx={{ backgroundColor: "blue" }} fullWidth>
          SAVE
        </Button>
      </Paper>
    </Box>
  );
};

export default FrameUpdate;
