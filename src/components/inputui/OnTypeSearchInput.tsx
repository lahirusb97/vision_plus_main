import { TextField, InputAdornment } from "@mui/material";
import { useState, useMemo, useCallback } from "react";
import debounce from "lodash/debounce";

interface CustomerSearchProps {
  onSearch: (searchTerm: string) => void;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  startIcon: React.ReactNode;
}

const OnTypeSearchInput = ({
  onSearch,
  label,
  value,
  onChange,
  required = false,
  startIcon,
}: CustomerSearchProps) => {


  // Create debounced function only once
  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        onSearch(val);
      }, 500), // wait 500ms after typing stops
    [onSearch]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      debouncedSearch(value);
      onChange(value);
    },
    [debouncedSearch]
  );
  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      margin="normal"
      required={required}
      size="small"
      value={value}
      onChange={handleChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
        },
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default OnTypeSearchInput;
