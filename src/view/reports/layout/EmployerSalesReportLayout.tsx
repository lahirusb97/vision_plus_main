import { Outlet } from "react-router";
import { Box, Stack } from "@mui/material";
import NavigationTab from "../../../components/common/NavigationTab";
import { useState } from "react";
import DateRangePickerManual from "../../../components/common/DateRangePickerManual";

import dayjs, { Dayjs } from "dayjs"; // Import 'dayjs' for creating Dayjs objects
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import useGetUsers from "../../../hooks/useGetUsers";
export interface EmployerReportFilterParams {
  start_date: Dayjs | null;
  end_date: Dayjs | null;
  user_id: number | null;
}
export default function EmployerSalesReportLayout() {
  const { users, usersLoading } = useGetUsers();
  const [filterParams, setFilterParams] = useState<EmployerReportFilterParams>({
    start_date: dayjs(), // or null
    end_date: dayjs().add(1, "M"),
    user_id: null,
  });

  const reportTabs = [
    {
      label: "Employer Sales History",
      path: "/reports/employer-history",
    },
    {
      label: "Glass Sender Report",
      path: "/reports/employer-history/glass-sender",
    },
  ];

  return (
    <Box>
      <NavigationTab tabsList={reportTabs} />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        gap={1}
      >
        <DateRangePickerManual
          value={{
            start_date: filterParams.start_date,
            end_date: filterParams.end_date,
          }}
          onChange={(range) =>
            setFilterParams((prev) => ({ ...prev, ...range }))
          }
        />
        <Box sx={{ width: "200px" }}>
          <AutocompleteInputField
            options={
              users?.map((user) => ({ id: user.id, name: user.username })) || []
            }
            loading={usersLoading}
            labelName={"Select User"}
            defaultId={undefined}
            onChange={(id) =>
              setFilterParams((prev) => ({ ...prev, user_id: id }))
            }
          />
        </Box>
      </Stack>
      <Box>
        <Outlet context={{ ...filterParams }} />
      </Box>
    </Box>
  );
}
