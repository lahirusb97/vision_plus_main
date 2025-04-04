// ChannelTable.tsx
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

interface ChannelTableProps {
  data: Array<{
    channel_no: number;
    amount_cash: number;
    amount_credit_card: number;
    amount_online: number;
    total_paid: number;
    balance: number;
  }>;
  loading: boolean;
}

export const ChannelPaymentTable = ({ data, loading }: ChannelTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "orange" }}>
            <TableCell>Channel No</TableCell>
            <TableCell>Cash</TableCell>
            <TableCell>Card</TableCell>
            <TableCell>Online</TableCell>
            <TableCell>Total Paid</TableCell>
            <TableCell>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index}>
                  {Array(6)
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
              <TableCell colSpan={6} align="center">
                No channel data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.channel_no}</TableCell>
                <TableCell>{row.amount_cash}</TableCell>
                <TableCell>{row.amount_credit_card}</TableCell>
                <TableCell>{row.amount_online}</TableCell>
                <TableCell>{row.total_paid}</TableCell>
                <TableCell>{row.balance}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
