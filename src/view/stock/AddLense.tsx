import { useEffect, useRef } from "react";
import {
  Box,
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
import useGetBrands from "../../hooks/lense/useGetBrand";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addID,
  bifocalID,
  cylID,
  progresiveID,
  singleVisionID,
  sphID,
} from "../../data/staticVariables";
import { LenseFormModel, schemaLens } from "../../validations/schemaLens";
import { getUserCurentBranch } from "../../utils/authDataConver";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import SaveButton from "../../components/SaveButton";
import { TypeLensSide } from "../../model/StaticTypeModels";

const AddLens = () => {
  const { lenseTypes, lenseTypesLoading } = useGetLenseTypes();
  const leftToastRef = useRef<string | null>(null);
  const rightToastRef = useRef<string | null>(null);

  const { brands, brandsLoading } = useGetBrands({ brand_type: "lens" });
  const { coatings, coatingsLoading } = useGetCoatings();
  const { postHandler, postHandlerloading } = useAxiosPost();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    register,
    reset,
  } = useForm<LenseFormModel>({
    resolver: zodResolver(schemaLens),
    defaultValues: {
      lensType: undefined,
      brand: undefined,
      coating: undefined,
      price: undefined,
      qty: undefined,
      sph: undefined,
      cyl: undefined,
      add: undefined,
      side: null,
      branch_id: getUserCurentBranch()?.id,
      limit: undefined,
    },
  });
  const lensTypeValue = watch("lensType");
  useEffect(() => {
    // Reset sph, cyl, and add when lensType changes
    reset({
      sph: null,
      cyl: null,
      add: null,
      lensType: lensTypeValue,
      brand: undefined,
      coating: undefined,
      price: undefined,
      qty: undefined,
      side: null,
      branch_id: getUserCurentBranch()?.id,
      limit: undefined,
    });
  }, [lensTypeValue, reset]);
  // Submit handler
  const onSubmit = async (data: LenseFormModel) => {
    const {
      lensType,
      brand,
      coating,
      price,
      qty,
      sph,
      cyl,
      add,
      side,
      branch_id,
      limit,
    } = data;

    const createLenseObj = (sideValue: TypeLensSide) => {
      const powersList = [
        {
          power: sphID,
          value: sph,
          side: sideValue,
        },
        {
          power: cylID,
          value: cyl,
          side: sideValue,
        },
        {
          power: addID,
          value: add,
          side: sideValue,
        },
      ];

      return {
        lens: {
          type: lensType,
          coating: coating,
          price: price,
          brand: brand,
        },
        stock: [
          { initial_count: qty, qty: qty, branch_id: branch_id, limit: limit },
        ],
        powers: powersList.filter((power) => power.value !== null),
      };
    };

    try {
      if (side === "both") {
        try {
          leftToastRef.current = toast.loading("Left Side Lense Creating");
          await postHandler("lenses/", createLenseObj("left"));
          toast.success("Left Side Lense Created!", {
            id: leftToastRef.current,
          });
        } catch (error) {
          extractErrorMessage(error);
          if (leftToastRef.current) {
            toast.error("Something went wrong while creating the Left lens.", {
              id: leftToastRef.current,
            });
          }
          throw error;
        }

        try {
          rightToastRef.current = toast.loading("Right Side Lense Creating");
          await postHandler("lenses/", createLenseObj("right"));
          toast.success("Right Side Lense Created!", {
            id: rightToastRef.current,
            duration: Infinity,
          });
        } catch (error) {
          extractErrorMessage(error);
          if (rightToastRef.current) {
            toast.error("Something went wrong while creating the Right lens.", {
              id: rightToastRef.current,
              duration: Infinity,
            });
          }
          throw error;
        }
      } else {
        try {
          await postHandler("lenses/", createLenseObj(null));
        } catch (error) {
          extractErrorMessage(error);
          throw error;
        }
      }
      reset();
      toast.success("Lense Added Successfully");
    } catch (error) {
      extractErrorMessage(error);
    }
  };

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
        gap: 1,
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
      <Box width="100%">
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <DropdownInput
              options={brands}
              onChange={field.onChange}
              labelName="Lens Factory"
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
        borderColor="#ccc"
      >
        <Typography variant="subtitle1" textAlign="center" mb={2}>
          Lens Power
        </Typography>

        {lensTypeValue && (
          <Box display="flex" gap={1}>
            <TextField
              size="small"
              label="SPH"
              type="number"
              fullWidth
              inputProps={{ step: "0.25" }} // Allow decimal values
              {...register("sph", { valueAsNumber: true })}
              error={!!errors.sph}
              helperText={errors.sph?.message}
            />

            {[progresiveID, bifocalID].includes(lensTypeValue) && (
              <TextField
                size="small"
                label="ADD"
                type="number"
                fullWidth
                inputProps={{ step: "0.25" }} // Allow decimal values
                {...register("add", { valueAsNumber: true })}
                error={!!errors.add}
                helperText={errors.add?.message}
              />
            )}

            {lensTypeValue === singleVisionID && (
              <TextField
                size="small"
                label="CYL"
                type="number"
                fullWidth
                inputProps={{ step: "0.25" }} // Allow decimal values
                {...register("cyl", { valueAsNumber: true })}
                error={!!errors.cyl}
                helperText={errors.cyl?.message}
              />
            )}
          </Box>
        )}
      </Box>

      {lensTypeValue === progresiveID && (
        <FormControl fullWidth>
          <InputLabel>Lens Side</InputLabel>
          <Controller
            name="side"
            control={control}
            render={({ field }) => (
              <Select size="small" {...field} label="Lens Side">
                <MenuItem value="left">Left</MenuItem>
                <MenuItem value="right">Right</MenuItem>
                <MenuItem value="both">Both</MenuItem>
              </Select>
            )}
          />
          {errors.side && (
            <Typography color="error">{errors.side.message}</Typography>
          )}
        </FormControl>
      )}

      <TextField
        size="small"
        label="Price"
        type="number"
        inputProps={{ min: 0 }}
        fullWidth
        {...register("price", { valueAsNumber: true })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />

      <TextField
        size="small"
        label="Quantity"
        type="number"
        inputProps={{ min: 1 }}
        fullWidth
        {...register("qty", { valueAsNumber: true })}
        error={!!errors.qty}
        helperText={errors.qty?.message}
      />
      <TextField
        size="small"
        label="Alert Limit"
        type="number"
        inputProps={{ min: 1 }}
        fullWidth
        {...register("limit", { valueAsNumber: true })}
        error={!!errors.limit}
        helperText={errors.limit?.message}
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
      <TextField
        sx={{ display: "none" }}
        inputProps={{
          min: 0,
        }}
        {...register("branch_id", {
          setValueAs: (value) => (value === "" ? undefined : Number(value)),
        })}
        label="Branch Id"
        type="number"
        fullWidth
        variant="outlined"
        error={!!errors.branch_id}
        helperText={errors.branch_id?.message}
        defaultValue={getUserCurentBranch()?.id}
      />
      <Box sx={{ mt: 1 }}></Box>
      <SaveButton btnText="Lens Create" loading={postHandlerloading} />
    </Paper>
  );
};

export default AddLens;
