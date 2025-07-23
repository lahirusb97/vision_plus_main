import React from "react";
import useGetPaymentMethodReport from "../../../hooks/report/useGetPaymentMethodReport";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack, Button, CircularProgress, Typography } from "@mui/material";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import dayjs from "dayjs";
import { BarChart } from "@mui/x-charts/BarChart";
export default function PaymentSummaryReport() {
  const [startDate, setStartDate] = React.useState<dayjs.Dayjs | null>(
    dayjs().subtract(30, "day")
  );
  const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(dayjs());

  const {
    paymentMethodReportData,
    paymentMethodReportLoading,
    paymentMethodReportSummary,
    setPaymentMethodReportParamsData,
  } = useGetPaymentMethodReport();

  const handleSearch = () => {
    setPaymentMethodReportParamsData({
      start_date: startDate?.format("YYYY-MM-DD") || "",
      end_date: endDate?.format("YYYY-MM-DD") || "",
    });
  };
  const cashData = paymentMethodReportData.map((item) => item.total_cash);
  const cardData = paymentMethodReportData.map((item) => item.total_card);
  const onlineData = paymentMethodReportData.map(
    (item) => item.total_online_transfer
  );
  console.log(cashData);
  console.log(cardData);
  console.log(onlineData);
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = paymentMethodReportData.map((item) => item.branch_name);
  return (
    <div>
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
          disabled={paymentMethodReportLoading}
          sx={{ minWidth: 120, height: 40 }}
        >
          {paymentMethodReportLoading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Search"
          )}
        </Button>
      </Stack>
      
      <Typography variant="h6">
        Grand Total Payments: {numberWithCommas(paymentMethodReportSummary)}
      </Typography>
      <BarChart
        height={300}
        series={[
          { data: cashData, label: "Cash", id: "cashId" },
          { data: cardData, label: "Card", id: "cardId" },
          { data: onlineData, label: "Online Transfer", id: "onlineId" },
        ]}
        xAxis={[{ data: xLabels }]}
        yAxis={[{ width: 50 }]}
      />
    </div>
  );
}
