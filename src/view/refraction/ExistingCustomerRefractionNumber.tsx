import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useTheme,
  IconButton,
  Button,
  Pagination,
  Skeleton,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router";
import useGetRefraction from "../../hooks/useGetRefraction";
import EditIcon from "@mui/icons-material/Edit";
import { teal } from "@mui/material/colors";
import TitleText from "../../components/TitleText";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";
import DataLoadingError from "../../components/common/DataLoadingError";
import { InvoiceHistoryPopover } from "../../components/refreaction/InvoiceHistoryPopover";
import { Add, HistoryRounded, Person } from "@mui/icons-material";
import useGetPatientList from "../../hooks/useGetPatientList";
import OnTypeSearchInput from "../../components/inputui/OnTypeSearchInput";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
// import { useDeleteDialog } from "../../context/DeleteDialogContext";
import BadgeIcon from "@mui/icons-material/Badge";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import toast from "react-hot-toast";
import { getUserCurentBranch } from "../../utils/authDataConver";
import ConfirmDialog from "../../components/ConfirmDialog";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
export default function ExistingCustomerRefractionNumber() {
  const theme = useTheme();
  const navigate = useNavigate();
  // const { openDialog } = useDeleteDialog();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchByNic, setSearchByNic] = useState("");
  const [searchByMobile, setSearchByMobile] = useState("");
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<{
    name: string;
    nic: string | null;
    mobile: string | null;
    patient_id: number;
  } | null>(null);
  //POPOver
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [popoverSearchData, setPopoverSearchData] = useState<{
    nic: string | null;
    mobile: string | null;
  } | null>(null);
  const handleShowHistory = (
    event: React.MouseEvent<HTMLElement>,
    nic: string | null,
    mobile: string | null
  ) => {
    setPopoverAnchor(event.currentTarget);
    setPopoverSearchData({ nic, mobile });
  };
  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setPopoverSearchData(null);
  };
  //POPOver
  const {
    PatientList,
    PatientListChangePageSize,
    PatientListError,
    PatientListLimit,
    PatientListLoading,
    PatientListPageNavigation,
    PatientListRefres,
    PatientListSearch,
    PatientListTotalCount,
  } = useGetPatientList();
  // Safely access data and meta-information
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();

  // Filtered rows based on the search query

  const handleInternalOrder = async () => {
    if (selectedRow) {
      navigate(`/refraction/${selectedRow}/`);
    }
  };
  if (!PatientListLoading && PatientListError) {
    return <DataLoadingError />;
  }
  const generateRefractionNumber = async () => {
    if (!selectedPatient || !selectedPatient.patient_id) {
      toast.error("Patient ID is missing");
      return;
    }
    const payload = {
      customer_full_name: selectedPatient.name,
      customer_mobile: selectedPatient?.mobile,
      nic: selectedPatient?.nic,
      patient_id: selectedPatient.patient_id,
      branch_id: getUserCurentBranch()?.id,
    };
    try {
      await postHandler("refractions/create/", payload);
      toast.success("Refraction Number Generated Successfully");
    } catch (error) {
      extractErrorMessage(error);
    } finally {
      setConfirmDialogOpen(false);
      setSelectedPatient(null);
    }
  };
  const handleGenerateRefraction = (patient: {
    name: string;
    nic: string | null;
    mobile: string | null;
    patient_id: number;
  }) => {
    setSelectedPatient(patient);
    setConfirmDialogOpen(true);
  };

  const handleConfirmGenerate = async () => {
    if (!selectedPatient) return;

    try {
      await generateRefractionNumber();
      setConfirmDialogOpen(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error("Error generating refraction number:", error);
    }
  };
  return (
    <Box>
      {/* <TitleText title=" Select a Refraction Number to Add Refraction Details" /> */}
      {/* Search Bar */}
      <form
        style={{
          display: "flex",
          gap: "10px",
          marginBlock: 1,
          alignItems: "baseline",
        }}
      >
        <OnTypeSearchInput
          onSearch={(searchTerm) => {
            PatientListSearch({
              page_size: 10,
              page: 1,
              search: searchTerm,
              nic: null,
              phone_number: null,
            });
          }}
          onChange={setSearchQuery}
          label="Name"
          value={searchQuery}
          required
          startIcon={<Person />}
        />
        <OnTypeSearchInput
          onSearch={(searchTerm) => {
            PatientListSearch({
              page_size: 10,
              page: 1,
              search: null,
              nic: searchTerm,
              phone_number: null,
            });
          }}
          onChange={setSearchByNic}
          label="NIC"
          value={searchByNic}
          required
          startIcon={<BadgeIcon />}
        />
        <OnTypeSearchInput
          onSearch={(searchTerm) => {
            PatientListSearch({
              page_size: 10,
              page: 1,
              search: null,
              nic: null,
              phone_number: searchTerm,
            });
          }}
          onChange={setSearchByMobile}
          label="Mobile Number"
          value={searchByMobile}
          required
          startIcon={<LocalPhoneIcon />}
        />
        {/* <Button size="small" type="submit" variant="contained">
          Search
        </Button> */}
        <Button
          size="small"
          variant="contained"
          color="info"
          onClick={() => {
            PatientListSearch({
              page_size: 10,
              page: 1,
              search: null,
              nic: null,
              phone_number: null,
            });
            setSearchQuery("");
            setSearchByNic("");
            setSearchByMobile("");
          }}
        >
          Reset
        </Button>
      </form>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "baseline",
        }}
      ></Box>

      {/* Table Container */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflowX: "auto",
          mt: 1,
        }}
      >
        <Table
          size="small"
          sx={{ minWidth: 650 }}
          aria-label="Refraction Details Table"
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: theme.palette.grey[200],
              }}
            >
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>NIC</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Birth Day</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PatientListLoading ? (
              [...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ))
            ) : PatientList.length > 0 ? (
              PatientList.map((row) => (
                <TableRow
                  onClick={() => setSelectedRow(row.id)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedRow === row.id ? teal[100] : "inherit",
                    "&:hover": {
                      backgroundColor: theme.palette.grey[300],
                    },
                  }}
                  key={row.id}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>
                    <IconButton
                      size="small"
                      color="warning"
                      title="Generate Refraction"
                      onClick={() =>
                        handleGenerateRefraction({
                          name: row.name,
                          nic: row.nic,
                          mobile: row.phone_number,
                          patient_id: row.id,
                        })
                      }
                    >
                      <Add fontSize="small" />
                    </IconButton>
                    <Tooltip title="Generate Refraction">
                      <IconButton
                        size="small"
                        sx={{ p: 0 }}
                        onClick={(e) =>
                          handleShowHistory(e, row.nic, row.phone_number)
                        }
                      >
                        <HistoryRounded fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>

                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.nic}</TableCell>
                  <TableCell>{row.phone_number}</TableCell>
                  <TableCell>{row.date_of_birth}</TableCell>
                  <TableCell>{row.address}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No matching records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pagination
          sx={{ my: ".2em" }}
          size="small"
          count={Math.ceil(PatientListTotalCount / PatientListLimit)}
          onChange={(_e: ChangeEvent<unknown>, value: number) => {
            PatientListPageNavigation(value);
          }}
        ></Pagination>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Button
          size="small"
          disabled={!selectedRow}
          onClick={handleInternalOrder}
          variant="contained"
        >
          Select Details
        </Button>
      </Box>
      <InvoiceHistoryPopover
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        onClose={handleClosePopover}
        nic={popoverSearchData?.nic || null}
        mobile={popoverSearchData?.mobile || null}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        closeDialog={() => setConfirmDialogOpen(false)}
        apiCall={handleConfirmGenerate}
        onSuccess={() => {
          // Refresh or update the UI as needed
        }}
        message={`Are you sure you want to generate refraction number for ${selectedPatient?.name}?`}
      />
    </Box>
  );
}
