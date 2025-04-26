import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";

// Define the TypeScript type
interface TodayBankingItem {
  bank_name: string;
  account_number: string;
  amount: number;
  is_confirmed: boolean;
}

// Props for the table
interface TodayBankingTableProps {
  data: TodayBankingItem[];
}

const TodayBankingTable: React.FC<TodayBankingTableProps> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Bank Name</TableCell>
            <TableCell>Account Number</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="center">Confirmed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.bank_name}</TableCell>
              <TableCell>{item.account_number}</TableCell>
              <TableCell align="right">
                {item.amount.toLocaleString()}
              </TableCell>
              <TableCell align="center">
                <Checkbox checked={item.is_confirmed} disabled />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodayBankingTable;
