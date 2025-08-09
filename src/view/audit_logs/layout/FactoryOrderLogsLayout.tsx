import { Outlet } from "react-router";
import { Box, Stack } from "@mui/material";
import NavigationTab from "../../../components/common/NavigationTab";
import { useState } from "react";
import DateRangePickerManual from "../../../components/common/DateRangePickerManual";

import dayjs, { Dayjs } from "dayjs"; // Import 'dayjs' for creating Dayjs objects
export interface LogsDateRangePickerManualState {
  start_date: Dayjs | null;
  end_date: Dayjs | null;
}
export default function FactoryOrderLogsLayout() {
  const [dateRange, setDateRange] = useState<LogsDateRangePickerManualState>({
    start_date: dayjs(), // or null
    end_date: dayjs().add(1, "M"),
  });

  const reportTabs = [
    {
      label: "Order Refund",
      path: "/logs/orders/refund",
    },
    {
      label: "Order Deactivate",
      path: "/logs/orders",
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
