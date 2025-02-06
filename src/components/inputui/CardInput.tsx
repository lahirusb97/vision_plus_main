import React from "react";
import { TextField, Box, Radio, Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const CardInput: React.FC = ({ card, setCard }) => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Radio />
      <Box display="flex" alignItems="center" gap={1}>
        <CreditCardIcon />
        <Typography>Card</Typography>
      </Box>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Card number"
        sx={{ width: 200 }}
        type="number"
        value={card}
        onChange={(e) => setCard(Number(e.target.value))}
      />
    </Box>
  );
};

export default CardInput;
