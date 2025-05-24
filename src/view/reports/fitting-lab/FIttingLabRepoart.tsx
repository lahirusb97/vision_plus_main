import React from "react";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Divider,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import useGetReportFittingStatus from "../../../hooks/useGetReportFittingStatus";
import { TypeFittingStatus } from "../../../model/StaticTypeModels";
import { CheckinInvoiceModel } from "../../../model/CheckinInvoiceModel";
import CustomerPagination from "../../../components/CustomPagination";
import { progressStatus } from "../../../utils/progressState";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { formatFittingStatus } from "../../../utils/formatFittingStatus";
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";

// Fitting status dropdown options
const FITTING_STATUS_OPTIONS: {
  label: string;
  value: TypeFittingStatus | null;
}[] = [
  { label: "All", value: null },
  { label: "Fitting OK", value: "fitting_ok" },
  { label: "Not Fitting", value: "not_fitting" },
  { label: "Damage", value: "damage" },
];

export default function FIttingLabRepoart() {
  const {
    reportFittingStatusList,
    reportFittingStatusListLoading,
    reportFittingStatusListError,
    reportFittingStatusLimit,
    reportFittingStatusListTotalCount,
    reportFittingStatusListPageNavigation,
    reportFittingStatusListChangePageSize,
    reportFittingStatusListSearch,
  } = useGetReportFittingStatus();

  // State for filters
  const [statusFilter, setStatusFilter] =
    React.useState<TypeFittingStatus | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

  // Apply filters on change
  React.useEffect(() => {
    reportFittingStatusListSearch({
      page: 1,
      page_size: reportFittingStatusLimit,
      fitting_status: statusFilter,
      date: selectedDate ? selectedDate.format("YYYY-MM-DD") : null,
    });
    // eslint-disable-next-line
  }, [statusFilter, selectedDate]);

  // Clear filters handler
  const handleClearFilters = () => {
    setStatusFilter(null);
    setSelectedDate(null);
    reportFittingStatusListSearch({
      page: 1,
      page_size: reportFittingStatusLimit,
      fitting_status: null,
      date: null,
    });
  };

  // Summary counts
  const {
    damage_count,
    fitting_ok_count,
    fitting_not_ok_count,
    total_stock_lens_orders,
    total_non_stock_lens_orders,
  } = reportFittingStatusList.results;

  // Orders for this page
  const orders: CheckinInvoiceModel[] =
    reportFittingStatusList.results.orders || [];

  return (
    <Box sx={{ p: { xs: 0, md: 2 } }}>
      {/* Filter Controls & Summary */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Stack direction="row" spacing={2}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Fitting Status</InputLabel>
              <Select
                value={statusFilter ?? ""}
                label="Fitting Status"
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                      ? (e.target.value as TypeFittingStatus)
                      : null
                  )
                }
              >
                {FITTING_STATUS_OPTIONS.map((option) => (
                  <MenuItem
                    key={option.value ?? "all"}
                    value={option.value ?? ""}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={setSelectedDate}
                slotProps={{ textField: { size: "small", fullWidth: true } }}
                maxDate={dayjs()}
              />
            </LocalizationProvider>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearFilters}
              sx={{ ml: 1, minWidth: 120 }}
            >
              Clear Filters
            </Button>
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            sx={{ mt: { xs: 2, sm: 0 }, pt: 1 }}
          >
            <Typography variant="subtitle2">
              <b>Fitting OK:</b> {fitting_ok_count}
            </Typography>
            <Typography variant="subtitle2">
              <b>Not Fitting:</b> {fitting_not_ok_count}
            </Typography>
            <Typography variant="subtitle2">
              <b>Damage:</b> {damage_count}
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <Typography variant="subtitle2">
              <b>Stock Lens Orders:</b> {total_stock_lens_orders}
            </Typography>
            <Typography variant="subtitle2">
              <b>Non-Stock Lens Orders:</b> {total_non_stock_lens_orders}
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      {/* Loading, Error, Empty State */}
      {reportFittingStatusListLoading && (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )}
      {reportFittingStatusListError && (
        <Alert severity="error">
          Failed to load report data. Please try again.
        </Alert>
      )}

      {/* Table */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Invoice No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell align="center">Fitting Status</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="center">Progress Status</TableCell>
              {/* Add more columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {!reportFittingStatusListLoading && orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
            {orders.map((order) => (
              <TableRow key={order.invoice_number}>
                <TableCell>{order.invoice_number}</TableCell>
                <TableCell>
                  {formatDateTimeByType(order.invoice_date, "both")}
                </TableCell>
                <TableCell>{order.customer ?? "-"}</TableCell>
                <TableCell align="center">
                  {formatFittingStatus(order.fitting_status)}
                </TableCell>
                <TableCell align="right">
                  {numberWithCommas(order.total_price)}
                </TableCell>
                <TableCell align="center">
                  {progressStatus(order.progress_status)}
                </TableCell>
                {/* Add more cells as needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CustomerPagination
          totalCount={reportFittingStatusListTotalCount}
          handlePageNavigation={reportFittingStatusListPageNavigation}
          changePageSize={reportFittingStatusListChangePageSize}
          page_size={reportFittingStatusLimit}
        />
      </TableContainer>
    </Box>
  );
}
