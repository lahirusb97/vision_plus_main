import React from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
interface BranchModel {
  label: string | null;
  branch_name: string;
 
}
const Datepicker = ({ label, value, onChange }):BranchModel => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        format="DD/MM/YYYY"
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  );
};

export default Datepicker;