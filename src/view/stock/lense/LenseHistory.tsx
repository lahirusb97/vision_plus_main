import React from "react";
import { Box, Button, Chip, Typography, Paper, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const LenseHistory = () => {
  return (
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
      {/* Stock History Header */}
      <Paper sx={{ padding: 2, marginBottom: 2 , width:1000}}>
        <Typography variant="h6" fontWeight="bold">
          Stock History
        </Typography>
        <Box sx={{ marginTop: 1 }}>
          <Chip label="lens type" sx={{ marginRight: 1, backgroundColor: "blue"}} />
          <Chip label="coating"  sx={{ marginRight: 1, backgroundColor: "blue" }} />
          <Chip label="lens brand" color="primary" sx={{ marginRight: 1, backgroundColor: "blue" }} />
        </Box>
      </Paper>

      {/* Stock Changes */}
      <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
        Stock Changes
      </Typography>

      <Grid container spacing={2}>
        {/* Added Stock */}
        <Grid item xs={12}>
          <Paper sx={{ padding: 2, backgroundColor: "#DFF2BF" }}>
            <Box display="flex" alignItems="center">
              <AddCircleIcon color="success" sx={{ marginRight: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Added 4 units
              </Typography>
            </Box>
            <Typography>Stock Updated</Typography>
            <Typography fontSize="small" color="textSecondary">
              Latest update date and time
            </Typography>
          </Paper>
        </Grid>

        {/* Removed Stock */}
        <Grid item xs={12}>
          <Paper sx={{ padding: 2, backgroundColor: "#FFBABA" }}>
            <Box display="flex" alignItems="center">
              <RemoveCircleIcon color="error" sx={{ marginRight: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Removed 4 units
              </Typography>
            </Box>
            <Typography>Stock Remove</Typography>
            <Typography fontSize="small" color="textSecondary">
              Latest update date and time
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LenseHistory;