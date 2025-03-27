import { Box, Chip, TextField, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import useGetSingleOtherItem from "../../../hooks/useGetSingleOtherItem";
import {
  OtherItemFormModel,
  schemaOtherItem,
} from "../../../validations/schemaOtherItem";
import { useAxiosPatch } from "../../../hooks/useAxiosPatch";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import BackButton from "../../../components/BackButton";
import LoadingAnimation from "../../../components/LoadingAnimation";
import SaveButton from "../../../components/SaveButton";

const OtherItemEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //API CALL  HOOKS
  const { singleotherItem, singleotherItemLoading } = useGetSingleOtherItem(id);
  const { patchHandler, patchHandlerloading } = useAxiosPatch();
  //API CALL  HOOKS

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<Pick<OtherItemFormModel, "price">>({
    resolver: zodResolver(schemaOtherItem.pick({ price: true })),
    defaultValues: {
      price: undefined,
    },
  });
  const submiteData = async (data: Pick<OtherItemFormModel, "price">) => {
    if (singleotherItem) {
      const postDAta = {
        item: {
          price: data.price,
        },
      };
      try {
        patchHandler(`/other-items/${id}/`, postDAta);
        toast.success(
          `${singleotherItem?.item.name} Quantity Updated Successfully`
        );
        reset();
        navigate(-1);
      } catch (error) {
        extractErrorMessage(error);
      }
    }
  };
  if (singleotherItemLoading) {
    return <LoadingAnimation loadingMsg="Other Item Details Loading..." />;
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
        <BackButton />

        <Typography variant="h6" fontWeight="bold" paddingLeft="9px">
          Other Item Price Update
        </Typography>
        <Box sx={{ marginY: 2 }}>
          <Chip
            label={`Name - ${singleotherItem?.item.name}`}
            color="primary"
            sx={{ margin: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
          <Chip
            label={`Price - Rs.${singleotherItem?.item.price}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
          <Chip
            label={`Avilabal Quantity - ${singleotherItem?.stock[0]?.qty}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
        </Box>
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

        <SaveButton loading={patchHandlerloading} btnText="Update Price" />
      </Paper>
    </Box>
  );
};

export default OtherItemEdit;
