import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TableContainer,
} from "@mui/material";
import { useEffect, useState } from "react";

import CustomerPagination from "../../components/CustomPagination";
import useGetExternalLenseOrderList from "../../hooks/useGetExternalLenseOrderList";
import { TypeWhatappMSG } from "../../model/StaticTypeModels";
import ExternalOrderCheckBoxTable from "../../components/inputui/ExternalOrderCheckBoxTable";
import dayjs, { Dayjs } from "dayjs"; // Import 'dayjs' for creating Dayjs objects
import DateRangePickerManual from "../../components/common/DateRangePickerManual";
import InvoiceSearchInput from "../../components/common/InvoiceSearchInput";
export interface DateRangePickerManualState {
  start_date: Dayjs | null;
  end_date: Dayjs | null;
}
export default function JobProgress() {
  const {
    externalLenseInvoiceLimit,
    externalLenseInvoiceList,
    externalLenseInvoiceListLoading,
    externalLenseInvoiceListTotalCount,
    externalLenseInvoiceListPageNavigation,
    externalLenseInvoiceListChangePageSize,
    externalLenseInvoiceListSearch,
    externalLenseInvoiceListRefres,
  } = useGetExternalLenseOrderList();

  const [orderProgress, setOrderProgress] = useState("not_sent");
  const [dateRange, setDateRange] = useState<DateRangePickerManualState>({
    start_date: dayjs().subtract(1, "M"), // or null
    end_date: dayjs(),
  });
  const handleChange = (event: SelectChangeEvent) => {
    setOrderProgress(event.target.value as string);
  };

  useEffect(() => {
    externalLenseInvoiceListSearch({
      arrival_status: null,
      whatsapp_sent: orderProgress as TypeWhatappMSG,
      search: null,
      invoice_number: null,
      start_date: dateRange.start_date?.format("YYYY-MM-DD") || null,
      end_date: dateRange.end_date?.format("YYYY-MM-DD") || null,
      page_size: 10,
      page: 1,
    });
  }, [dateRange, orderProgress]);
  // Persist selections in localStorage/sessionStorage
  const invoiceSearch = (invoice_num: string) => {
    externalLenseInvoiceListSearch({
      arrival_status: null,
      whatsapp_sent: null,
      search: null,
      invoice_number: invoice_num,
      start_date: dateRange.start_date?.format("YYYY-MM-DD") || null,
      end_date: dateRange.end_date?.format("YYYY-MM-DD") || null,
      page_size: 10,
      page: 1,
    });
  };
  return (
    <Box sx={{ display: "flex" }}>
      <TableContainer sx={{ mt: 2 }} elevation={3} component={Paper}>
        <Box
          sx={{
            display: "flex",
            m: 1,
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <InvoiceSearchInput
            searchFn={invoiceSearch}
            placeholder="Invoice Number"
          />
          <FormControl size="small" sx={{ minWidth: 250 }}>
            <InputLabel id="demo-simple-select-label">
              {" "}
              Filter By Whatapp MSG
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderProgress}
              label=" Filter By Order Progress"
              onChange={handleChange}
            >
              <MenuItem value={"sent"}>Message Sent</MenuItem>
              <MenuItem value={"not_sent"}>Message Not Sent</MenuItem>
            </Select>
          </FormControl>
          <DateRangePickerManual
            value={{
              start_date: dateRange.start_date,
              end_date: dateRange.end_date,
            }}
            onChange={(range) =>
              setDateRange((prev) => ({ ...prev, ...range }))
            }
          />
          {/* <ProgressStagesColors /> */}
        </Box>
        <ExternalOrderCheckBoxTable
          invoiceListRefres={externalLenseInvoiceListRefres}
          invoiceList={externalLenseInvoiceList}
          loading={externalLenseInvoiceListLoading}
        />
        <CustomerPagination
          totalCount={externalLenseInvoiceListTotalCount}
          handlePageNavigation={externalLenseInvoiceListPageNavigation}
          changePageSize={externalLenseInvoiceListChangePageSize}
          page_size={externalLenseInvoiceLimit}
        />
      </TableContainer>
    </Box>
  );
}
