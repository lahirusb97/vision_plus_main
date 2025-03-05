import { useState, useEffect } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

// Define the option type
export interface Option {
  id: number;
  name: string;
}

// Define the props type for the component
interface AutocompleteInputFieldProps {
  options: Option[];
  onChange: (selectedId: Option | null) => void;
  loading: boolean;
  labelName: string;
  defaultId?: number | null;
}

const DropdownInputReturnWIthName: React.FC<AutocompleteInputFieldProps> = ({
  options,
  onChange,
  loading,
  labelName,
  defaultId,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  // Set the default option based on the passed id
  useEffect(() => {
    if (defaultId) {
      const defaultOption = options.find((option) => option.id === defaultId);
      setSelectedOption(defaultOption || null);
    } else {
      setSelectedOption(null);
    }
  }, [defaultId, options]);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Option | null
  ) => {
    setSelectedOption(newValue);
    onChange(newValue ? newValue : null); // Pass only the selected option's id to parent
  };

  return (
    <Autocomplete
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
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={24} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default DropdownInputReturnWIthName;
