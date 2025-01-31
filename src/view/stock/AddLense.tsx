import React, { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import DropdownInput from "../../components/inputui/DropdownInput"; // Import your reusable dropdown component
import useGetLenseTypes from "../../hooks/lense/useGetLenseType";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const AddLens = () => {
  const {lenseTypes,lenseTypesLoading}=useGetLenseTypes();
  const [lensType, setLensType] = useState<number | null>(null);
  const [sph, setSph] = useState("");
  const [add, setAdd] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [coating, setCoating] = useState<number | null>(null);


  // Dropdown options

  const coatingOptions = [
    { id: 1, name: "Anti-Reflective" },
    { id: 2, name: "Blue Light Filter" },
    { id: 3, name: "Scratch Resistant" },
  ];
  // const bisocal=3;
  // const Progresive=2;
  // const single_vision=1;  
   const bisocal=5;
   const Progresive=4;
   const single_vision=3;  
console.log(coating);

  // Submit handler
  const handleSubmit = () => {
    const lense = {
      type: lensType,
      coating: coating,
      price: "150.00"
    };
    console.log("Lens Created:", lensData);
    // Add your API call or further logic here
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      {/* Lens Type Dropdown */}

            <DropdownInput
         
              options={lenseTypes}
              onChange={(selectedId) => setLensType(selectedId)}
              labelName="Lens Type"
              loading={false}
              defaultId={null}
            />
     
        
    

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
         {single_vision !==lensType && <TextField
            label="ADD"
            type="number"
            fullWidth
            variant="outlined"
            value={add}
            onChange={(e) => setAdd(e.target.value)}
          />}
        { single_vision ===lensType && <TextField
            label="CYL"
            type="number"
            fullWidth
            variant="outlined"
            value={add}
            onChange={(e) => setAdd(e.target.value)}
          />}
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
        labelName="Coating"
        loading={false}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2, backgroundColor: "#42a5f5" }}
        onClick={handleSubmit}
      >
        <strong>ADD LENS</strong>
      </Button>
    </Paper>
  );
};

export default AddLens;
