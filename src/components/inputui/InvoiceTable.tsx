import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete, Remove } from "@mui/icons-material";
import { Input } from "@mui/material";

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

function subtotal(items: readonly Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow(
    "Frame Brand: 1 / Code:N650 / Color: silver / species: plastic ",
    1,
    8000
  ),
  createRow(
    "Lense Brand 2 / Type: bifocal / Coating: anti-reflective / sph: 1.5 / cyl: 2.5 / add: 2.5",
    1,
    2500
  ),
  createRow(
    "Lense Brand 2 / Type: bifocal / Coating: anti-reflective / sph: 1.5 / cyl: 2.5 / add: 2.5",
    1,
    2500
  ),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function InvoiceTable() {
  return (
    <TableContainer
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        mt: 1,
        maxWidth: "1200px",
      }}
      elevation={2}
      component={Paper}
    >
      <Table
        size="small"
        sx={{ minWidth: 700, maxWidth: "1200px" }}
        aria-label="spanning table"
      >
        <TableHead>
          <TableRow>
            <TableCell>action</TableCell>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Delete color="error" />
              </TableCell>

              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell rowSpan={3} />
            <TableCell align="right" colSpan={2}>
              Subtotal
            </TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1} />
            <TableCell align="right">Discount</TableCell>
            <TableCell align="right">
              <Input
                sx={{ width: "100%" }} // Optional for full width
                value={ccyFormat(invoiceTaxes)}
                inputProps={{ style: { textAlign: "right" } }} // Correct way
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={2}>
              Total
            </TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
