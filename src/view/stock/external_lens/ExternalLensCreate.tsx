import DropdownInput from "../../../components/inputui/DropdownInput"; // Import your reusable dropdown component

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExternalLensForm,
  shcemaExternalLens,
} from "../../../validations/shcemaExternalLens";
import { Controller, useForm } from "react-hook-form";
import useGetLenseTypes from "../../../hooks/lense/useGetLenseType";
import useGetBrands from "../../../hooks/lense/useGetBrand";
import useGetCoatings from "../../../hooks/lense/useGetCoatings";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
} from "@mui/material";
import TitleText from "../../../components/TitleText";
import SaveButton from "../../../components/SaveButton";
import axiosClient from "../../../axiosClient";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import toast from "react-hot-toast";

export default function ExternalLensCreate() {
  const { lenseTypes, lenseTypesLoading } = useGetLenseTypes();
  const { brands, brandsLoading } = useGetBrands({ brand_type: "lens" });
  const { coatings, coatingsLoading } = useGetCoatings();
  const { postHandler, postHandlerloading } = useAxiosPost();

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<ExternalLensForm>({
    resolver: zodResolver(shcemaExternalLens),
    defaultValues: {
      lens_type: undefined,
      coating: undefined,
      brand: undefined,
      branded: "non_branded",
      price: undefined,
    },
  });
  const createExternalLens = async (data: ExternalLensForm) => {
    try {
      await postHandler("external_lenses/", data);
      reset();
      toast.success("External Lens Created Successfully");
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        minWidth: 400,
        p: 1,
        mt: 2,
      }}
      component={"form"}
      onSubmit={handleSubmit(createExternalLens)}
    >
      <TitleText title="External Lens Create" />
      <Controller
        name="lens_type"
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
      <FormControl component="fieldset">
        <FormLabel component="legend">Branded Status</FormLabel>
        <Controller
          name="branded"
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel
                value="branded"
                control={<Radio />}
                label="Branded"
              />
              <FormControlLabel
                defaultChecked
                value="non_branded"
                control={<Radio />}
                label="Non-Branded"
              />
            </RadioGroup>
          )}
        />
        <SaveButton
          btnText="External Lens Create"
          loading={postHandlerloading}
        />
      </FormControl>
    </Paper>
  );
}
