import React from "react";
import useGetEmpHistoryReports from "../../../hooks/report/useGetEmpHistoryReports";
import useGetBranches from "../../../hooks/useGetBranches";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { LENS_AND_FRAME_STORE_ID } from "../../../data/staticVariables";
export default function EmployeeHistoryReportView() {
  const {
    empHistoryReportData,
    empHistoryReportSummary,
    empHistoryReportLoading,
    empHistoryReportError,
    setEmpHistoryReportParamsData,
    empHistoryReportListRefresh,
  } = useGetEmpHistoryReports();
  const { branches, branchesLoading } = useGetBranches();
  const [startDate, setStartDate] = React.useState<dayjs.Dayjs | null>(
    dayjs().subtract(30, "day")
  );
  const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(dayjs());
  const [employeeCode, setEmployeeCode] = React.useState<string | null>(null);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="From Date"
          format="YYYY-MM-DD"
          value={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          label="To Date"
          format="YYYY-MM-DD"
          value={endDate}
          onChange={(date) => setEndDate(date)}
        />
      </LocalizationProvider>
      <AutocompleteInputField
        options={[
          { id: null, name: "All Branches" }, // or "All Branches" or any label you want
          ...(branches
            ?.filter(
              (branch) => branch.id !== parseInt(LENS_AND_FRAME_STORE_ID)
            )
            .map((branch) => ({
              id: branch.id,
              name: branch.branch_name,
            })) || []),
        ]}
        loading={branchesLoading}
        labelName="Branch"
        defaultId={undefined}
        onChange={(id) => {
          setEmpHistoryReportParamsData({
            branch_id: id,
            start_date: startDate?.format("YYYY-MM-DD") || "",
            end_date: endDate?.format("YYYY-MM-DD") || "",
            employee_code: employeeCode,
          });
        }}
      />
      <TextField
        label="Employee Code"
        value={employeeCode}
        onChange={(e) => setEmployeeCode(e.target.value)}
        size="small"
        sx={{ minWidth: 120 }}
      />
    </div>
  );
}
