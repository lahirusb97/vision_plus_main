import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";

export interface ExpenseItem {
  id: number;
  created_at: string;
  main_category_name: string;
  sub_category_name: string;
  amount: string;
  note: string;
}

interface ExpenseTableProps {
  expenses: ExpenseItem[];
}

export default function ExpenseTable({ expenses }: ExpenseTableProps) {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        Expense Items
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Date</strong>
            </TableCell>
            <TableCell>
              <strong>Main Category</strong>
            </TableCell>
            <TableCell>
              <strong>Sub Category</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Amount</strong>
            </TableCell>
            <TableCell>
              <strong>Note</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>
                {formatDateTimeByType(expense.created_at, "both")}
              </TableCell>
              <TableCell>{expense.main_category_name}</TableCell>
              <TableCell>{expense.sub_category_name}</TableCell>
              <TableCell align="right">
                {parseFloat(expense.amount).toFixed(2)}
              </TableCell>
              <TableCell>{expense.note || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
