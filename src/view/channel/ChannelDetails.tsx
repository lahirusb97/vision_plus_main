import React from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit, Receipt, Search } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import AutocompleteInputField from "../../components/inputui/DropdownInput";
import useData from "../../hooks/useData";

interface ChannelData {
  id: number;
  address: string;
  doctor_name: string;
  contact_number: string;
  patient_name: string;
  channel_no: number;
  first_payment: number;
  date: string;
}

function ChannelDetails() {
  const { control } = useForm();
  const {
    data: channelList,
    loading: loadingchannelList,
    error: errorchannelList,
  } = useData<ChannelData[] | any>("channels/");
  console.log(channelList);

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Box
          sx={{
            width: "50%",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            border: "1px solid black",
            paddingLeft: 1,
          }}
        >
          <IconButton sx={{ padding: 1, marginLeft: 1 }}>
            <Search />
          </IconButton>
          <TextField
            label="Chanal Id / Contact No"
            size="small"
            fullWidth
            variant="standard"
            InputProps={{
              disableUnderline: true, // Remove the default underline
            }}
            sx={{
              borderRadius: "20px",
              paddingRight: 2,
              justifyContent: "left",
              alignItems: "left",
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          marginBottom: 3,
        }}
      >
        {/* Doctor dropdown */}
        <Controller
          name="doctor_id"
          control={control}
          render={({ field }) => (
            <div style={{ width: 150 }}>
              <AutocompleteInputField
                options={[]}
                loading={false}
                {...field}
                labelName="Doctor name "
                defaultId={undefined}
                sx={{ width: "100%" }}
              />
            </div>
          )}
        />

        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="channel_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Date"
                onChange={(date) => field.onChange(date)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    sx={{ width: "150px", padding: "10px" }}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>

        {/* OK Button */}
        <Button
          sx={{
            backgroundColor: "black",
            color: "white",
            width: "150px",
            height: "55px",
          }}
          variant="contained"
        >
          OK
        </Button>

        {/* Chanal Count Button */}
        <Box
          sx={{
            backgroundColor: "lightblue",
            color: "black",
            border: "none",

            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography>Chanal Count : {channelList.length}</Typography>
        </Box>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Doctor Name</TableCell>
              <TableCell align="right">Contact Number</TableCell>
              <TableCell align="right">Patient Name</TableCell>
              <TableCell align="right">Channel No</TableCell>
              <TableCell align="right">First Payment</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {channelList.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.doctor_name}</TableCell>
                <TableCell align="right">{row.contact_number}</TableCell>
                <TableCell align="right">{row.patient_name}</TableCell>
                <TableCell align="right">{row.channel_no}</TableCell>
                <TableCell align="right">{row.first_payment}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ChannelDetails;
