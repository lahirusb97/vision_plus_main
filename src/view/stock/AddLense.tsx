import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DropdownInput from "../../components/inputui/DropdownInput"; // Import your reusable dropdown component
import useGetLenseTypes from "../../hooks/lense/useGetLenseType";
import useGetCoatings from "../../hooks/lense/useGetCoatings";
import axiosClient from "../../axiosClient";
import useGetBrands from "../../hooks/lense/useGetBrand";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  bifocalID,
  progresiveID,
  singleVisionID,
} from "../../data/staticVariables";
const AddLens = () => {
  const { lenseTypes, lenseTypesLoading } = useGetLenseTypes();
  const { brands, brandsLoading } = useGetBrands({ brand_type: "lens" });
  const { coatings, coatingsLoading } = useGetCoatings();
  const [loading, setLoading] = useState(false);

  //! Imporant Values can not be changed
  // Dropdown options

  //! Imporant Values can not be changed

  const schema = yup.object().shape({
    lensType: yup.number().required("Lens type is required"),
    brand: yup.number().required("Brand is required"),
    coating: yup.number().required("Coating is required"),
    price: yup
      .number()
      .positive()
      .min(0.01, "Price must be positive")
      .required("Price is required"),
    quantity: yup
      .number()
      .positive()
      .integer()
      .min(1)
      .required("Quantity is required"),
    sph: yup.number().required("SPH is required"),
    add: yup.number().when("lensType", {
      is: progresiveID || bifocalID,
      then: (schema) => schema.required("ADD is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    cyl: yup.number().when("lensType", {
      is: singleVisionID,
      then: (schema) => schema.required("CYL is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    lenseSide: yup.string().when("lensType", {
      is: progresiveID,
      then: (schema) => schema.required("Lens side is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    register,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      lensType: undefined,
      brand: undefined,
      coating: undefined,
      sph: undefined,
      cyl: undefined,
      add: undefined,
      price: undefined,
      quantity: undefined,
      lenseSide: "",
    },
  });

  // Submit handler
  const onSubmit = async (data: Partial<LensFormData>) => {
    const {
      lensType,
      brand,
      coating,
      price,
      quantity,
      sph,
      cyl,
      add,
      lenseSide,
    } = data;
    const progresivePowers = [
      {
        power: 1,
        value: sph,
        side: lenseSide,
      },
      {
        power: 3,
        value: add,
        side: lenseSide,
      },
    ];
    const bisocalPowers = [
      {
        power: 1,
        value: sph,
      },
      {
        power: 3,
        value: add,
      },
    ];
    const singleVisionPowers = [
      {
        power: 1,
        value: sph,
      },
      {
        power: 2,
        value: cyl,
      },
    ];
    const lense = {
      lens: {
        type: lensType,
        coating: coating,
        price: price,
        brand: brand,
      },
      stock: {
        initial_count: quantity,
        qty: quantity,
      },
      powers:
        lensType === progresiveID
          ? progresivePowers
          : lensType === bifocalID
          ? bisocalPowers
          : singleVisionPowers,
    };
    try {
      await axiosClient.post("/lenses/", lense);
      toast.success("Lense added successfully");
      reset();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const lensTypeValue = watch("lensType");
  return (
    <Paper
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        width: "500px",
      }}
    >
      <Controller
        name="lensType"
        control={control}
        render={({ field }) => (
          <DropdownInput
            options={lenseTypes}
            onChange={field.onChange}
            labelName="Lens Type"
            loading={lenseTypesLoading}
            defaultId={field.value}
          />
        )}
      />
      {errors.lensType && (
        <Typography color="error">{errors.lensType.message}</Typography>
      )}
      <Box my={1} width="100%">
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <DropdownInput
              options={brands}
              onChange={field.onChange}
              labelName="Brand"
              loading={brandsLoading}
              defaultId={field.value}
            />
          )}
        />
        {errors.brand && (
          <Typography color="error">{errors.brand.message}</Typography>
        )}
      </Box>

      <Box
        sx={{ width: "90%" }}
        border={1}
        borderRadius={1}
        p={2}
        mt={2}
        borderColor="#ccc"
      >
        <Typography variant="subtitle1" textAlign="center" mb={2}>
          Lens Power
        </Typography>

        {lensTypeValue && (
          <Box display="flex" gap={2}>
            <TextField
              label="SPH"
              type="number"
              fullWidth
              inputProps={{ step: "0.25" }} // Allow decimal values
              {...register("sph", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              error={!!errors.sph}
              helperText={errors.sph?.message}
            />

            {[progresiveID, bifocalID].includes(lensTypeValue) && (
              <TextField
                label="ADD"
                type="number"
                fullWidth
                inputProps={{ step: "0.25" }} // Allow decimal values
                {...register("add", {
                  setValueAs: (value) =>
                    value === "" ? undefined : Number(value),
                })}
                error={!!errors.add}
                helperText={errors.add?.message}
              />
            )}

            {lensTypeValue === singleVisionID && (
              <TextField
                label="CYL"
                type="number"
                fullWidth
                inputProps={{ step: "0.25" }} // Allow decimal values
                {...register("cyl", {
                  setValueAs: (value) =>
                    value === "" ? undefined : Number(value),
                })}
                error={!!errors.cyl}
                helperText={errors.cyl?.message}
              />
            )}
          </Box>
        )}
      </Box>

      {lensTypeValue === progresiveID && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Lens Side</InputLabel>
          <Controller
            name="lenseSide"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Lens Side">
                <MenuItem value="left">Left</MenuItem>
                <MenuItem value="right">Right</MenuItem>
              </Select>
            )}
          />
          {errors.lenseSide && (
            <Typography color="error">{errors.lenseSide.message}</Typography>
          )}
        </FormControl>
      )}

      <TextField
        label="Price"
        type="number"
        inputProps={{ min: 0 }}
        fullWidth
        margin="normal"
        {...register("price", {
          setValueAs: (value) => (value === "" ? undefined : Number(value)),
        })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />

      <TextField
        label="Quantity"
        type="number"
        inputProps={{ min: 1 }}
        fullWidth
        margin="normal"
        {...register("quantity", {
          setValueAs: (value) => (value === "" ? undefined : Number(value)),
        })}
        error={!!errors.quantity}
        helperText={errors.quantity?.message}
      />

      <Controller
        name="coating"
        control={control}
        render={({ field }) => (
          <DropdownInput
            options={coatings}
            onChange={field.onChange}
            labelName="Coating"
            loading={coatingsLoading}
            defaultId={field.value}
          />
        )}
      />
      {errors.coating && (
        <Typography color="error">{errors.coating.message}</Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2, bgcolor: "#42a5f5" }}
        disabled={loading}
      >
        <strong>ADD LENS</strong>
      </Button>
    </Paper>
  );
};

export default AddLens;
interface LensFormData {
  lensType: number | undefined;
  brand: number | undefined;
  coating: number | undefined;
  price: number;
  quantity: number;
  sph: number | undefined;
  cyl: number | undefined;
  add: number | undefined;
  lenseSide: string | undefined;
}
