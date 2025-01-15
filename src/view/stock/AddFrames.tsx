import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import DropdownInput, { Option } from "../../components/inputui/DropdownInput";
import useGetBrands from "../../hooks/lense/useGetBrand";
import useGetCodes from "../../hooks/lense/useGetCode";
import useGetColors from "../../hooks/lense/useGetColors";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostApiCall } from "../../hooks/usePostApiCall";

const AddFrames = () => {
  const { brands, brandsLoading, brandsError } = useGetBrands();
  const { codes, codesLoading, codesError } = useGetCodes();
  const { colors, colorsLoading, colorsError } = useGetColors();
  const { loading, postApi } = usePostApiCall();
  // Dropdown options

  const validationSchema = Yup.object().shape({
    brand: Yup.number().required("Doctor ID is required"),
    code: Yup.number().required("Patient Name is required"),
    color: Yup.number().required("Patient Address is required"),
    price: Yup.number().required("Patient Contact is required"),
    size: Yup.string().required("Channel Date is required"),
    species: Yup.string().required("Time is required"),
    image: Yup.string(),
    qty: Yup.number().required("quantity is required"),
  });
  const { register, handleSubmit, watch, control } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Submit handler
  const submitData = (frameData) => {
    const postData = {
      frame: {
        brand: frameData.brand,
        code: frameData.code,
        color: frameData.color,
        price: frameData.price,
        size: frameData.size,
        species: frameData.species,
        image: frameData.image,
        qty: frameData.qty,
      },
      stock: {
        initial_count: frameData.qty,
        qty: frameData.qty,
      },
    };
    console.log(frameData);

    postApi("/frames/", postData);
  };

  return (
    <Paper
      sx={{
        width: "600px",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <form onSubmit={handleSubmit(submitData)}>
        {/* Brand Dropdown */}
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <DropdownInput
              {...field}
              options={brands}
              // onChange={(selectedId) => field.onChange(selectedId)}
              loading={brandsLoading}
              labelName="Select Brand"
            />
          )}
        />
        {/* Code Dropdown */}

        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <DropdownInput
              {...field}
              options={codes}
              onChange={(selectedId) => field.onChange(selectedId)}
              loading={codesLoading}
              labelName="Select Code"
            />
          )}
        />
        {/* Color Dropdown */}

        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <DropdownInput
              {...field}
              options={colors}
              onChange={(selectedId) => field.onChange(selectedId)}
              loading={colorsLoading}
              labelName="Select Color"
            />
          )}
        />

        {/* Price Field */}
        <TextField
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
          })}
          name="price"
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
        />

        {/* Species Dropdown */}
        <Controller
          name="size"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Shape</InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Shape"
              >
                <MenuItem value={"Half"}>Half</MenuItem>
                <MenuItem value={"Full"}>Full</MenuItem>
                <MenuItem value={"Rimless"}>Rimless</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        {/* Species Dropdown */}
        <Controller
          name="species"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Species</InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="species"
              >
                <MenuItem value={"Metal"}>Metal</MenuItem>
                <MenuItem value={"Plastic"}>Plastic</MenuItem>
                <MenuItem value={"Metal/Plastic"}>Metal/Plastic</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        {/* Quantity Field */}
        <TextField
          {...register("qty", {
            required: "Quantity is required",
            valueAsNumber: true,
          })}
          label="Quantity"
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
        />

        {/* Submit Button */}
        <Button
          disabled={loading}
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>
    </Paper>
  );
};

export default AddFrames;
