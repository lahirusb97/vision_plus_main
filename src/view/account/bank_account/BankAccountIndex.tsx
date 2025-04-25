import { useNavigate } from "react-router";
import { useGetBankAccounts } from "../../../hooks/useGetBankAccounts";
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
import { BankAccountModel } from "../../../model/BankAccountModel";
import { Edit } from "@mui/icons-material";

export default function BankAccountIndex() {
  const navigate = useNavigate();
  const { bankAccountsList, bankAccountsListLoading } = useGetBankAccounts();

  return (
    <Box sx={{ p: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Bank Accounts</Typography>
        <Button variant="contained" onClick={() => navigate("create")}>
          Create New Account
        </Button>
      </Box>

      {bankAccountsListLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer sx={{ minWidth: 500 }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Actions</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Bank Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bankAccountsList?.map((account: BankAccountModel) => (
                <TableRow key={account.id}>
                  <TableCell align="left">
                    <IconButton
                      size="small"
                      onClick={() => navigate(`update/${account.id}`)}
                    >
                      <Edit sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell>{account.account_number}</TableCell>
                  <TableCell>{account.bank_name}</TableCell>
                </TableRow>
              ))}

              {bankAccountsList?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No bank accounts found.
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
