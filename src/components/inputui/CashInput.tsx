import React from 'react';
import { TextField, Box, Radio, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const CashInput: React.FC = () => {
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
        placeholder="Enter amount"
        

        sx={{ width: 200 }}
      />
    </Box>
  );
};

export default CashInput;