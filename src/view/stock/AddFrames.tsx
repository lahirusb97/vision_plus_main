import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import DropdownInput, { Option } from "../../components/inputui/DropdownInput";

const AddFrames = () => {
  
  const [selectedOptions, setSelectedOptions] = useState({
    brand: null,
    code: null,
    color: null,
    shape: null,
    species: null,
  });
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  // Dropdown options
  const brandOptions = [
    { id: 1, name: "Brand 1" },
    { id: 2, name: "Brand 2" },
  ];

  const codeOptions = [
    { id: 1, name: "Code 1" },
    { id: 2, name: "Code 2" },
  ];

  const colorOptions = [
    { id: 1, name: "Red" },
    { id: 2, name: "Blue" },
  ];

  const shapeOptions = [
    { id: 1, name: "Round" },
    { id: 2, name: "Square" },
  ];

  const speciesOptions = [
    { id: 1, name: "Metal" },
    { id: 2, name: "Plastic" },
  ];
  

  // Handler for dropdown changes
  
  const handleDropdownChange = (selectedId: string | number | null, field: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [field.toLowerCase()]: selectedId,
    }));
  };

  // Submit handler
  const handleSubmit = () => {
    const frameData = {
      ...selectedOptions,
      price: Number(price),
      quantity: Number(quantity),
    };
    console.log("Frame Created:", frameData);
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
        {/* Brand Dropdown */}
        <DropdownInput
          options={brandOptions}
          onChange={(selectedId) => handleDropdownChange(selectedId, "Brand")}
          loading={loading}
          labelName="Select Brand"
          
          
        
          
        />

        {/* Code Dropdown */}
        <DropdownInput
          options={codeOptions}
          onChange={(selectedId) => handleDropdownChange(selectedId, "Code")}
          loading={loading}
          labelName="Select Code"
          
        />

        {/* Color Dropdown */}
        <DropdownInput
          options={colorOptions}
          onChange={(selectedId) => handleDropdownChange(selectedId, "Color")}
          loading={loading}
          labelName="Select Color"
        />

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

        {/* Shape Dropdown */}
        <DropdownInput
          options={shapeOptions}
          onChange={(selectedId) => handleDropdownChange(selectedId, "Shape")}
          loading={loading}
          labelName="Frame Shape"
        />

        {/* Species Dropdown */}
        <DropdownInput
          options={speciesOptions}
          onChange={(selectedId) => handleDropdownChange(selectedId, "Species")}
          loading={loading}
          labelName="Frame Species"
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

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, backgroundColor:"blue",  }}
          onClick={handleSubmit}
        >
         <strong> CREATE FRAME</strong>
        </Button>
      </Box>
    </Box>
  );
};

export default AddFrames;