// ExpensesTable.tsx
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

interface ExpensesTableProps {
  data: Array<{
    time: string;
    mainCategory: string;
    subCategory: string;
    description: string;
    amount: string;
  }>;
  loading: boolean;
}

export const ExpensesTable = ({ data, loading }: ExpensesTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "orange" }}>
            <TableCell>Time</TableCell>
            <TableCell>Main Category</TableCell>
            <TableCell>Sub Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
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
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.mainCategory}</TableCell>
                <TableCell>{row.subCategory}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
