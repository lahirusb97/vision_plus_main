import React from "react";
import { TextField, Box, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useFormContext } from "react-hook-form";

const CashInput: React.FC = () => {
  const {
    register,

    setValue,
    formState: { errors },
  } = useFormContext();
  const onlineTransferError = errors?.cash;

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <AttachMoneyIcon />
        <Typography>Cash</Typography>
      </Box>

      <TextField
        {...register("cash", { valueAsNumber: true, min: 0, required: true })}
        inputProps={{ min: 0 }}
        variant="outlined"
        size="small"
        type="number"
        placeholder="Enter amount"
        sx={{ width: 120 }}
        onFocus={(e) => {
          if (e.target.value === "0") {
            setValue("cash", "");
          }
        }}
        onBlur={(e) => {
          if (e.target.value === "") {
            setValue("cash", 0);
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

export default CashInput;
