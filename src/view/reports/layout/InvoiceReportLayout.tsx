import { Outlet } from "react-router";
import { Box, Stack } from "@mui/material";
import NavigationTab from "../../../components/common/NavigationTab";
import { useState } from "react";
import DateRangePickerManual from "../../../components/common/DateRangePickerManual";
import dayjs, { Dayjs } from "dayjs"; // Import 'dayjs' for creating Dayjs objects
export interface InvoiceReportContext {
  start_date: Dayjs | null;
  end_date: Dayjs | null;
  user_id: number | null;
}
export default function InvoiceReportLayout() {
  // const { users, usersLoading } = useGetUsers();
  const [filterParams, setFilterParams] = useState<InvoiceReportContext>({
    start_date: dayjs(), // or null
    end_date: dayjs().add(1, "M"),
    user_id: null,
  });

  const reportTabs = [
    {
      label: "Factory Invoice Report",
      path: "/reports/invoice/factory",
    },
    {
      label: "Normal Invoice Report",
      path: "/reports/invoice/normal",
    },
    {
      label: "Soldering Invoice Report",
      path: "/reports/invoice/soldering",
    },
    {
      label: "Channel Invoice Report",
      path: "/reports/invoice/channel",
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
        {/* <Box sx={{ width: "200px" }}>
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
        </Box> */}
      </Stack>
      <Box>
        <Outlet context={{ ...filterParams }} />
      </Box>
    </Box>
  );
}
