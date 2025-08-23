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
  useTheme,
  IconButton,
  Button,
  Pagination,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router";
import { teal } from "@mui/material/colors";
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
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { RefractionNumberModel } from "../../model/RefractionModel";
import DataLoadingError from "../../components/common/DataLoadingError";
import { PatientModel } from "../../model/Patient";

interface PatientTableProps {
  onRawSelect: (row: PatientModel) => void;
  existingPatinetBtnLable: string;
  createPatientBtnLable: string;
  onCreatePatientClick: ({
    searchName,
    searchNic,
    searchMobile,
  }: {
    searchName: string;
    searchNic: string;
    searchMobile: string;
  }) => void;
}
export default function PatientTable({
  onRawSelect,
  existingPatinetBtnLable,
  createPatientBtnLable,
  onCreatePatientClick,
}: PatientTableProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  // const { openDialog } = useDeleteDialog();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchNic, setSearchNic] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [selectedRow, setSelectedRow] = useState<PatientModel | null>(null);
  //POPOver
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [popoverSearchData, setPopoverSearchData] = useState<number | null>(
    null
  );
  const handleShowHistory = (
    event: React.MouseEvent<HTMLElement>,
    patient_id: number
  ) => {
    setPopoverAnchor(event.currentTarget);
    setPopoverSearchData(patient_id);
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

  if (!PatientListLoading && PatientListError) {
    return <DataLoadingError />;
  }

  return (
    <Box>
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
              nic: null,
              phone_number: null,
              name: searchTerm,
            });
          }}
          onChange={setSearchName}
          label="Name"
          value={searchName}
          required
          startIcon={<Person />}
        />
        <OnTypeSearchInput
          onSearch={(searchTerm) => {
            PatientListSearch({
              page_size: 10,
              page: 1,
              nic: searchTerm,
              phone_number: null,
              name: null,
            });
          }}
          onChange={setSearchNic}
          label="NIC"
          value={searchNic}
          required
          startIcon={<BadgeIcon />}
        />
        <OnTypeSearchInput
          onSearch={(searchTerm) => {
            PatientListSearch({
              page_size: 10,
              page: 1,
              nic: null,
              phone_number: searchTerm,
              name: null,
            });
          }}
          onChange={setSearchMobile}
          label="Mobile Number"
          value={searchMobile}
          required
          startIcon={<LocalPhoneIcon />}
        />
        {/* <Button size="small" type="submit" variant="contained">
          Search
        </Button> */}
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            PatientListSearch({
              page_size: 10,
              page: 1,
              nic: null,
              phone_number: null,
              name: null,
            });
            setSearchName("");
            setSearchNic("");
            setSearchMobile("");
            setSelectedRow(null);
          }}
        >
          Reset
        </Button>
      </form>

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
          onClick={() => {
            onCreatePatientClick({ searchName, searchNic, searchMobile });
          }}
          variant="outlined"
        >
          {createPatientBtnLable}
        </Button>
      </Box>
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
                  onClick={() => setSelectedRow(row)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedRow?.id === row.id ? teal[100] : "inherit",
                    "&:hover": {
                      backgroundColor: theme.palette.grey[300],
                    },
                  }}
                  key={row.id}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {/* <IconButton
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
                    </IconButton> */}
                    <Tooltip title="Generate Refraction">
                      <IconButton
                        size="small"
                        sx={{ p: 0 }}
                        onClick={(e) => handleShowHistory(e, row.id)}
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
          color="primary"
          onClick={() => {
            if (!selectedRow) return;
            onRawSelect(selectedRow);
          }}
          variant="contained"
          disabled={!selectedRow}
        >
          {existingPatinetBtnLable}
          {selectedRow && ` for -`}
          <span style={{ fontWeight: "bold", marginLeft: "1em" }}>
            {selectedRow?.name} {selectedRow?.phone_number}
          </span>
        </Button>
      </Box>
      <InvoiceHistoryPopover
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        onClose={handleClosePopover}
        patient_id={popoverSearchData || null}
      />
    </Box>
  );
}
