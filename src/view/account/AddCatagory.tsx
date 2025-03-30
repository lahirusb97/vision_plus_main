import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Stack,
  Divider,
} from "@mui/material";

const AddCatagory = () => {
  return (
    <Box p={2}>
      <Paper elevation={3} sx={{ p: 2 }}>
        {/* Main Category Section */}
        
        <TextField
          label="Main Category"
          variant="outlined"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button variant="contained" color="primary">
            ADD
          </Button>
          <Button variant="contained" color="success">
            Edit
          </Button>
          <Button variant="contained" color="error">
            Delete
          </Button>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Sub Category Section */}
       
        <TextField
          label="Sub Category"
          variant="outlined"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary">
            ADD
          </Button>
          <Button variant="contained" color="success">
            Edit
          </Button>
          <Button variant="contained" color="error">
            Delete
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AddCatagory;