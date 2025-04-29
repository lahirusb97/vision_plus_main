import React from "react";
import { TextField, Box, Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useFormContext } from "react-hook-form";

const CardInput: React.FC = () => {
  const {
    register,
    setValue,

    formState: { errors },
  } = useFormContext();
  const onlineTransferError = errors?.credit_card;

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <CreditCardIcon />
        <Typography>Card</Typography>
      </Box>
      <TextField
        {...register("credit_card", {
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
            setValue("credit_card", "");
          }
        }}
        onBlur={(e) => {
          if (e.target.value === "") {
            setValue("credit_card", 0);
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

export default CardInput;
