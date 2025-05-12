import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useOutletContext } from "react-router";
import { DateRangePickerManualState } from "../layout/DoctorClaimReportLayout";
import useGetDoctorClaimChannelList from "../../../hooks/report/useGetDoctorClaimChannelList";
import { Delete } from "@mui/icons-material";
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";
import CustomerPagination from "../../../components/CustomPagination";
import { useDeleteDialog } from "../../../context/DeleteDialogContext";

export default function DoctorClaimReportChannel() {
  const { start_date, end_date } =
    useOutletContext<DateRangePickerManualState>();
  const {
    doctorClaimChannelList,
    doctorClaimChannelLimit,
    doctorClaimChannelListLoading,
    doctorClaimChannelListTotalCount,
    doctorClaimChannelListPageNavigation,
    doctorClaimChannelListChangePageSize,
    doctorClaimChannelListSearch,
    doctorClaimChannelListRefres,
  } = useGetDoctorClaimChannelList();
  const { openDialog } = useDeleteDialog();
  useEffect(() => {
    if (start_date && end_date) {
      doctorClaimChannelListSearch({
        start_date: start_date.format("YYYY-MM-DD"),
        end_date: end_date.format("YYYY-MM-DD"),
      });
    }
  }, [start_date, end_date]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Date </TableCell>
              <TableCell>Invoice No.</TableCell>
              <TableCell>Doctor </TableCell>
              <TableCell>Delete </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctorClaimChannelListLoading && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {doctorClaimChannelList.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {formatDateTimeByType(row.created_at, "both")}
                </TableCell>
                <TableCell>{row.invoice_number}</TableCell>
                <TableCell>{row.doctor_name}</TableCell>

                <TableCell
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "space-between",
                  }}
                  align="center"
                >
                  <IconButton
                    size="small"
                    sx={{ p: 0 }}
                    color="inherit"
                    onClick={() =>
                      openDialog(
                        `doctor-claims-channels/${row.id}/`,
                        row.invoice_number,
                        "Permanantly Delete",
                        doctorClaimChannelListRefres
                      )
                    }
                  >
                    <Delete color="error" fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {!doctorClaimChannelListLoading &&
              doctorClaimChannelList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} rowSpan={6} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
        <CustomerPagination
          totalCount={doctorClaimChannelListTotalCount}
          handlePageNavigation={doctorClaimChannelListPageNavigation}
          changePageSize={doctorClaimChannelListChangePageSize}
          page_size={doctorClaimChannelLimit}
        />
      </TableContainer>
    </div>
  );
}
