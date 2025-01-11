import React from 'react';
import { TextField, Box, Radio, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const CardInput: React.FC = () => {
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
      />
    </Box>
  );
};

export default CardInput;