import { useState, useEffect, useMemo } from "react";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

// Define the option type
export interface Option {
  id: number;
  name: string;
}

// Define the props type for the component
interface AutocompleteInputFieldProps {
  options: Option[];
  onChange: (selectedId: number | null) => void;
  loading: boolean;
  labelName: string;
  defaultId?: number | null;
}

const AutocompleteInputField: React.FC<AutocompleteInputFieldProps> = ({
  options,
  onChange,
  loading,
  labelName,
  defaultId,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const defaultOption = useMemo(() => {
    if (!defaultId) return null;
    return options.find((option) => option.id === defaultId) || null;
  }, [defaultId, options]);
  // Set the default option based on the passed id
  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption, defaultId]);

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: Option | null
  ) => {
    setSelectedOption(newValue);
    onChange(newValue ? newValue.id : null); // Pass only the selected option's id to parent
  };

  return (
    <Autocomplete
      size="small"
      fullWidth
      disabled={loading}
      value={selectedOption}
      onChange={handleChange}
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.name || ""} // Show the name in the dropdown
      isOptionEqualToValue={(option, value) => option.id === value?.id} // Compare by id
      renderInput={(params) => (
        <TextField
          {...params}
          label={labelName}
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={24} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          data-testid={`${labelName}_dropdown`}
        />
      )}
      renderOption={(props, option) => {
        // Destructure key from props
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { key, ...otherProps } = props;

        return (
          <li key={option.id} {...otherProps}>
            <Typography
              sx={{
                fontSize: "12px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {option.name}
            </Typography>
          </li>
        );
      }}
    />
  );
};

export default AutocompleteInputField;
