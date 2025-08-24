import { TextField, InputAdornment } from "@mui/material";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
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
  const debouncedSearchRef = useRef(
    debounce((val: string) => {
      onSearch(val);
    }, 500)
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSearchRef.current.cancel();
    };
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onChange(value);
      debouncedSearchRef.current(value);
    },
    [onChange]
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
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default OnTypeSearchInput;
