import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

import { useGetOtherIncomes } from "../../../hooks/useGetOtherIncomes";
import { OtherIncomeCategory } from "../../../model/OtherIncomeCategory";

export default function OtherIncomeIndex() {
  const navigate = useNavigate();
  const { otherIncomeList, otherIncomeListLoading } = useGetOtherIncomes();

  return (
    <Box sx={{ p: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Other Income Categories</Typography>
        <Button variant="contained" onClick={() => navigate("create")}>
          Create New Income
        </Button>
      </Box>

      {otherIncomeListLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer sx={{ minWidth: 500 }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Actions</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {otherIncomeList?.map((income: OtherIncomeCategory) => (
                <TableRow key={income.id}>
                  <TableCell align="left">
                    <IconButton
                      size="small"
                      onClick={() => navigate(`update/${income.id}`)}
                    >
                      <Edit sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell>{income.name}</TableCell>
                  <TableCell>{income.description}</TableCell>
                </TableRow>
              ))}

              {otherIncomeList?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No income categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
