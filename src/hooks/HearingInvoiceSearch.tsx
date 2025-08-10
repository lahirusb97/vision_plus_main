import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SearchIcon from "@mui/icons-material/Search";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getBranchName } from "../utils/branchName";
import { HearingInvoiceListParams } from "./useGetHearingInvoiceList";
import dayjs, { Dayjs } from "dayjs";
import DateRangePickerManual from "../components/common/DateRangePickerManual";
import { RefreshCwIcon } from "lucide-react";
import { Search } from "@mui/icons-material";

// Define Zod schema for form validation
const searchSchema = z.object({
  searchTerm: z.string().min(1, "Search term is required"),
  searchOption: z.enum(["invoice_number", "mobile", "nic"]),
});

type SearchFormData = z.infer<typeof searchSchema>;
interface FactoryInvoiceSearchProps {
  invoiceListSearch: (filterParams: HearingInvoiceListParams) => void;
}
export default function HearingInvoiceSearch({
  invoiceListSearch,
}: FactoryInvoiceSearchProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [filterParams, setFilterParams] = useState<{
    start_date: Dayjs | null;
    end_date: Dayjs | null;
  }>({
    start_date: dayjs(), // or null
    end_date: dayjs(),
  });
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
    const params: HearingInvoiceListParams = {
      page_size: 10,
      page: 1,
      search: null,
      invoice_number: null,
      mobile: null,
      nic: null,
      start_date: null,
      end_date: null,
      [data.searchOption]: data.searchTerm, // dynamically assign value
    };
    invoiceListSearch(params);
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
    <form autoComplete="off">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "flex-start" },
          gap: 2,
          p: 1,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        {/* Search Input */}
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            size="small"
            label={`Enter Patient ${formatSearchOption(watch("searchOption"))}`}
            error={!!errors.searchTerm}
            helperText={errors.searchTerm?.message}
            {...register("searchTerm")}
          />
        </Box>

        {/* Search Button */}
        <Button
          type="submit"
          variant="contained"
          startIcon={<SearchIcon />}
          sx={{ alignSelf: { xs: "stretch", sm: "center" } }}
          onClick={handleSubmit(onSubmit)}
        >
          Search
        </Button>

        {/* Radio Group */}
        <FormControl>
          <Controller
            name="searchOption"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                row={!isSmallScreen}
                sx={{ justifyContent: "center" }}
              >
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
        <DateRangePickerManual
          value={{
            start_date: filterParams.start_date,
            end_date: filterParams.end_date,
          }}
          onChange={(range) =>
            setFilterParams((prev) => ({ ...prev, ...range }))
          }
        />
        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={() => {
            const params: HearingInvoiceListParams = {
              page_size: 10,
              page: 1,
              search: null,
              invoice_number: null,
              mobile: null,
              nic: null,
              start_date: filterParams.start_date?.format("YYYY-MM-DD") || null,
              end_date: filterParams.end_date?.format("YYYY-MM-DD") || null,
              [watch("searchOption")]: null,
            };
            invoiceListSearch(params);
          }}
        >
          Service Date
        </Button>
        <Button
          variant="outlined"
          startIcon={<RefreshCwIcon />}
          onClick={() => {
            setValue("searchTerm", "");
            setValue("searchOption", "invoice_number");
            setFilterParams({
              start_date: null,
              end_date: null,
            });
            invoiceListSearch({
              page_size: 10,
              page: 1,
              search: null,
              invoice_number: null,
              mobile: null,
              nic: null,
              start_date: null,
              end_date: null,
              [watch("searchOption")]: null,
            });
          }}
        >
          Reset
        </Button>
      </Box>
    </form>
  );
}
