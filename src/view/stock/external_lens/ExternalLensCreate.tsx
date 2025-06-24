import DropdownInput from "../../../components/inputui/DropdownInput"; // Import your reusable dropdown component

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExternalLensForm,
  shcemaExternalLens,
} from "../../../validations/shcemaExternalLens";
import { Controller, useForm } from "react-hook-form";
import useGetLenseTypes from "../../../hooks/lense/useGetLenseType";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Box,
} from "@mui/material";
import TitleText from "../../../components/TitleText";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import toast from "react-hot-toast";
import AddVariationComp from "../AddVariationComp";
import useGetExternalFactorys from "../../../hooks/lense/useGetExternalFactorys";
import useGetExternalCoating from "../../../hooks/lense/useGetExternalCoating";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
export default function ExternalLensCreate() {
  const { lenseTypes, lenseTypesLoading } = useGetLenseTypes();

  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const { externalFactorys, externalFactorysLoading } =
    useGetExternalFactorys();
  const { externalCoatings, externalCoatingsLoading } = useGetExternalCoating();
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          minWidth: 800,
          p: 1,
        }}
        component={"form"}
        onSubmit={handleSubmit(createExternalLens)}
      >
        <TitleText title="External Lens Create" />
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <DropdownInput
              options={externalFactorys}
              onChange={field.onChange}
              labelName="Lens Factory"
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
              options={externalCoatings}
              onChange={field.onChange}
              labelName="Coating"
              loading={externalCoatingsLoading}
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
          <SubmitCustomBtn
            btnText="External Lens Create"
            loading={postHandlerloading}
            isError={postHandlerError}
          />
        </FormControl>
      </Paper>
      <Paper sx={{ p: 1 }}>
        <TitleText title="External Lens Variations Create" />
        <AddVariationComp
          loading={externalFactorysLoading}
          textName="External Lens Factorys"
          Urlpath="lense_factory"
          dataList={externalFactorys}
          // pathroute={"external-lens-brands"}
          // refresh={externalFactorysRefresh}
        />
        <AddVariationComp
          loading={externalCoatingsLoading}
          textName="External Lens Coatings"
          Urlpath="lense_coating"
          dataList={externalCoatings}
          // pathroute={"external-lens-coatings"}
          // refresh={externalCoatingsRefresh}
        />
      </Paper>
    </Box>
  );
}
