import React, { useEffect, useState } from "react";
import useGetExternalLenseOrderList from "../../../hooks/useGetExternalLenseOrderList";
import dayjs, { Dayjs } from "dayjs";
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
import DateRangePickerManual from "../../../components/common/DateRangePickerManual";
import InvoiceSearchInput from "../../../components/common/InvoiceSearchInput";
import ExternalOrderArrivalStatusCheckBoxTable from "../../../components/inputui/ExternalOrderArrivalStatusCheckBoxTable";
import CustomerPagination from "../../../components/CustomPagination";
interface DateRangePickerManualState {
  start_date: Dayjs | null;
  end_date: Dayjs | null;
}
export default function LenseArrival() {
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
  const [arrivalStatus, setArrivalStatus] = useState<
    "received" | "not_received"
  >("not_received");
  const [dateRange, setDateRange] = useState<DateRangePickerManualState>({
      start_date: dayjs().subtract(1, "M"), // or null
      end_date: dayjs(),
  });
  const handleChange = (event: SelectChangeEvent) => {
    setArrivalStatus(event.target.value as "received" | "not_received");
  };
  useEffect(() => {
    externalLenseInvoiceListSearch({
      arrival_status: arrivalStatus,
      whatsapp_sent: "sent",
      search: null,
      invoice_number: null,
      start_date: dateRange.start_date?.format("YYYY-MM-DD") || null,
      end_date: dateRange.end_date?.format("YYYY-MM-DD") || null,
      page_size: 10,
      page: 1,
    });
  }, [dateRange, arrivalStatus]);
  // Persist selections in localStorage/sessionStorage
  const invoiceSearch = (invoice_num: string) => {
    externalLenseInvoiceListSearch({
      arrival_status: null,
      search: null,
      invoice_number: invoice_num,
      whatsapp_sent: "sent",
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
              Filter By Arrival Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={arrivalStatus || ""}
              label=" Filter By Arrival Status"
              onChange={handleChange}
            >
              <MenuItem value={"received"}>Received</MenuItem>
              <MenuItem value={"not_received"}>Not Received</MenuItem>
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
          <ExternalOrderArrivalStatusCheckBoxTable
            invoiceListRefres={externalLenseInvoiceListRefres}
            invoiceList={externalLenseInvoiceList}
            loading={externalLenseInvoiceListLoading}
          />
        </Box>
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
