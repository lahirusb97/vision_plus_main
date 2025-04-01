import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SearchIcon from "@mui/icons-material/Search";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Box, Button, TextField, Typography } from "@mui/material";

// Define Zod schema for form validation
const searchSchema = z.object({
  searchTerm: z.string().min(1, "Search term is required"),
  searchOption: z.enum(["invoice_number", "mobile", "nic"]),
});

type SearchFormData = z.infer<typeof searchSchema>;

export default function FactoryInvoiceSearch({ handleSearch }) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: "",
      searchOption: "invoice_number",
    },
  });

  const onSubmit = (data: SearchFormData) => {
    handleSearch(data.searchTerm);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          p: 1,
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: 2,
        }}
      >
        {/* Search Input */}
        <Box>
          <TextField
            sx={{ width: 220 }}
            size="small"
            label="Search"
            error={!!errors.searchTerm}
            helperText={errors.searchTerm?.message}
            {...register("searchTerm")}
          />
        </Box>

        {/* Search Button */}
        <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
          Search
        </Button>

        {/* Radio Group (Horizontal) */}
        <FormControl>
          <Controller
            name="searchOption"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} row>
                <FormControlLabel
                  value="invoice_number"
                  control={<Radio size="small" />}
                  label="Invoice"
                />
                <FormControlLabel
                  value="mobile"
                  control={<Radio size="small" />}
                  label="Mobile"
                />
                <FormControlLabel
                  value="nic"
                  control={<Radio size="small" />}
                  label="NIC"
                />
              </RadioGroup>
            )}
          />
        </FormControl>
      </Box>
    </form>
  );
}
