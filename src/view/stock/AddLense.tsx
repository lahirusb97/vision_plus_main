import React, { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import DropdownInput from "../../components/inputui/DropdownInput"; // Import your reusable dropdown component
import useGetLenseTypes from "../../hooks/lense/useGetLenseType";
import useGetCoatings from "../../hooks/lense/useGetCoatings";
import axiosClient from "../../axiosClient";
import useGetBrands from "../../hooks/lense/useGetBrand";
const AddLens = () => {
  const {lenseTypes,lenseTypesLoading}=useGetLenseTypes();
  const {brands,brandsLoading}=useGetBrands();
  const {coatings,coatingsLoading,}=useGetCoatings();
  const [lensType, setLensType] = useState<number | null>(null);
  const [brand, setBrand] = useState<number | null>(null);
  const [sph, setSph] = useState("");
  const [cyl, setCyl] = useState("");
  const [add, setAdd] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState("");
  const [coating, setCoating] = useState<number | null>(null);
 const [loading, setLoading] = useState(false);
 const [lenseSide, setLenseSide] = React.useState('');
 const [errors, setErrors] = useState<{ [key: string]: string }>({});
 const validateForm = () => {
  const newErrors: { [key: string]: string } = {};
  const numberRegex = /^-?\d+(\.\d+)?$/;

  // Required fields validation
  if (!lensType) newErrors.lensType = "Lens type is required";
  if (!brand) newErrors.brand = "Brand is required";
  if (!coating) newErrors.coating = "Coating is required";
  
  // Price validation
  if (!price>0) {
    newErrors.price = "Price must be a positive number";
  }

  // Quantity validation
  if (!quantity.trim()) {
    newErrors.quantity = "Quantity is required";
  } else if (!Number.isInteger(Number(quantity)) || parseInt(quantity) <= 0) {
    newErrors.quantity = "Quantity must be a positive integer";
  }

  // Power validation based on lens type
  if (lensType === Progresive) {
    if (!sph.trim()) newErrors.sph = "SPH is required";
    else if (!numberRegex.test(sph)) newErrors.sph = "Invalid SPH value";
    
    if (!add.trim()) newErrors.add = "ADD is required";
    else if (!numberRegex.test(add)) newErrors.add = "Invalid ADD value";
    
    if (!lenseSide) newErrors.lenseSide = "Lens side is required";

  } else if (lensType === bisocal) {
    if (!sph.trim()) newErrors.sph = "SPH is required";
    else if (!numberRegex.test(sph)) newErrors.sph = "Invalid SPH value";
    
    if (!add.trim()) newErrors.add = "ADD is required";
    else if (!numberRegex.test(add)) newErrors.add = "Invalid ADD value";

  } else if (lensType === single_vision) {
    if (!sph.trim()) newErrors.sph = "SPH is required";
    else if (!numberRegex.test(sph)) newErrors.sph = "Invalid SPH value";
    
    if (!cyl.trim()) newErrors.cyl = "CYL is required";
    else if (!numberRegex.test(cyl)) newErrors.cyl = "Invalid CYL value";
  }

  return newErrors;
};

//! Imporant Values can not be changed
  // Dropdown options
  // const bisocal=3;
  // const Progresive=2;
  // const single_vision=1;  
   const bisocal=5;
   const Progresive=4;
   const single_vision=3;  
//! Imporant Values can not be changed

   const handleChange = (event: SelectChangeEvent) => {
    setLenseSide(event.target.value as string);
  };
 
  // Submit handler
  const handleSubmit = async() => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);

const progresivePowers=[{
      power: 6,
      value: sph,
      side: lenseSide,
    },
    {
      power: 8,
      value: add,
      side: lenseSide,
    },
  ]
const bisocalPowers=[{
      power: 6,
      value: sph,
      side: "N/A",
    },
    {
      power: 8,
      value: add,
      side: "N/A",
    },
  ]
const singleVisionPowers=[{
      power: 6,
      value: sph,
      side: "N/A",
    },
    {
      power: 7,
      value: cyl,
      side: "N/A",
    },
  ]
  const lense ={
    lens: {
        type: lensType,
        coating: coating,
        price: price,
        brand: brand
    },
    stock: {
        initial_count: parseInt(quantity),
        qty: parseInt(quantity)
    },
    powers: lensType === Progresive ? progresivePowers : lensType === bisocal ? bisocalPowers : singleVisionPowers
}
    try {
      const data = await axiosClient.post("/lenses/", lense);

    } catch (error) {
      console.error(error);
      
    }finally{
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        width: "500px",
      }}
    >
  
      <DropdownInput
      options={lenseTypes}
      onChange={(selectedId) => setLensType(selectedId)}
      labelName="Lens Type"
      loading={false}
      defaultId={null}
      />
    {errors.lensType && <Typography color="error" variant="body2">{errors.lensType}</Typography>}

    <Box sx={{marginY:1,width:'100%'}}>
    <DropdownInput
      options={brands}
      onChange={(selectedId) => setBrand(selectedId)}
      labelName="Brand"
      loading={false}
      defaultId={null}
      />
    </Box>
{errors.brand && <Typography color="error" variant="body2">{errors.brand}</Typography>}

      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: 2,
          marginTop: 2,
          width:400
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ textAlign: "center", marginBottom: 2 }}
        >
          Lens Power
        </Typography>
      {!lensType &&  <Typography
      color="error"
          variant="subtitle1"
          sx={{ textAlign: "center", marginBottom: 2 }}
        >
          Select Lense Type to See Power Options
        </Typography>}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
        {lensType&&  <TextField
            label="SPH"
            type="number"
            fullWidth
            variant="outlined"
            value={sph}
            onChange={(e) => {
              setSph(e.target.value);
              setErrors(prev => ({ ...prev, sph: '' }));
            }}
            error={!!errors.sph}
            helperText={errors.sph}
          />}
         {lensType && single_vision !==lensType && <TextField
            label="ADD"
            type="number"
            fullWidth
            variant="outlined"
            value={add}
            onChange={(e) => {
              setAdd(e.target.value);
              setErrors(prev => ({ ...prev, add: '' }));
            }}
            error={!!errors.add}
            helperText={errors.add}
          />}
        { lensType && single_vision ===lensType && <TextField
            label="CYL"
            type="number"
            fullWidth
            variant="outlined"
            value={cyl}
            onChange={(e) => {
              setCyl(e.target.value);
              setErrors(prev => ({ ...prev, cyl: '' }));
            }}
            error={!!errors.cyl}
            helperText={errors.cyl}
          />}
        </Box>
      </Box>
     { lensType && Progresive===lensType && <FormControl sx={{ m: 1,  }} fullWidth>
        <InputLabel id="demo-simple-select-label">Lense Side</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lenseSide}
          label="Lense Side"
          onChange={handleChange}
        >
          <MenuItem value={'left'}>Left</MenuItem>
          <MenuItem value={'right'}>Right</MenuItem>
         
        </Select>
      </FormControl>}
      {/* Price Field */}
      <TextField
        label="Price"
        type="number"
        fullWidth
        margin="normal"
        variant="outlined"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        error={!!errors.price}
        helperText={errors.price}
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
        error={!!errors.quantity}
        helperText={errors.quantity}
      />


      {/* Coating Dropdown */}
      <DropdownInput
        options={coatings}
        onChange={(selectedId) => setCoating(selectedId)}
        labelName="Coating"
        loading={false}
      />
{errors.coating && <Typography color="error" variant="body2">{errors.coating}</Typography>}

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
