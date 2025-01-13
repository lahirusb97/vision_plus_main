import React from "react";
import { Box, Button, TextField, Paper } from "@mui/material";

const AddItemsForm = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      
      
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Item Name"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            style: { fontSize: 14 },
          }}
        />
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            style: { fontSize: 14 },
          }}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            style: { fontSize: 14 },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#42a5f5",
            ":hover": {
              backgroundColor: "#1e88e5",
            },
          }}
        >
          ADD ITEMS
        </Button>
      </Paper>
    </Box>
  );
};

export default AddItemsForm;
