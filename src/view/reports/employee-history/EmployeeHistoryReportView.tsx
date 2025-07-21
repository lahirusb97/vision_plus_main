import React from "react";
import useGetEmpHistoryReports from "../../../hooks/report/useGetEmpHistoryReports";
import useGetBranches from "../../../hooks/useGetBranches";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { LENS_AND_FRAME_STORE_ID } from "../../../data/staticVariables";
import EmployeeHistoryReportTable from "./EmployeeHistoryReportTable";

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

  // Local state for filters
  const [startDate, setStartDate] = React.useState<dayjs.Dayjs | null>(
    dayjs().subtract(30, "day")
  );
  const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(dayjs());
  const [employeeCode, setEmployeeCode] = React.useState<string | null>(null);
  const [branchId, setBranchId] = React.useState<number | null>(null);

  // For search button
  const [pending, setPending] = React.useState(false);

  const handleSearch = () => {
    setPending(true);
    setEmpHistoryReportParamsData({
      branch_id: branchId,
      start_date: startDate?.format("YYYY-MM-DD") || "",
      end_date: endDate?.format("YYYY-MM-DD") || "",
      employee_code: employeeCode,
    });
    // Simulate slight delay for better UX
    setTimeout(() => setPending(false), 500);
  };

  return (
    <Card
      elevation={3}
      sx={{ maxWidth: 1200, margin: "32px auto", borderRadius: 3 }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Employee History Report
        </Typography>
        <Divider sx={{ mb: 2 }} />
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
          <AutocompleteInputField
            options={[
              { id: null, name: "All Branches" },
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
            defaultId={branchId ?? undefined}
            onChange={setBranchId}
          />
          <TextField
            label="Employee Code"
            value={employeeCode ?? ""}
            onChange={(e) => setEmployeeCode(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={pending || empHistoryReportLoading}
            sx={{ minWidth: 120, height: 40 }}
          >
            {pending || empHistoryReportLoading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Search"
            )}
          </Button>
        </Stack>
        {empHistoryReportError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load report. Please try again.
          </Alert>
        )}
        <div style={{ minHeight: 300, position: "relative" }}>
          {empHistoryReportLoading ? (
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
            <EmployeeHistoryReportTable data={empHistoryReportData} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
