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
import { useEffect, useState } from "react";
import CustomerPagination from "../components/CustomPagination";

interface InvoiceTableProps {
  accountDate: string;
  data: Array<{
    invoice_number: string;
    total_online_payment: number;
    total_credit_card_payment: number;
    total_cash_payment: number;
    total_payment: number;
  }>;
  loading: boolean;
}

export const InvoicePaymentTable = ({
  data,
  loading,
  accountDate,
}: InvoiceTableProps) => {
  const [page, setPage] = useState(1); // Note: CustomPagination uses 1-based indexing
  const [pageSize, setPageSize] = useState(10);
  const paginatedInvoice = data.slice(
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
    handlePageSizeChange(10);
    console.log(accountDate);
  }, [accountDate]);
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
            paginatedInvoice.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.invoice_number}</TableCell>
                <TableCell>{row.total_online_payment}</TableCell>
                <TableCell>{row.total_credit_card_payment}</TableCell>
                <TableCell>{row.total_cash_payment}</TableCell>
                <TableCell>{row.total_payment}</TableCell>
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
