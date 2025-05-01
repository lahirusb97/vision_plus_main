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
} from "@mui/material";
import { useNavigate } from "react-router";
import useGetBankDesposites from "../../../hooks/useGetBankDesposites";
import SingleDatePicker from "../../../hooks/SingleDatePicker";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useGetBankAccounts } from "../../../hooks/useGetBankAccounts";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import EditIcon from "@mui/icons-material/Edit";

export default function BankDeposite() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [accNumber, setAccNumber] = useState<number | null>(null);
  const { bankAccountsList, bankAccountsListLoading } = useGetBankAccounts();
  const navigation = useNavigate();
  const { bankDepositeList, bankDepositeLoading, bankDepositeParams } =
    useGetBankDesposites();

  return (
    <div>
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
                <TableCell>Actions</TableCell>

                <TableCell>Bank Name</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bankDepositeList?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7}>No Deposite Found</TableCell>
                </TableRow>
              )}
              {bankDepositeList?.map((deposit) => (
                <TableRow key={deposit.id}>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => navigation(`update/${deposit.id}`)}
                    >
                      <EditIcon sx={{ fontSize: "1.2rem" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell>{deposit.bank_name}</TableCell>
                  <TableCell>{deposit.account_number}</TableCell>
                  <TableCell>{deposit.amount}</TableCell>
                  <TableCell>{deposit.date}</TableCell>
                  <TableCell>
                    {deposit.is_confirmed ? "Confirmed" : "Pending"}
                  </TableCell>
                  <TableCell>{deposit.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
}
