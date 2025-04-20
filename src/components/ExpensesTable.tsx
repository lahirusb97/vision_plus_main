import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";

interface ExpenseItem {
  id: number;
  created_at: string;
  main_category_name: string;
  sub_category_name: string;
  amount: string;
  note: string;
}

interface ExpensesTableProps {
  data: ExpenseItem[];
  loading: boolean;
}

export const ExpensesTable = ({ data, loading }: ExpensesTableProps) => {
  // Format time from ISO string to readable format
  const formatTime = (isoString: string) => {
    return dayjs(isoString).format("h:mm A");
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "orange" }}>
            <TableCell>Time</TableCell>
            <TableCell>Main Category</TableCell>
            <TableCell>Sub Category</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Amount (Rs.)</TableCell>
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
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{formatTime(item.created_at)}</TableCell>
                <TableCell>{item.main_category_name}</TableCell>
                <TableCell>{item.sub_category_name}</TableCell>
                <TableCell>{item.note}</TableCell>
                <TableCell>{item.amount}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
