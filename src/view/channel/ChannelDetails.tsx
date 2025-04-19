import { useState } from "react";
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
} from "@mui/material";
import { Edit, Print } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AutocompleteInputField from "../../components/inputui/DropdownInput";
import useGetDoctors from "../../hooks/useGetDoctors";
import useGetChannelDetails from "../../hooks/useGetChannelDetails";
import HighlightedDatePicker from "../../components/HighlightedDatePicker";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const { data: doctorList, loading: loadingDoctors } = useGetDoctors();
  const [searchText, setSearchText] = useState<string>("");
  //handle Filters
  const [dateInput, setDateInput] = useState<string | null>(null);
  const [doctorInput, setDoctorInput] = useState<number | undefined>(undefined);

  const {
    channelList,
    loading: loadingchannelList,
    searchChannels,
  } = useGetChannelDetails();

  //handle Filters

  const handleFilter = () => {
    searchChannels({
      doctor: doctorInput,
      date: dateInput,
      search: searchText,
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
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
        <TextField
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          label=" Contact No"
          size="small"
          variant="outlined"
        />

        <Box sx={{ width: "200px" }}>
          <AutocompleteInputField
            options={doctorList}
            loading={loadingDoctors}
            labelName="Doctor name "
            defaultId={doctorInput}
            onChange={(id) => setDoctorInput(id || undefined)}
          />
        </Box>

        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HighlightedDatePicker
            onDateChange={(date) => setDateInput(date)}
            doctorId={doctorInput}
            label="Select Date"
            selectedDate={dateInput}
          />
        </LocalizationProvider>

        {/* OK Button */}
        <Button variant="contained" onClick={handleFilter}>
          Filter Channel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setDateInput(null);
            setDoctorInput(undefined);
            setSearchText("");
          }}
        >
          Clear Date
        </Button>

        {/* Chanal Count Button */}
        {/* <Box
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
        </Box> */}
      </Box>

      {/* Table Section */}
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
            {channelList.map((row: ChannelData) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  padding: 0,
                  margin: 0,
                }}
              >
                <TableCell sx={tableStyles}>
                  <IconButton
                    onClick={() =>
                      navigate(`/channel/patient_shedule/${row.id}`)
                    }
                    size="small"
                  >
                    <Edit sx={{ fontSize: 15 }} />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      navigate(`/channel/channel_invoice/${row.id}`)
                    }
                    size="small"
                  >
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
            {channelList.length === 0 && (
              <TableRow>
                <TableCell align="center" colSpan={9}>
                  No data...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ChannelDetails;
const tableStyles = {
  padding: 0.5,
  margin: 0,
};
