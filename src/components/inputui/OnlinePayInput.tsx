import React from "react";
import { TextField, Box, Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useFormContext } from "react-hook-form";
import LanguageIcon from "@mui/icons-material/Language";
const OnlinePayInput: React.FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <LanguageIcon />
        <Typography>Online Payment</Typography>
      </Box>
      <TextField
        {...register("online_transfer")}
        variant="outlined"
        size="small"
        placeholder="Enter Amount"
        sx={{ width: 200 }}
        type="number"
        onFocus={(e) => {
          if (e.target.value === "0") {
            setValue("online_transfer", "");
          }
        }}
        onBlur={(e) => {
          if (e.target.value === "") {
            setValue("online_transfer", "0");
          }
        }}
        error={!!errors.card}
      />
    </Box>
  );
};

export default OnlinePayInput;
