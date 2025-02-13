import React from "react";
import { TextField, Box, Radio, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useFormContext } from "react-hook-form";

const CashInput: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Radio />
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
      />
    </Box>
  );
};

export default CashInput;
