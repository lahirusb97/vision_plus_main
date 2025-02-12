import React from "react";
import { TextField, Box, Radio, Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useFormContext } from "react-hook-form";

const CardInput: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Radio />
      <Box display="flex" alignItems="center" gap={1}>
        <CreditCardIcon />
        <Typography>Card</Typography>
      </Box>
      <TextField
        {...register("card")}
        variant="outlined"
        size="small"
        placeholder="Card number"
        sx={{ width: 200 }}
        type="number"
        error={!!errors.card}
      />
    </Box>
  );
};

export default CardInput;
