import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  LenseFullEditModel,
  schemaLensFullEdit,
} from "../../../validations/schemaLensFullEdit";
import { zodResolver } from "@hookform/resolvers/zod";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import useGetBrands from "../../../hooks/lense/useGetBrand";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import TitleText from "../../../components/TitleText";
import ImportantNotice from "../../../components/common/ImportantNotice";
import useGetLenseTypes from "../../../hooks/lense/useGetLenseType";
import useGetCoatings from "../../../hooks/lense/useGetCoatings";
import useGetSingleLense from "../../../hooks/lense/useGetSingleLense";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import NumericInput from "../../../components/inputui/NumericInput";
import {
  addID,
  bifocalID,
  cylID,
  progresiveID,
  singleVisionID,
  sphID,
} from "../../../data/staticVariables";
import { Delete } from "@mui/icons-material";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import { safeParseFloat } from "../../../utils/orderpaymentTotal";
import { useAxiosPatch } from "../../../hooks/useAxiosPatch";
import toast from "react-hot-toast";
import DataLoadingError from "../../../components/common/DataLoadingError";
import LoadingAnimation from "../../../components/LoadingAnimation";
export default function LenseFullEdit() {
  const navigate = useNavigate();
  const { patchHandler, patchHandlerloading, patchHandlerError } =
    useAxiosPatch();
  const POWER_TYPES = [
    //!DO NOT CHANGE ANY DATA IN THIS ARRAY
    { power: sphID, powerName: "SPH" },
    { power: cylID, powerName: "CYL" },
    { power: addID, powerName: "ADD" },
  ];

  const { lense_id } = useParams();
  const { brands, brandsLoading } = useGetBrands("lens");
  const { lenseTypes, lenseTypesLoading } = useGetLenseTypes();
  const { coatings, coatingsLoading } = useGetCoatings();
  const { singleLense, singleLenseLoading } = useGetSingleLense(lense_id);

  const {
    control,
    register,
    handleSubmit,
    watch,

    reset,
    formState: { errors, isSubmitting },
  } = useForm<LenseFullEditModel>({
    defaultValues: {
      lensType: undefined,
      brand: undefined,
      coating: undefined,
      powers: [],
    },
    resolver: zodResolver(schemaLensFullEdit),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "powers",
  });
  const allowedIds =
    watch("lensType") === singleVisionID
      ? [sphID, cylID] // single vision → only SPH & CYL
      : watch("lensType") === progresiveID || watch("lensType") === bifocalID
      ? [sphID, addID]
      : []; // everything else → SPH & ADD

  // compute which ones aren’t already in your form:
  const selectedIds = fields.map((f) => f.power);
  const availableTypes = POWER_TYPES.filter(
    (pt) => allowedIds.includes(pt.power) && !selectedIds.includes(pt.power)
  );
  useEffect(() => {
    if (singleLense) {
      reset({
        lensType: singleLense.type,
        brand: singleLense.brand,
        coating: singleLense.coating,
        powers: singleLense.powers.map((item) => ({
          value: item.value,
          power: item.power,
          side: item.side,
          powerName: item.power_name,
        })),
        price: safeParseFloat(singleLense.price),
        qty: singleLense.stock[0]?.qty,
        limit: singleLense.stock[0]?.limit,
        branch_id: singleLense.stock[0]?.branch_id,
        global_side: singleLense.powers[0]?.side,
      });
    }
  }, [singleLense]);
  const handleLenseFullEdit = async (data: LenseFullEditModel) => {
    const postData = {
      lens: {
        brand: data.brand,
        type: data.lensType,
        coating: data.coating,
        powers: data.powers,
        price: data.price,
      },

      stock: [
        {
          initial_count: data.qty,
          qty: data.qty,
          branch_id: data.branch_id,
          limit: data.limit,
        },
      ],
      powers: data.powers.map((item) => ({
        value: item.value,
        power: item.power,
        side:
          data.global_side === "left"
            ? "left"
            : data.global_side === "right"
            ? "right"
            : null,
      })),
    };
    try {
      await patchHandler(`lenses/${lense_id}/`, postData);
      toast.success("Lense Updated Successfully");
      reset();
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  if (singleLenseLoading) {
    return <LoadingAnimation loadingMsg="Loading Lense Data" />;
  }
  if (patchHandlerError) {
    return <DataLoadingError />;
  }

  return (
    <div>
      <Paper
        sx={{
          width: "600px",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TitleText title="Lens Full Edit" />

        <ImportantNotice
          notice="Please note: modifying any of the fields below will update historical invoices and patient records. Proceed with caution."
          notice2="If you want only quantity or price changes use Update Stock or Update Price buttons"
          dismissible={false}
        />
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            width: "100%",
          }}
          onSubmit={handleSubmit(handleLenseFullEdit)}
        >
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <AutocompleteInputField
                {...field}
                options={brands}
                onChange={(selectedId) => field.onChange(selectedId)}
                loading={brandsLoading}
                labelName="Select Factory"
                defaultId={watch("brand") ? watch("brand") : null}
              />
            )}
          />
          {errors.brand && (
            <Typography color="error">{errors.brand.message}</Typography>
          )}
          <Controller
            name="lensType"
            control={control}
            render={({ field }) => (
              <AutocompleteInputField
                {...field}
                options={lenseTypes}
                onChange={(selectedId) => field.onChange(selectedId)}
                loading={lenseTypesLoading}
                labelName="Select Lense Type"
                defaultId={watch("lensType") ? watch("lensType") : null}
              />
            )}
          />
          {errors.lensType && (
            <Typography color="error">{errors.lensType.message}</Typography>
          )}
          <Controller
            name="coating"
            control={control}
            render={({ field }) => (
              <AutocompleteInputField
                {...field}
                options={coatings}
                onChange={(selectedId) => field.onChange(selectedId)}
                loading={coatingsLoading}
                labelName="Select Coating"
                defaultId={watch("coating") ? watch("coating") : null}
              />
            )}
          />
          {errors.coating && (
            <Typography color="error">{errors.coating.message}</Typography>
          )}
          <Paper
            sx={{
              padding: 1,
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              gap: 1,
            }}
            variant="outlined"
          >
            <Typography fontWeight={600} variant="subtitle2">
              Powers Update
            </Typography>
            {watch("powers")?.map((power, index) => (
              <Box
                key={power.power}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ textTransform: "uppercase" }}
                >
                  {power.powerName}
                </Typography>
                <Controller
                  key={power.power}
                  name={`powers.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <NumericInput
                      {...field}
                      inputLabel={power.powerName}
                      errorCheck={(val) =>
                        power.power === cylID
                          ? parseFloat(val || "1") > 0
                          : false
                      }
                      sx={{ width: 100 }}
                    />
                  )}
                />

                <IconButton
                  size="small"
                  onClick={() => {
                    remove(index);
                  }}
                  data-testid={`delete-${power.powerName.toLowerCase()}`}
                >
                  <Delete color="error" />
                </IconButton>
                {errors.powers?.[index]?.value && (
                  <Typography variant="caption" color="error">
                    {errors.powers?.[index]?.value?.message}
                  </Typography>
                )}
              </Box>
            ))}
            {watch("lensType") === progresiveID && (
              <Controller
                name={`global_side`}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Side</InputLabel>
                    <Select
                      {...field}
                      value={field.value}
                      key={field.value}
                      label="Side"
                      onChange={(e) => field.onChange(e.target.value)}
                      size="small"
                      sx={{
                        width: 100,
                      }}
                    >
                      <MenuItem value={"right"}>Right</MenuItem>
                      <MenuItem value={"left"}>Left</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            )}
            <Box sx={{ display: "flex", gap: 1 }}>
              {availableTypes.map((power) => (
                <Button
                  variant="outlined"
                  size="small"
                  key={power.power}
                  type="button"
                  onClick={() =>
                    append({
                      power: power.power,
                      powerName: power.powerName,
                      value: "",
                      side: null,
                    })
                  }
                >
                  {power.powerName}
                </Button>
              ))}
            </Box>
          </Paper>

          <TextField
            size="small"
            label="Price"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: watch("price") ? true : false,
              },
            }}
            fullWidth
            {...register("price", { valueAsNumber: true })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />

          <TextField
            size="small"
            label="Quantity"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: watch("qty") ? true : false,
              },
            }}
            fullWidth
            {...register("qty", { valueAsNumber: true })}
            error={!!errors.qty}
            helperText={errors.qty?.message}
          />
          <TextField
            size="small"
            label="Alert Limit"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: watch("limit") ? true : false,
              },
            }}
            fullWidth
            {...register("limit", { valueAsNumber: true })}
            error={!!errors.limit}
            helperText={errors.limit?.message}
          />

          <TextField
            sx={{ display: "none" }}
            slotProps={{
              inputLabel: {
                shrink: watch("branch_id") ? true : false,
              },
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
          <SubmitCustomBtn
            btnText="Update Lense"
            loading={patchHandlerloading || isSubmitting}
            isError={patchHandlerError}
          />
        </form>
      </Paper>
    </div>
  );
}
