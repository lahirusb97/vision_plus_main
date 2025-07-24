import useGetPaymentMethodReport from "../../../hooks/report/useGetPaymentMethodReport";
import { Stack, Button, CircularProgress, Typography } from "@mui/material";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { BarChart } from "@mui/x-charts/BarChart";
import { useOutletContext } from "react-router";
import { DateRangeInputModel } from "../../../model/DateRangeInputModel";
export default function PaymentSummaryReport() {
  const { end_date, start_date } = useOutletContext<DateRangeInputModel>();

  const {
    paymentMethodReportData,
    paymentMethodReportLoading,
    paymentMethodReportSummary,
    setPaymentMethodReportParamsData,
  } = useGetPaymentMethodReport();

  const handleSearch = () => {
    setPaymentMethodReportParamsData({
      start_date: start_date?.format("YYYY-MM-DD") || "",
      end_date: end_date?.format("YYYY-MM-DD") || "",
    });
  };
  const cashData = paymentMethodReportData.map((item) => item.total_cash);
  const cardData = paymentMethodReportData.map((item) => item.total_card);
  const onlineData = paymentMethodReportData.map(
    (item) => item.total_online_transfer
  );

  const xLabels = paymentMethodReportData.map((item) => item.branch_name);
  return (
    <div>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        mb={3}
      >
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
