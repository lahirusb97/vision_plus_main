import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DropdownInput from "../../components/inputui/DropdownInput";
import useGetBrands from "../../hooks/lense/useGetBrand";
import useGetCodes from "../../hooks/lense/useGetCode";
import useGetColors from "../../hooks/lense/useGetColors";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import axiosClient from "../../axiosClient";
import { AxiosError } from "axios";
import { CodeModel } from "../../model/CodeModel";
const AddFrames = () => {
  const { brands, brandsLoading } = useGetBrands({
    brand_type: "frame",
  });
  const { codes, codesLoading } = useGetCodes();
  const { colors, colorsLoading } = useGetColors();
  const [loading, setLoading] = useState(false);
  // Dropdown options

  const validationSchema = Yup.object().shape({
    brand: Yup.number().required("Brand Name is required"),
    code: Yup.number().required("Code is required"),
    color: Yup.number().required("Color is required"),
    price: Yup.number()
      .positive()
      .min(0.01, "Price must be positive")
      .required("Price is required"),
    size: Yup.string().required("Frame Size is required"),
    species: Yup.string().required("species is required"),
    image: Yup.string(),
    qty: Yup.number()
      .positive()
      .integer()
      .min(1)
      .required("Quantity is required"),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [avilableCodes, setAvilableCodes] = useState<CodeModel[]>([]);

  useEffect(() => {
    if (watch("brand")) {
      setAvilableCodes(codes.filter((item) => item.brand === watch("brand")));
    } else {
      setAvilableCodes([]);
    }
  }, [watch("brand")]);

  // Submit handler
  const submitData = async (frameData) => {
    setLoading(true);
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
    try {
      await axiosClient.post("/frames/", postData);
      toast.success("Frame added successfully");
      reset();
    } catch (error) {
      // Check if the error is an AxiosError
      if (error instanceof AxiosError) {
        // Safely access error.response.data.message
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        // Handle non-Axios errors (e.g., network errors, syntax errors, etc.)
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography
        sx={{ marginBottom: 2, fontWeight: "bold" }}
        variant="h4"
        gutterBottom
      >
        Create Frame
      </Typography>

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
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "100%",
          }}
          onSubmit={handleSubmit(submitData)}
        >
          {/* Brand Dropdown */}
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <DropdownInput
                {...field}
                options={brands}
                onChange={(selectedId) => field.onChange(selectedId)}
                loading={brandsLoading}
                labelName="Select Brand"
                defaultId={watch("brand") ? watch("brand") : null}
              />
            )}
          />
          {errors.brand && (
            <Typography color="error">{errors.brand.message}</Typography>
          )}

          {/* Code Dropdown */}

          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <DropdownInput
                {...field}
                options={avilableCodes}
                onChange={(selectedId) => field.onChange(selectedId)}
                loading={codesLoading}
                labelName="Select Code"
                defaultId={watch("code") ? watch("code") : null}
              />
            )}
          />
          {/* Color Dropdown */}
          {errors.code && (
            <Typography color="error">{errors.code.message}</Typography>
          )}

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
                defaultId={watch("color") ? watch("color") : null}
              />
            )}
          />
          {errors.color && (
            <Typography color="error">{errors.color.message}</Typography>
          )}

          {/* Price Field */}
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.price}
            helperText={errors.price?.message}
            {...register("price", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
          />

          {/* Species Dropdown */}
          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.size}>
                <InputLabel id="demo-simple-select-label">Shape</InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Size"
                  value={field.value || ""}
                >
                  <MenuItem value={"Half"}>Half</MenuItem>
                  <MenuItem value={"Full"}>Full</MenuItem>
                  <MenuItem value={"Rimless"}>Rimless</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {errors.size && (
            <Typography color="error">{errors.size.message}</Typography>
          )}

          {/* Species Dropdown */}
          <Controller
            name="species"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.species}>
                <InputLabel id="demo-simple-select-label">Species</InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="species"
                  value={field.value || ""}
                >
                  <MenuItem value={"Metal"}>Metal</MenuItem>
                  <MenuItem value={"Plastic"}>Plastic</MenuItem>
                  <MenuItem value={"Metal/Plastic"}>Metal/Plastic</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {errors.species && (
            <Typography color="error">{errors.species.message}</Typography>
          )}

          {/* Quantity Field */}
          <TextField
            inputProps={{
              min: 0,
            }}
            {...register("qty", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
            label="Quantity"
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.qty}
            helperText={errors.qty?.message}
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
    </div>
  );
};

export default AddFrames;
