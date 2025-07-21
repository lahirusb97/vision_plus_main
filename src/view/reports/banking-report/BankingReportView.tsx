import React from "react";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Paper,
  Grid,
} from "@mui/material";
import useGetBankingReports from "../../../hooks/report/useGetBankingReports";
import BankingReportTable from "./BankingReportTable";
import { numberWithCommas } from "../../../utils/numberWithCommas";

export default function BankingReportView() {
  const {
    bankingReportData,
    bankingReportSummary,
    bankingReportLoading,
    bankingReportError,
    setBankingReportParamsData,
    bankingReportListRefresh,
  } = useGetBankingReports();

  // Local state for filters
  const [startDate, setStartDate] = React.useState<dayjs.Dayjs | null>(
    dayjs().subtract(30, "day")
  );
  const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(dayjs());

  // For search button
  const [pending, setPending] = React.useState(false);

  const handleSearch = () => {
    setPending(true);
    setBankingReportParamsData({
      start_date: startDate?.format("YYYY-MM-DD") || "",
      end_date: endDate?.format("YYYY-MM-DD") || "",
    });
    setTimeout(() => setPending(false), 500);
  };

  return (
    <Card
      elevation={3}
      sx={{ maxWidth: 1200, margin: "32px auto", borderRadius: 3 }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Banking Report
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* --- Summary Section --- */}
        <Paper
          elevation={1}
          sx={{
            mb: 3,
            p: 2,
            background: "#f8fafc",
            borderRadius: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Amount
              </Typography>
              <Typography variant="h6" color="primary">
                Rs - {numberWithCommas(bankingReportSummary.total_amount)}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Deposits
              </Typography>
              <Typography variant="h6">
                {bankingReportSummary.total_deposits}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Confirmed Deposits
              </Typography>
              <Typography variant="h6" color="success.main">
                {bankingReportSummary.confirmed_deposits}
              </Typography>
            </Grid>
            {/* <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Confirmed Amount
              </Typography>
              <Typography variant="h6" color="success.main">
                Rs - {numberWithCommas(bankingReportSummary.confirmed_amount)}
              </Typography>
            </Grid> */}
            {/* <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Pending Deposits
              </Typography>
              <Typography variant="h6" color="warning.main">
                {bankingReportSummary.pending_deposits}
              </Typography>
            </Grid> */}
            {/* <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Pending Amount
              </Typography>
              <Typography variant="h6" color="warning.main">
                {bankingReportSummary.pending_amount?.toLocaleString(
                  undefined,
                  { minimumFractionDigits: 2 }
                )}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Confirmation %
              </Typography>
              <Typography variant="h6" color="info.main">
                {bankingReportSummary.confirmation_percentage}%
              </Typography>
            </Grid> */}
          </Grid>
        </Paper>
        {/* --- End Summary Section --- */}

        {/* --- Filters --- */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          mb={3}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From Date"
              format="YYYY-MM-DD"
              value={startDate}
              onChange={setStartDate}
              slotProps={{
                textField: { size: "small", sx: { minWidth: 150 } },
              }}
            />
            <DatePicker
              label="To Date"
              format="YYYY-MM-DD"
              value={endDate}
              onChange={setEndDate}
              slotProps={{
                textField: { size: "small", sx: { minWidth: 150 } },
              }}
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={pending || bankingReportLoading}
            sx={{ minWidth: 120, height: 40 }}
          >
            {pending || bankingReportLoading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Search"
            )}
          </Button>
        </Stack>
        {/* --- End Filters --- */}

        {bankingReportError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load report. Please try again.
          </Alert>
        )}
        <div style={{ minHeight: 300, position: "relative" }}>
          {bankingReportLoading ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ height: 300 }}
            >
              <CircularProgress />
              <Typography variant="body2" color="text.secondary" mt={2}>
                Loading report...
              </Typography>
            </Stack>
          ) : (
            <BankingReportTable data={bankingReportData} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
