import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SearchIcon from "@mui/icons-material/Search";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { getBranchName } from "../utils/branchName";
import { CheckinInvoiceListParams } from "./useGetCheckinInvoiceList";

// Define Zod schema for form validation
const searchSchema = z.object({
  searchTerm: z.string().min(1, "Search term is required"),
  searchOption: z.enum(["invoice_number", "mobile", "nic"]),
});

type SearchFormData = z.infer<typeof searchSchema>;
interface FactoryInvoiceSearchProps {
  invoiceListSearch: (filterParams: CheckinInvoiceListParams) => void;
}
export default function FactoryInvoiceSearch({
  invoiceListSearch,
}: FactoryInvoiceSearchProps) {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: "searchOption",
      searchOption: "invoice_number",
    },
  });

  const onSubmit = (data: SearchFormData) => {
    const filterParams: CheckinInvoiceListParams = {
      page_size: 10,
      page: 1,
      search: null,
      invoice_number: null,
      mobile: null,
      nic: null,
      progress_status: null,
      [data.searchOption]: data.searchTerm, // dynamically assign value
    };
    invoiceListSearch(filterParams);
  };
  useEffect(() => {
    if (watch("searchOption") === "invoice_number") {
      setValue("searchTerm", getBranchName());
    } else {
      setValue("searchTerm", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("searchOption")]);

  function formatSearchOption(option: string): string {
    return option
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
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
        }}
      >
        {/* Search Input */}
        <Box>
          <TextField
            sx={{ width: 220 }}
            size="small"
            label={`Enter Patient ${formatSearchOption(watch("searchOption"))}`}
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
