import React from "react";
import { TextField, Box, Radio, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const CashInput: React.FC = ({ card, setcash }) => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Radio />
      <Box display="flex" alignItems="center" gap={1}>
        <AttachMoneyIcon />
        <Typography>Cash</Typography>
      </Box>

      <TextField
        variant="outlined"
        size="small"
        type="number"
        placeholder="Enter amount"
        sx={{ width: 200 }}
        value={card}
        onChange={(e) => setcash(Number(e.target.value))}
      />
    </Box>
  );
};

export default CashInput;
