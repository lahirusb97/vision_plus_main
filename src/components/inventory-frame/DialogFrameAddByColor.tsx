import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FrameModel } from "../../model/FrameModel";
import DropdownInput from "../inputui/DropdownInput";
import { FrameFormModel, schemaFrame } from "../../validations/schemaFrame";
import useGetColors from "../../hooks/lense/useGetColors";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { MAIN_STORE_ID } from "../../data/staticVariables";
import { getUserCurentBranch } from "../../utils/authDataConver";

interface DialogFrameAddByColorProps {
  open: boolean;
  onClose: () => void;
  frame?: FrameModel;
  onSuccess?: () => void;
}

const DialogFrameAddByColor = ({
  open,
  onClose,
  frame,
  onSuccess,
}: DialogFrameAddByColorProps) => {
  const { postHandler, postHandlerloading } = useAxiosPost();

  const { colors, colorsLoading } = useGetColors();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm<FrameFormModel>({
    resolver: zodResolver(
      schemaFrame.pick({
        color: true,
        qty: true,
        brand_type: true,
      })
    ),
    defaultValues: {
      color: frame?.color || undefined,
      qty: undefined,
      brand_type: frame?.brand_type || "non_branded",
    },
  });
  //form state error

  const onSubmit = async (frameData: FrameFormModel) => {
    const formData = new FormData();
    // Add frame fields
    console.log("FRAME", frame);
    if (frame) {
      formData.append("brand", frame.brand.toString());
      formData.append("code", frame.code.toString());
      formData.append("color", frameData.color.toString());
      formData.append("price", frame.price);
      formData.append("size", frame.size);
      formData.append("species", frame.species);
      formData.append("brand_type", frameData.brand_type);

      // Handle null/undefined image with a fallback to empty string
      formData.append("image_id", frame.image?.toString() || "");

      //add stock
      formData.append(
        "stock",
        JSON.stringify([
          {
            initial_count: frameData.qty,
            qty: frameData.qty,
            branch_id: getUserCurentBranch()?.id,
            limit: frameData.limit,
          },
        ])
      );

      try {
        await postHandler("frames/", formData);
        toast.success("Frame added successfully");
        reset();
        onSuccess?.();
      } catch (error) {
        extractErrorMessage(error);
      }
    } else {
      toast.error("Frame not found");
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };
  console.log("FRAME", frame);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{"Add New Frame by Color"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Brand Selection */}

            {/* Code Selection */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Color *
              </Typography>
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
                    defaultId={watch("color") || null}
                  />
                )}
              />
              {errors.color && (
                <Typography color="error" variant="caption">
                  {errors.color.message}
                </Typography>
              )}
            </Box>
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={postHandlerloading}
          >
            {postHandlerloading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogFrameAddByColor;
