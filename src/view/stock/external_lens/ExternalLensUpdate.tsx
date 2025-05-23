import { useEffect } from "react";
import useGetSingleExternalLens from "../../../hooks/useGetSingleExternalLens";
import { useParams } from "react-router";
import DropdownInput from "../../../components/inputui/DropdownInput"; // Import your reusable dropdown component
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExternalLensForm,
  shcemaExternalLens,
} from "../../../validations/shcemaExternalLens";
import { Controller, useForm } from "react-hook-form";
import useGetLenseTypes from "../../../hooks/lense/useGetLenseType";
import useGetCoatings from "../../../hooks/lense/useGetCoatings";
import {
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
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import toast from "react-hot-toast";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import useGetExternalFactorys from "../../../hooks/lense/useGetExternalFactorys";
import ImportantNotice from "../../../components/common/ImportantNotice";

export default function ExternalLensUpdate() {
  const { external_lens_id } = useParams();
  const { externalLens, externalLensLoading } =
    useGetSingleExternalLens(external_lens_id);
  const { lenseTypes, lenseTypesLoading } = useGetLenseTypes();
  const { externalFactorys, externalFactorysLoading } =
    useGetExternalFactorys();
  const { coatings, coatingsLoading } = useGetCoatings();
  const { putHandler, putHandlerloading } = useAxiosPut();

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
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
      await putHandler(`external_lenses/${external_lens_id}/`, data);
      reset();
      toast.success("External Lens Updated Successfully");
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  useEffect(() => {
    if (externalLens && !externalLensLoading) {
      setValue("lens_type", externalLens.lens_type);
      setValue("coating", externalLens.coating);
      setValue("brand", externalLens.brand);
      setValue("branded", externalLens.branded);
      setValue("price", parseInt(externalLens.price));
    }
  }, [externalLens, externalLensLoading]);

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
      <TitleText title="External Lens Update" />
      <ImportantNotice
        notice="Please note: modifying any of the fields below will update historical invoices and patient records. Proceed with caution."
        dismissible={false}
      />
      <Controller
        name="brand"
        control={control}
        render={({ field }) => (
          <DropdownInput
            options={externalFactorys}
            onChange={field.onChange}
            labelName="External Lens Factory"
            loading={externalFactorysLoading}
            defaultId={field.value}
          />
        )}
      />
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
        InputLabelProps={{
          shrink: Boolean(watch("price")),
        }}
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
          loading={putHandlerloading}
        />
      </FormControl>
    </Paper>
  );
}
