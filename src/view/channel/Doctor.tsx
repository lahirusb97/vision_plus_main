import { DateRange, Delete } from "@mui/icons-material";
import { Button, IconButton, Paper, Typography } from "@mui/material";
import React from "react";

export default function Doctor() {
  return (
    <div>
      <Button
        sx={{ width: 200, textTransform: "capitalize" }}
        variant="outlined"
      >
        Doctor
      </Button>
      <Button
        sx={{ width: 200, textTransform: "capitalize" }}
        variant="outlined"
      >
        Add
      </Button>
      <Paper>
        <div>
          <Typography>Name</Typography>
        </div>
        <div>
          <IconButton>
            <DateRange />
          </IconButton>
          <IconButton>
            <Delete />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
}
