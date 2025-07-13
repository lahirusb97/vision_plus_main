import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router";
import useGetBankDesposites from "../../../hooks/useGetBankDesposites";
import SingleDatePicker from "../../../hooks/SingleDatePicker";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useGetBankAccounts } from "../../../hooks/useGetBankAccounts";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import { Edit } from "@mui/icons-material";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import DepositeConfirm from "../../../components/common/DepositeConfirm";
import TitleText from "../../../components/TitleText";

interface ConfirmDialog {
  open: boolean;
  id: number | null;
  account_number: string | null;
  amount: string | null;
  date: string | null;
  is_confirmed: boolean | null;
  note: string | null;
}

export default function BankDeposite() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [accNumber, setAccNumber] = useState<number | null>(null);
  const { bankAccountsList, bankAccountsListLoading } = useGetBankAccounts();
  const navigation = useNavigate();
  const {
    bankDepositeList,
    bankDepositeLoading,
    bankDepositeParams,
    bankDepositeRefresh,
  } = useGetBankDesposites();
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialog>({
    open: false,
    id: null,
    account_number: null,
    amount: null,
    date: null,
    is_confirmed: null,
    note: null,
  });
  return (
    <Paper sx={{ p: 1 }}>
      <TitleText title="Bank Deposite" />

      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
        <AutocompleteInputField
          labelName="Bank Accounts"
          loading={bankAccountsListLoading}
          options={bankAccountsList.map((item) => ({
            id: item.id,
            name: `${item.bank_name} - ${item.account_number}`,
          }))}
          onChange={(id) => setAccNumber(id)}
          defaultId={accNumber}
        />
        <SingleDatePicker value={selectedDate} onChange={setSelectedDate} />
        <Button
          variant="outlined"
          onClick={() => {
            bankDepositeParams({
              bank_account: accNumber ? accNumber : null,
              date: selectedDate ? selectedDate.format("YYYY-MM-DD") : null,
            });
          }}
        >
          Search
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Button
        variant="contained"
        onClick={() => {
          navigation("create/");
        }}
      >
        Make a New Deposite
      </Button>

      <TableContainer component={Paper}>
        {bankDepositeLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Edit</TableCell>
                {/* <TableCell align="center">Confirm</TableCell> */}

                <TableCell>Date</TableCell>

                <TableCell>Bank Name</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Amount</TableCell>
                {/* <TableCell>Status</TableCell> */}
                <TableCell>Note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bankDepositeList?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>No Deposite Found</TableCell>
                </TableRow>
              )}
              {bankDepositeList?.map((deposit) => (
                <TableRow key={deposit.id}>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => {
                        navigation(`update/${deposit.id}/`);
                      }}
                    >
                      <Edit sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </TableCell>
                  {/* <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setConfirmDialog({
                          open: true,
                          id: deposit.id,
                          account_number: deposit.account_number,
                          amount: deposit.amount,
                          date: deposit.date,
                          is_confirmed: deposit.is_confirmed,
                          note: deposit.note,
                        });
                      }}
                    >
                      <AddModeratorIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </TableCell> */}
                  <TableCell>{deposit.date}</TableCell>

                  <TableCell>{deposit.bank_name}</TableCell>
                  <TableCell>{deposit.account_number}</TableCell>
                  <TableCell>{numberWithCommas(deposit.amount)}</TableCell>
                  {/* <TableCell>
                    {deposit.is_confirmed ? "Confirmed" : "Pending"}
                  </TableCell> */}
                  <TableCell>{deposit.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <DepositeConfirm
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
          bankDepositeRefresh={bankDepositeRefresh}
        />
      </TableContainer>
    </Paper>
  );
}
