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
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <AttachMoneyIcon />
        <Typography>Cash</Typography>
      </Box>

      <TextField
        {...register("cash")}
        variant="outlined"
        size="small"
        type="number"
        placeholder="Enter amount"
        sx={{ width: 200 }}
        error={!!errors.cash}
        onFocus={(e) => {
          if (e.target.value === "0") {
            setValue("cash", "");
          }
        }}
        onBlur={(e) => {
          if (e.target.value === "") {
            setValue("cash", "0");
          }
        }}
      />
    </Box>
  );
};

export default CashInput;
