import { useState, useEffect, useMemo } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { BankAccountModel } from "../../model/BankAccountModel";

// Define the option type

// Define the props type for the component
interface AutocompleteInputFieldProps {
  options: BankAccountModel[];
  onChange: (selectedId: number | null) => void;
  loading: boolean;
  labelName: string;
  defaultId?: number | null;
}

const BankAutocomplete: React.FC<AutocompleteInputFieldProps> = ({
  options,
  onChange,
  loading,
  labelName,
  defaultId,
}) => {
  const [selectedOption, setSelectedOption] = useState<BankAccountModel | null>(
    null
  );

  const defaultOption = useMemo(() => {
    if (!defaultId) return null;
    return options.find((option) => option.id === defaultId) || null;
  }, [defaultId, options]);
  // Set the default option based on the passed id
  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: BankAccountModel | null
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
      getOptionLabel={(option) => option.bank_name || ""} // Show the name in the dropdown
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

export default BankAutocomplete;
