import { Button, TextField, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function OrderEditIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload
    // updateSearchParams(searchQuery);
    navigate(`${searchQuery}`);
  };
  return (
    <Paper
      variant="elevation"
      sx={{ p: 2, width: 500, minHeight: 100, mt: 20 }}
    >
      <Typography variant="h6">Search Invoice using Order Number</Typography>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        <TextField
          label="Search"
          variant="outlined"
          placeholder="Enter Order Number"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ height: 50 }}>
          Search
        </Button>
      </form>
    </Paper>
  );
}
