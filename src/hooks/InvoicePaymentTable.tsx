// InvoiceTable.tsx
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

interface InvoiceTableProps {
  data: Array<{
    invoice_number: string;
    total_online_payment: number;
    total_credit_card_payment: number;
    total_cash_payment: number;
    total_payment: number;
  }>;
  loading: boolean;
}

export const InvoicePaymentTable = ({ data, loading }: InvoiceTableProps) => {
  const totalPayment = data.reduce((sum, item) => sum + item.total_payment, 0);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "orange" }}>
            <TableCell>Invoice No</TableCell>
            <TableCell>Online</TableCell>
            <TableCell>Card</TableCell>
            <TableCell>Cash</TableCell>
            <TableCell>Total</TableCell>
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
                No invoice data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.invoice_number}</TableCell>
                <TableCell>{row.total_online_payment}</TableCell>
                <TableCell>{row.total_credit_card_payment}</TableCell>
                <TableCell>{row.total_cash_payment}</TableCell>
                <TableCell>{row.total_payment}</TableCell>
              </TableRow>
            ))
          )}
          <TableRow>
            <TableCell colSpan={4} align="right">
              <strong>Total</strong>
            </TableCell>
            <TableCell>{totalPayment}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
