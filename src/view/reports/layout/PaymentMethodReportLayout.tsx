import { Outlet } from "react-router";
import { Box, Stack } from "@mui/material";
import NavigationTab from "../../../components/common/NavigationTab";
import { useState } from "react";
import DateRangePickerManual from "../../../components/common/DateRangePickerManual";

import dayjs from "dayjs"; // Import 'dayjs' for creating Dayjs objects
import { DateRangeInputModel } from "../../../model/DateRangeInputModel";

export default function PaymentMethodReportLayout() {
  const [dateRange, setDateRange] = useState<DateRangeInputModel>({
    start_date: dayjs(), // or null
    end_date: dayjs(),
  });

  const reportTabs = [
    { label: "Payment Method", path: "/reports/payment-method" },
    {
      label: "Payment Method Chart",
      path: "/reports/payment-method/chart",
    },
  ];

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <NavigationTab tabsList={reportTabs} />
        <DateRangePickerManual
          value={{
            start_date: dateRange.start_date,
            end_date: dateRange.end_date,
          }}
          onChange={(range) => setDateRange((prev) => ({ ...prev, ...range }))}
        />
      </Stack>
      <Box>
        <Outlet context={{ ...dateRange }} />
      </Box>
    </Box>
  );
}
