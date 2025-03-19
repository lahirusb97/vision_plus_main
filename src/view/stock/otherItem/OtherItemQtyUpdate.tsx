import {
  Box,
  Button,
  Chip,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import {
  OtherItemFormModel,
  schemaOtherItem,
} from "../../../validations/schemaOtherItem";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetSingleOtherItem from "../../../hooks/useGetSingleOtherItem";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import LoadingAnimation from "../../../components/LoadingAnimation";
import { useAxiosPatch } from "../../../hooks/useAxiosPatch";

const OtherItemQtyUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { singleotherItem, singleotherItemLoading } = useGetSingleOtherItem(id);
  const { patchHandler, patchHandlerloading } = useAxiosPatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<Pick<OtherItemFormModel, "qty" | "initial_count">>({
    resolver: zodResolver(
      schemaOtherItem.pick({ qty: true, initial_count: true })
    ),
  });

  //TODO alert levels Upgrade
  const submiteData = async (
    data: Pick<OtherItemFormModel, "qty" | "initial_count">
  ) => {
    if (singleotherItem) {
      const postDAta = {
        qty: singleotherItem?.stock[0]?.qty + data.qty,
        initial_count: singleotherItem?.stock[0]?.qty + data.qty,
      };
      try {
        patchHandler(`/other-items/${id}/`, { stock: postDAta });
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
    return <LoadingAnimation loadingMsg="Loading Other Item" />;
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
          Other Item Quantity Update
        </Typography>

        <Box sx={{ marginY: 2 }}>
          <Chip
            label={`Name - ${singleotherItem?.item.name}`}
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
          label="Enter Quantity Amount"
          variant="outlined"
          inputProps={{ min: 0 }}
          type="number"
          {...register("qty", { valueAsNumber: true, min: 0, required: true })}
          error={!!errors.qty}
          helperText={errors.qty?.message}
          sx={{ marginBottom: 2 }}
        />

        <Button
          disabled={patchHandlerloading}
          type="submit"
          variant="contained"
          fullWidth
        >
          {patchHandlerloading ? (
            <CircularProgress size={24} />
          ) : (
            "Update Quantity"
          )}
        </Button>
      </Paper>
    </Box>
  );
};

export default OtherItemQtyUpdate;
