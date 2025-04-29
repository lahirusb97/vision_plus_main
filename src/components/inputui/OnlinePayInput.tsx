import React from "react";
import { TextField, Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import LanguageIcon from "@mui/icons-material/Language";
const OnlinePayInput: React.FC = () => {
  const {
    register,
    setValue,

    formState: { errors },
  } = useFormContext();
  const onlineTransferError = errors?.online_transfer;

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <LanguageIcon />
        <Typography>Online Payment</Typography>
      </Box>
      <TextField
        {...register("online_transfer", {
          valueAsNumber: true,
          min: 0,
          required: true,
        })}
        inputProps={{ min: 0 }}
        variant="outlined"
        size="small"
        placeholder="Enter Amount"
        sx={{ width: 120 }}
        type="number"
        onFocus={(e) => {
          if (e.target.value === "0") {
            setValue("online_transfer", "");
          }
        }}
        onBlur={(e) => {
          if (e.target.value === "") {
            setValue("online_transfer", 0);
          }
        }}
        error={!!onlineTransferError}
        helperText={
          typeof onlineTransferError?.message === "string"
            ? onlineTransferError.message
            : ""
        }
      />
    </Box>
  );
};

export default OnlinePayInput;
