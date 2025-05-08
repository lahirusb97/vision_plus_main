import { Edit } from "@mui/icons-material";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CustomerPagination from "./CustomPagination";
import { ExpenseItem } from "../model/ExpenceModel";

interface ExpensesTableProps {
  data: ExpenseItem[];
  loading: boolean;
  accountDate: string;
}

export const ExpensesTable = ({
  data,
  loading,
  accountDate,
}: ExpensesTableProps) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1); // Note: CustomPagination uses 1-based indexing
  const [pageSize, setPageSize] = useState(10);

  // Format time from ISO string to readable format
  const formatTime = (isoString: string) => {
    return dayjs(isoString).format("h:mm A");
  };
  const paginatedExpenses = data.slice(
    (page - 1) * pageSize, // Adjust for 1-based indexing
    (page - 1) * pageSize + pageSize
  );
  const handlePageNavigation = (newPage: number) => {
    setPage(newPage);
  };

  // Handle page size change
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };
  useEffect(() => {
    setPage(1);
  }, [accountDate]);
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "orange" }}>
            <TableCell>action</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Main Category</TableCell>
            <TableCell>Sub Category</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Amount (Rs.)</TableCell>
            <TableCell>Paid From</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index}>
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <TableCell key={i}>
                        <Skeleton variant="text" width="100%" />
                      </TableCell>
                    ))}
                </TableRow>
              ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No expenses data available
              </TableCell>
            </TableRow>
          ) : (
            paginatedExpenses.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      const params = new URLSearchParams({
                        created_at: item.created_at,
                        main_category_name: item.main_category_name,
                        sub_category_name: item.sub_category_name,
                        note: item.note,
                        amount: item.amount,
                      }).toString();
                      navigate(`/account/expence/update/${item.id}/?${params}`);
                    }}
                    size="small"
                  >
                    <Edit sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </TableCell>
                <TableCell>{formatTime(item.created_at)}</TableCell>
                <TableCell>{item.main_category_name}</TableCell>
                <TableCell>{item.sub_category_name}</TableCell>
                <TableCell>{item.note}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>
                  {item.paid_from_safe ? "Safe" : "Cashier"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CustomerPagination
        totalCount={data.length}
        handlePageNavigation={handlePageNavigation}
        changePageSize={handlePageSizeChange}
        page_size={pageSize}
      />
    </TableContainer>
  );
};
