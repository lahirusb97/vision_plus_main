import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import useGetReportOtherIncome from "../../../hooks/useGetReportOtherIncome";
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import SingleDatePicker from "../../../hooks/SingleDatePicker";
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";
import { numberWithCommas } from "../../../utils/numberWithCommas";

export default function OtherIncomeIndex() {
  const navigate = useNavigate();

  const {
    otherIncomeReport,
    otherIncomeReportLoading,
    setOtherIncomeReportParamsData,
  } = useGetReportOtherIncome();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate
        ? selectedDate.format("YYYY-MM-DD")
        : "";
      setOtherIncomeReportParamsData({ date: formattedDate });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <Box sx={{ p: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Recived Other Incomes</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Button
          variant="contained"
          onClick={() => navigate("add_other_income")}
        >
          Add New Income
        </Button>
        <Button variant="outlined" onClick={() => navigate("manage")}>
          Manage Income Category
        </Button>
      </Box>
      <SingleDatePicker value={selectedDate} onChange={setSelectedDate} />
      {otherIncomeReportLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer sx={{ minWidth: 500 }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Actions</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {otherIncomeReport.length > 0 ? (
                otherIncomeReport.map((income) => (
                  <TableRow key={income.id}>
                    <TableCell align="left">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`${income.id}`)}
                      >
                        <Edit sx={{ fontSize: "1rem" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {formatDateTimeByType(income.date, "date")}
                    </TableCell>
                    <TableCell>{income.category_name}</TableCell>
                    <TableCell>{numberWithCommas(income.amount)}</TableCell>
                    <TableCell>{income.note}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No income found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
