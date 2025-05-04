import { Box, Chip, TextField, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useParams } from "react-router";
import toast from "react-hot-toast";

import useGetSingleLense from "../../../hooks/lense/useGetSingleLense";
import LoadingAnimation from "../../../components/LoadingAnimation";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";

interface Stock {
  price: number;
}
const LenseEdit = () => {
  const { id } = useParams();
  const { singleLense, singleLenseLoading, refresh } = useGetSingleLense(id);

  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const schema = yup.object().shape({
    price: yup
      .number()
      .positive()
      .min(0.01, "Price must be positive")
      .required("Price is required"),
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      price: undefined,
    },
  });
  const submiteData = async (data: Stock) => {
    const { price } = data;
    const postDAta = {
      lens: { price: price, brand: singleLense?.brand },
    };

    try {
      await putHandler(`/lenses/${id}/`, postDAta);
      toast.success("Lense Saved Successfully");
      reset();
      refresh();
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  if (singleLenseLoading) {
    return <LoadingAnimation loadingMsg="Loading Lense Details" />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Paper
        component={"form"}
        onSubmit={handleSubmit(submiteData)}
        sx={{ padding: 4, width: 400, textAlign: "Left" }}
        elevation={3}
      >
        <Typography variant="h6" fontWeight="bold" paddingLeft="9px">
          Lense Price Update
        </Typography>

        <Box sx={{ marginY: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Chip
            label={`Factory - ${singleLense?.brand_name}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
          <Chip
            label={`Type - ${singleLense?.type_name}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />

          <Chip
            label={`Coating - ${singleLense?.coating_name}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
        </Box>
        <Paper
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            p: 1,
            alignItems: "center",
          }}
        >
          <Typography>Powers</Typography>
          {singleLense?.powers.map((power) => (
            <Chip
              label={`${power.power_name.toLocaleUpperCase()}: ${power.value}`}
              sx={{
                marginX: 0.5,
                backgroundColor: "#131e36",
                color: "white",
              }}
            />
          ))}
        </Paper>
        <Typography
          marginY={1}
          variant="body1"
          fontWeight="bold"
          paddingLeft="9px"
        >
          Curent Price- Rs.{singleLense?.price}
        </Typography>
        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          inputProps={{ min: 0 }}
          type="number"
          {...register("price", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
          sx={{ marginBottom: 2 }}
        />

        <SubmitCustomBtn
          btnText="Update Price"
          loading={putHandlerloading}
          isError={putHandlerError}
        />
      </Paper>
    </Box>
  );
};

export default LenseEdit;
