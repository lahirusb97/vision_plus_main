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
} from "@mui/material";
import { Delete, Edit, Receipt, Search } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import AutocompleteInputField from "../../components/inputui/DropdownInput";

const sampleData = [
  {
    chanalId: "4555",
    address: "mathugama",
    doctorName: "Danuka",
    contactNo: "076 4584757",
    patientName: "Amal",
    chanalNo: 5,
    firstPayment: 1000.0,
  },
  {
    chanalId: "4555",
    address: "kaluthra",
    doctorName: "Danuka",
    contactNo: "076 4584757",
    patientName: "Amal",
    chanalNo: 2,
    firstPayment: 1500.0,
  },
];

function ChannelDetails() {
  const { control } = useForm();

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
        sx={{ width: '100%' }} 
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
                  <TextField {...params} size="small" sx={{ width: "150px", padding:"10px" }} />
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
        <Button
          sx={{
            backgroundColor: "lightblue",
            color: "black",
            border: "none",
            width: "150px",
            height: "55px",
          }}
          variant="outlined"
        >
          Chanal Count
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "gray" }}>
              <TableCell><strong>Action</strong></TableCell>
              <TableCell><strong>Chanal Id</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Doctor Name</strong></TableCell>
              <TableCell><strong>Contact No</strong></TableCell>
              <TableCell><strong>Patient Name</strong></TableCell>
              <TableCell><strong>Chanal No</strong></TableCell>
              <TableCell><strong>First Payment</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "white" }}>
            {sampleData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <IconButton size="small" sx={{color:"black" }}>
                  <Delete />
                  </IconButton>
                  <IconButton size="small" sx={{color:"black" }}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" sx={{color:"black" }}>
                    <Receipt />
                  </IconButton>
                </TableCell>
                <TableCell><strong>{row.chanalId}</strong></TableCell>
                <TableCell><strong>{row.address}</strong></TableCell>
                <TableCell><strong>{row.doctorName}</strong></TableCell>
                <TableCell><strong>{row.contactNo}</strong></TableCell>
                <TableCell><strong>{row.patientName}</strong></TableCell>
                <TableCell><strong>{row.chanalNo}</strong></TableCell>
                <TableCell><strong>{row.firstPayment.toFixed(2)}</strong></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ChannelDetails;