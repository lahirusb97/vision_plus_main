import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const Expence = () => {
  // Dummy data for dropdowns
  const mainCategories = ["Office Supplies", "Travel", "Food"];
  const subCategories = ["Stationery", "Fuel", "Lunch"];

  return (
    <Box p={2}>
      {/* Total Expense and Total Received Section */}
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" gutterBottom>
            Total Expense: Rs 2500.00
          </Typography>
          <Typography variant="body1" gutterBottom>
            Total Received: Rs 25000.00
          </Typography>
        </Box>
      </Paper>

      {/* Form Section */}
      <Paper elevation={3} sx={{ p: 2 }}>
        
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          {/* Main Category Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Main Category</InputLabel>
              <Select label="Main Category">
                {mainCategories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Sub Category Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Sub Category</InputLabel>
              <Select label="Sub Category">
                {subCategories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              size="small"
              multiline
              rows={3}
            />
          </Grid>

          {/* Amount */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Amount"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
            />
          </Grid>

          {/* Save Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Expence;