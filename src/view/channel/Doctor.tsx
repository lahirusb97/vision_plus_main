
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function Doctor() {
  const [doctorName, setDoctorName] = useState("");
  const [doctorList, setDoctorList] = useState([]);

// Load data from localStorage on component mount
useEffect(() => {
  const storedDoctors = JSON.parse(localStorage.getItem("doctorList") || "[]");
  setDoctorList(storedDoctors);
}, []);


  // Function to add a doctor
const handleAddDoctor = () => {
  if (doctorName.trim()) {
    const updatedList = [...doctorList, doctorName];
    setDoctorList(updatedList);
    setDoctorName(""); // Clear the input field
    localStorage.setItem("doctorList", JSON.stringify(updatedList)); // Save to localStorage
  }
};

  return (
    <Box
      sx={{
        padding: 1,
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
        
      }}
    >
      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3,  }}>
        
      </Box>

      {/* Input Field and Add Button */}
      <Box sx={{ display: "flex", gap: 2, mb: 3,width: "500px", margin:2 }}>
      
        <TextField
          fullWidth
          label="Doctor Name"
          variant="outlined"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
        <Button
        fullWidth
          variant="contained"
          sx={{
            textTransform: "capitalize",
            background: "linear-gradient(to right, #f093fb, #f5576c)",
            width: "500px",
            
          }}
          onClick={handleAddDoctor}
        >
          ADD
        </Button>
      </Box>

      {/* Doctor List */}
      <Paper sx={{ margin:2,  padding: 1, textAlign: "left",background: "linear-gradient(to right,rgb(61, 123, 165),rgb(255, 247, 248))",  }}>
        
        <List>
          {doctorList.map((name, index) => (
            <ListItem key={index}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
  
  
  
