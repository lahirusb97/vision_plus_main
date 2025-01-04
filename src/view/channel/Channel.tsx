import React from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const Channel = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        margin: 2,
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "#fff",
        border:"1px solid black"
      }}
    >
      
      <FormControl fullWidth sx={{ mb: 2, border:'1px solid black'}}>
        
        <InputLabel>Doctor Name</InputLabel>
        <Select>
          <MenuItem value="Doctor 1">Doctor 1</MenuItem>
          <MenuItem value="Doctor 2">Doctor 2</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Patient Name"
    
        sx={{ mb: 2, border:'1px solid black'}}
      />

      <TextField
        fullWidth
        label="Patient Contact"
        sx={{ mb: 2, border:'1px solid black' }}
      />


      <TextField
        fullWidth
        label="Time"
        

        sx={{ mb: 2, border:'1px solid black'}}
      />

      <TextField
        fullWidth
        label="Amount"
      
        sx={{ mb: 2, border:'1px solid black' }}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ textTransform: "none", height: 48, backgroundColor:"blue", color:"white" }}
      >
        OK
      </Button>
    </Box>
  );
};

export default Channel;