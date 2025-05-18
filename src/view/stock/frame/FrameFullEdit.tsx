import { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DropdownInput from "../../../components/inputui/DropdownInput";
import useGetBrands from "../../../hooks/lense/useGetBrand";
import useGetColors from "../../../hooks/lense/useGetColors";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { CodeModel } from "../../../model/CodeModel";
import {
  frameSizeFull,
  frameSizeHalf,
  frameSizeRimless,
  frameSpeciesMetal,
  frameSpeciesMetalPlastic,
  frameSpeciesPlastic,
} from "../../../data/staticVariables";
import { FrameFormModel, schemaFrame } from "../../../validations/schemaFrame";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import useGetCodes from "../../../hooks/lense/useGetCode";
import TitleText from "../../../components/TitleText";
import useGetSingleFrame from "../../../hooks/lense/useGetSingleFrame";
import DataLoadingError from "../../../components/common/DataLoadingError";
import LoadingAnimation from "../../../components/LoadingAnimation";
import { useParams } from "react-router";
import stringToIntConver from "../../../utils/stringToIntConver";
import ImportantNotice from "../../../components/common/ImportantNotice";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import { useNavigate } from "react-router";
const FrameFullEdit = () => {
  const navigate = useNavigate();
  const { frame_id } = useParams();
  const { singleFrame, singleFrameError, singleFrameLoading } =
    useGetSingleFrame(frame_id);
  const { putHandler, putHandlerloading } = useAxiosPut();
  const { brands, brandsLoading } = useGetBrands("frame");
  const { codes, codesLoading } = useGetCodes();
  const { colors, colorsLoading } = useGetColors();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<FrameFormModel>({
    resolver: zodResolver(schemaFrame),
    defaultValues: {
      brand: undefined,
      code: undefined,
      color: undefined,
      price: undefined,
      size: undefined,
      species: undefined,
      qty: undefined,
      limit: undefined,
      branch_id: getUserCurentBranch()?.id,
      brand_type: "non_branded",
    },
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
  const submitData = async (frameData: FrameFormModel) => {
    const postData = {
      brand: frameData.brand,
      code: frameData.code,
      color: frameData.color,
      price: frameData.price,
      size: frameData.size,
      species: frameData.species,
      brand_type: frameData.brand_type,

      stock: [
        {
          initial_count: frameData.qty,
          qty: frameData.qty,
          branch_id: frameData.branch_id,
          limit: frameData.limit,
        },
      ],
    };

    try {
      await putHandler(`frames/${frame_id}/`, postData);

      toast.success("Frame Updated successfully");
      navigate(-1);
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  useEffect(() => {
    if (singleFrame) {
      reset({
        brand: singleFrame.brand,
        code: singleFrame.code,
        color: singleFrame.color,
        price: stringToIntConver(singleFrame.price),
        size: singleFrame.size,
        species: singleFrame.species,
        qty: singleFrame.stock[0]?.qty || 0,
        limit: singleFrame.stock[0]?.limit || 0,
        branch_id: singleFrame.stock[0]?.branch_id,
        brand_type: singleFrame.brand_type,
      });
    }
  }, [singleFrame]);

  if (singleFrameError) {
    return <DataLoadingError />;
  }
  if (singleFrameLoading) {
    return <LoadingAnimation loadingMsg="Loading Frame Data" />;
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
        <TitleText title="Frame Full Edit" />

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
                defaultId={
                  watch("brand") && watch("code") ? watch("code") : null
                }
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

          {/* Species Dropdown */}
          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.size}>
                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Size"
                  value={field.value || ""}
                  size="small"
                >
                  <MenuItem value={frameSizeHalf}>Half</MenuItem>
                  <MenuItem value={frameSizeFull}>Full</MenuItem>
                  <MenuItem value={frameSizeRimless}>Rimless</MenuItem>
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
                  size="small"
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="species"
                  value={field.value || ""}
                >
                  <MenuItem value={frameSpeciesMetal}>Metal</MenuItem>
                  <MenuItem value={frameSpeciesPlastic}>Plastic</MenuItem>
                  <MenuItem value={frameSpeciesMetalPlastic}>
                    Metal/Plastic
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {errors.species && (
            <Typography color="error">{errors.species.message}</Typography>
          )}
          {/* Price Field */}
          <TextField
            label="Price"
            size="small"
            type="number"
            fullWidth
            variant="outlined"
            error={!!errors.price}
            helperText={errors.price?.message}
            {...register("price", { valueAsNumber: true })}
            inputProps={{
              min: 0,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* Quantity Field */}
          <TextField
            size="small"
            inputProps={{
              min: 0,
            }}
            {...register("qty", { valueAsNumber: true })}
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            error={!!errors.qty}
            helperText={errors.qty?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            size="small"
            inputProps={{
              min: 0,
            }}
            {...register("limit", { valueAsNumber: true })}
            label="Alert limit"
            type="number"
            fullWidth
            variant="outlined"
            error={!!errors.limit}
            helperText={errors.limit?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Controller
            name="brand_type"
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
          <TextField
            size="small"
            sx={{ display: "none" }}
            inputProps={{
              min: 0,
            }}
            {...register("branch_id", { valueAsNumber: true })}
            label="Branch Id"
            type="number"
            fullWidth
            variant="outlined"
            error={!!errors.branch_id}
            helperText={errors.branch_id?.message}
            defaultValue={getUserCurentBranch()?.id}
          />

          <SubmitCustomBtn
            btnText="Save"
            loading={putHandlerloading}
            isError={singleFrameError}
          />
        </form>
      </Paper>
    </div>
  );
};

export default FrameFullEdit;
