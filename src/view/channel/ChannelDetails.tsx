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
import { Edit, PaymentOutlined, Print } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AutocompleteInputField from "../../components/inputui/DropdownInput";
import useGetDoctors from "../../hooks/useGetDoctors";
import useGetChannelDetails from "../../hooks/useGetChannelDetails";
import HighlightedDatePicker from "../../components/HighlightedDatePicker";
import { useNavigate } from "react-router";
import CustomerPagination from "../../components/CustomPagination";

function ChannelDetails() {
  const navigate = useNavigate();
  const { data: doctorList, loading: loadingDoctors } = useGetDoctors();
  const [searchText, setSearchText] = useState<string | null>(null);
  const [invoice_number, setInvoiceNumber] = useState<string | null>(null);
  //handle Filters
  const [dateInput, setDateInput] = useState<string | null>(null);
  const [doctorInput, setDoctorInput] = useState<number | undefined>(undefined);

  const {
    channelList,
    channelListLimit,
    channelListLoading,
    channelListError,
    channelListTotalCount,
    channelListRefresh,
    channelListSearch,
    channelListPageNavigation,
    channelListChangePageSize,
  } = useGetChannelDetails();
  console.log(channelList);
  //handle Filters

  const handleFilter = () => {
    channelListSearch({
      doctor: doctorInput || null,
      date: dateInput,
      search: searchText,
      invoice_number: invoice_number ? Number(invoice_number) : null,
      page: 1,
      page_size: 10,
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
        <TextField
          type="text"
          sx={{ width: 150 }}
          onChange={(e) => setInvoiceNumber(e.target.value)}
          value={invoice_number}
          label=" Invoice Number"
          size="small"
          variant="outlined"
        />
        <TextField
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          label=" Contact No"
          size="small"
          variant="outlined"
        />
        {/* Doctor dropdown */}

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
            sheduleStatus={"Available"}
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
            setSearchText(null);
            setInvoiceNumber(null);
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
              <TableCell sx={tableStyles}>Invoice Number </TableCell>

              <TableCell sx={tableStyles} align="left">
                Date
              </TableCell>
              <TableCell sx={tableStyles} align="center">
                Channel No
              </TableCell>
              <TableCell sx={tableStyles} align="left">
                Patient Name
              </TableCell>

              <TableCell sx={tableStyles} align="left">
                Doctor Name
              </TableCell>
              <TableCell sx={tableStyles} align="left">
                Contact Number
              </TableCell>

              <TableCell sx={tableStyles} align="left">
                First Payment
              </TableCell>

              <TableCell sx={tableStyles} align="left">
                Address
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {channelList.results.map((row) => (
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
                  <IconButton
                    onClick={() =>
                      navigate(`/channel/channel_payment/${row.id}`)
                    }
                    size="small"
                  >
                    <PaymentOutlined sx={{ fontSize: 15 }} />
                  </IconButton>
                </TableCell>

                <TableCell
                  sx={tableStyles}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {row.invoice_number}
                </TableCell>
                <TableCell sx={tableStyles} align="left">
                  {row.date}
                </TableCell>
                <TableCell sx={tableStyles} align="center">
                  {row.channel_no}
                </TableCell>
                <TableCell sx={tableStyles} align="left">
                  {row.patient_name}
                </TableCell>

                <TableCell sx={tableStyles} align="left">
                  {row.doctor_name}
                </TableCell>
                <TableCell sx={tableStyles} align="left">
                  {row.contact_number}
                </TableCell>

                <TableCell sx={tableStyles} align="left">
                  {row.first_payment}
                </TableCell>

                <TableCell sx={tableStyles} align="left">
                  {row.address}
                </TableCell>
              </TableRow>
            ))}
            {channelListLoading && (
              <TableRow>
                <TableCell align="center" colSpan={9}>
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {channelList.results.length === 0 && (
              <TableRow>
                <TableCell align="center" colSpan={9}>
                  {channelListError ? "Error loading data " : "No data..."}
                  {channelListError && (
                    <>
                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={channelListRefresh}
                        sx={{ mx: "1rem" }}
                      >
                        Retry
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <CustomerPagination
          totalCount={channelListTotalCount}
          handlePageNavigation={channelListPageNavigation}
          changePageSize={channelListChangePageSize}
          page_size={channelListLimit}
        />
      </TableContainer>
    </Box>
  );
}

export default ChannelDetails;
const tableStyles = {
  padding: 0.5,
  margin: 0,
};
