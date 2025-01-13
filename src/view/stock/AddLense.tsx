import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import DropdownInput from "../../components/inputui/DropdownInput"; // Import your reusable dropdown component

const AddLens = () => {
  const [lensType, setLensType] = useState("");
  const [sph, setSph] = useState("");
  const [add, setAdd] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [coating, setCoating] = useState("");

  // Dropdown options
  const lensTypeOptions = [
    { id: 1, name: "Single Vision" },
    { id: 2, name: "Progressive" },
    { id: 3, name: "Bifocal" },
  ];

  const coatingOptions = [
    { id: 1, name: "Anti-Reflective" },
    { id: 2, name: "Blue Light Filter" },
    { id: 3, name: "Scratch Resistant" },
  ];

  // Submit handler
  const handleSubmit = () => {
    const lensData = {
      lensType,
      sph: Number(sph),
      add: Number(add),
      price: Number(price),
      quantity: Number(quantity),
      coating,
    };
    console.log("Lens Created:", lensData);
    // Add your API call or further logic here
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "600px",
          backgroundColor: "#ffffff",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Lens Type Dropdown */}
        <DropdownInput
          options={lensTypeOptions}
          onChange={(selectedId) => setLensType(selectedId)}
          labelName="Lens Type" loading={false}        />

        {/* Lens Power Section */}
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: 2,
            marginTop: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            Lens Power
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <TextField
              label="SPH"
              type="number"
              fullWidth
              variant="outlined"
              value={sph}
              onChange={(e) => setSph(e.target.value)}
            />
            <TextField
              label="ADD"
              type="number"
              fullWidth
              variant="outlined"
              value={add}
              onChange={(e) => setAdd(e.target.value)}
            />
          </Box>
        </Box>

        {/* Price Field */}
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Quantity Field */}
        <TextField
          label="Quantity"
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        {/* Coating Dropdown */}
        <DropdownInput
          options={coatingOptions}
          onChange={(selectedId) => setCoating(selectedId)}
          labelName="Coating" loading={false}        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, backgroundColor:"#42a5f5" }}
          onClick={handleSubmit}
        >
          <strong>ADD LENS</strong>
        </Button>
      </Box>
    </Box>
  );
};

export default AddLens;