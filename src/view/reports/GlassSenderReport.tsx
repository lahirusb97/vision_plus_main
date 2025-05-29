import React, { useEffect, useMemo } from "react";
import { useOutletContext } from "react-router";
import { EmployerReportContext } from "./layout/EmployerSalesReportLayout";
import useGetGlassSenderReport from "../../hooks/report/useGetGlassSenderReport";
import CustomerPagination from "../../components/CustomPagination";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

export default function GlassSenderReport() {
  const { end_date, start_date, user_id } =
    useOutletContext<EmployerReportContext>();

  const {
    glassSenderReportList,
    glassSenderReportListChangePageSize,
    glassSenderReportLimit,
    glassSenderReportListLoading,
    glassSenderReportListPageNavigation,
    glassSenderReportListTotalCount,
    glassSenderReportListSearch,
    glassSenderReportListError,
  } = useGetGlassSenderReport();

  useEffect(() => {
    glassSenderReportListSearch({
      start_date: start_date?.format("YYYY-MM-DD") || null,
      end_date: end_date?.format("YYYY-MM-DD") || null,
      user_id: user_id || null,
      invoice_number: null,
      page: 1,
      page_size: glassSenderReportLimit,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start_date, end_date, user_id]);

  // Memoize rows for performance
  const tableRows = useMemo(() => {
    if (glassSenderReportList.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={3} align="center">
            <Typography color="text.secondary">No data found.</Typography>
          </TableCell>
        </TableRow>
      );
    }
    return glassSenderReportList.map((order) => (
      <TableRow key={order.id}>
        <TableCell>{order.invoice_number}</TableCell>
        <TableCell>{order.issued_by_username ?? "N/A"}</TableCell>
        <TableCell>
          {order.issued_date
            ? new Date(order.issued_date).toLocaleString()
            : "Not Issued"}
        </TableCell>
      </TableRow>
    ));
  }, [glassSenderReportList]);

  return (
    <Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        {glassSenderReportListLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 4,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table size="small" aria-label="order lite table">
            <TableHead>
              <TableRow>
                <TableCell>Invoice Number</TableCell>
                <TableCell>Issued By</TableCell>
                <TableCell>Issued Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableRows}</TableBody>
          </Table>
        )}
      </TableContainer>

      {glassSenderReportListError && (
        <Box sx={{ mt: 2 }}>
          <Typography color="error" align="center">
            {glassSenderReportListError}
          </Typography>
        </Box>
      )}

      {/* Only show pagination if there are results */}
      {glassSenderReportListTotalCount > glassSenderReportLimit && (
        <CustomerPagination
          totalCount={glassSenderReportListTotalCount}
          handlePageNavigation={glassSenderReportListPageNavigation}
          changePageSize={glassSenderReportListChangePageSize}
          page_size={glassSenderReportLimit}
        />
      )}
    </Box>
  );
}
