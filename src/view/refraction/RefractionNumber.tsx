import React from "react";
import { Paper, TextField, Button, Box, Typography } from "@mui/material";

export default function RefractionNumber() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom align="center">
          Customer Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Customer Name"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            margin="normal"
            required
            type="tel"
            inputProps={{
              pattern: "[0-9]{10}",
              title: "Please enter a valid 10-digit phone number",
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: "#6200ea",
              "&:hover": {
                backgroundColor: "#3700b3",
              },
            }}
          >
            OK
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
