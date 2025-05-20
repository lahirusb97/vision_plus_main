import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

export interface AutocompleteInputWrapperOption {
  id: number;
  name: string;
}

interface AutocompleteInputWrapperProps {
  options: AutocompleteInputWrapperOption[];
  value: AutocompleteInputWrapperOption | null;
  onChange: (option: AutocompleteInputWrapperOption | null) => void;
  loading: boolean;
  labelName: string;
}

const AutocompleteInputWrapper: React.FC<AutocompleteInputWrapperProps> = ({
  options,
  value,
  onChange,
  loading,
  labelName,
}) => (
  <Autocomplete
    size="small"
    fullWidth
    disabled={loading}
    value={value}
    onChange={(_event, newValue) => onChange(newValue)}
    options={options}
    loading={loading}
    getOptionLabel={(option) => option.name || ""}
    isOptionEqualToValue={(option, value) => option.id === value?.id}
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { key, ...otherProps } = props;
      return (
        <li key={option.id} {...otherProps}>
          <Typography
            sx={{
              fontSize: "1rem",
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

export default AutocompleteInputWrapper;
