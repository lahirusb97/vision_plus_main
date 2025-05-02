import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Button,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import useGetBusTitles from "../../../hooks/useGetBusTitles";
import TitleText from "../../../components/TitleText";
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";
import CustomerPagination from "../../../components/CustomPagination";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router";
export default function BusTitleIndex() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const {
    busTitlesList,
    busTitlesLoading,
    busTitlesTotalCount,
    busTitlesError,
    pageSize,
    handleBusTitleFilterParams,
    busTitlePageNavigation,
    busTitlePageSize,
    busTitlesListRefresh,
  } = useGetBusTitles();

  return (
    <div>
      <TitleText title="Mobile Unit Title of the Day" />
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          fullWidth
          size="small"
          label="Mobile Unit Title Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() =>
            handleBusTitleFilterParams({ search: title, is_active: null })
          }
        >
          Search
        </Button>
        <Button
          variant="outlined"
          color="info"
          onClick={() => {
            handleBusTitleFilterParams({ search: null, is_active: null });
            setTitle("");
            busTitlePageSize(10);
          }}
        >
          Reset
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {busTitlesLoading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : busTitlesError ? (
              <TableRow>
                <TableCell colSpan={2} align="center" style={{ color: "red" }}>
                  Failed to load bus titles.
                </TableCell>
                <TableCell colSpan={1} align="center" style={{ color: "red" }}>
                  <Button onClick={() => busTitlesListRefresh()} color="error">
                    Retry
                  </Button>
                </TableCell>
              </TableRow>
            ) : busTitlesList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No bus titles found.
                </TableCell>
              </TableRow>
            ) : (
              busTitlesList.map((row) => (
                <TableRow sx={{ p: 1 }} key={row.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        navigate(`/transaction/bus/update/${row.id}`);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>

                  <TableCell>{row.title}</TableCell>
                  <TableCell>
                    {row.is_active ? (
                      <Chip label="Active" color="success" size="small" />
                    ) : (
                      <Chip label="Inactive" color="default" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    {formatDateTimeByType(row.updated_at, "date")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <CustomerPagination
          totalCount={busTitlesTotalCount}
          handlePageNavigation={busTitlePageNavigation}
          changePageSize={busTitlePageSize}
          page_size={pageSize}
        />
      </TableContainer>
    </div>
  );
}
