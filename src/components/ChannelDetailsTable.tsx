import React from "react";
import {
  Box,
  TextField,
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit, Print } from "@mui/icons-material";
interface ChannelDetailsTableProps {
  channelList: any[];
  loadingchannelList: boolean;
}
export default function ChannelDetailsTable({
  channelList,
  loadingchannelList,
}: ChannelDetailsTableProps) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ padding: 0, margin: 0 }}>
              <TableCell sx={tableStyles}>Action</TableCell>
              <TableCell sx={tableStyles}>ID</TableCell>
              <TableCell sx={tableStyles} align="right">
                Address
              </TableCell>
              <TableCell sx={tableStyles} align="right">
                Doctor Name
              </TableCell>
              <TableCell sx={tableStyles} align="right">
                Contact Number
              </TableCell>
              <TableCell sx={tableStyles} align="right">
                Patient Name
              </TableCell>
              <TableCell sx={tableStyles} align="right">
                Channel No
              </TableCell>
              <TableCell sx={tableStyles} align="right">
                First Payment
              </TableCell>
              <TableCell sx={tableStyles} align="right">
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {channelList.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  padding: 0,
                  margin: 0,
                }}
              >
                <TableCell sx={tableStyles}>
                  <IconButton size="small">
                    <Edit sx={{ fontSize: 15 }} />
                  </IconButton>
                  <IconButton size="small">
                    <Print sx={{ fontSize: 15 }} />
                  </IconButton>
                </TableCell>

                <TableCell sx={tableStyles} component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell sx={tableStyles} align="right">
                  {row.address}
                </TableCell>
                <TableCell sx={tableStyles} align="right">
                  {row.doctor_name}
                </TableCell>
                <TableCell sx={tableStyles} align="right">
                  {row.contact_number}
                </TableCell>
                <TableCell sx={tableStyles} align="right">
                  {row.patient_name}
                </TableCell>
                <TableCell sx={tableStyles} align="right">
                  {row.channel_no}
                </TableCell>
                <TableCell sx={tableStyles} align="right">
                  {row.first_payment}
                </TableCell>
                <TableCell sx={tableStyles} align="right">
                  {row.date}
                </TableCell>
              </TableRow>
            ))}
            {loadingchannelList && (
              <TableRow>
                <TableCell colSpan={8}>Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
const tableStyles = {
  padding: 0.5,
  margin: 0,
};
