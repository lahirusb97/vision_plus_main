import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete } from "@mui/icons-material";
import { IconButton, Input } from "@mui/material";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { removeFrame } from "../../features/invoice/frameFilterSlice";
import { removeLense } from "../../features/invoice/lenseFilterSlice";
import { removeOtherItem } from "../../features/invoice/otherItemSlice";

interface data {
  handleDiscountChange: () => void;
  discount: number;
}
export default function InvoiceTable({ handleDiscountChange, discount }: data) {
  const dispatch = useDispatch();
  const FrameInvoiceList = useSelector(
    (state: RootState) => state.invoice_frame_filer.selectedFrameList
  );
  const LenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_lense_filer.selectedLenses
  );
  const OtherInvoiceList = useSelector(
    (state: RootState) => state.invoice_other_Item.selectedOtherItems
  );
  const calculateTotal = (list: any[]) => {
    return list.reduce((acc, row) => {
      const rowTotal = parseInt(row.price) * row.buyQty;
      return acc + rowTotal;
    }, 0);
  };
  const frameTotal = calculateTotal(Object.values(FrameInvoiceList));
  const lenseTotal = calculateTotal(Object.values(LenseInvoiceList));
  const otherTotal = calculateTotal(Object.values(OtherInvoiceList));
  const subtotal = frameTotal + lenseTotal + otherTotal;
  const grandTotal = subtotal - discount;

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
          {Object.values(FrameInvoiceList).map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton onClick={() => dispatch(removeFrame(row.id))}>
                  <Delete color="error" />
                </IconButton>
              </TableCell>

              <TableCell>{`${row.brand_name} / ${row.code_name} / ${row.color_name} / ${row.species}`}</TableCell>
              <TableCell align="right">{row.buyQty}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">
                {parseInt(row.price) * row.buyQty}
              </TableCell>
            </TableRow>
          ))}
          {Object.values(LenseInvoiceList).map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton onClick={() => dispatch(removeLense(row.id))}>
                  <Delete color="error" />
                </IconButton>
              </TableCell>

              <TableCell>
                {`${row.stock.lens_type} / ${row.stock.coating} / ${row.powers
                  .map((power) => {
                    if (power.power === 1) {
                      return `SPH: ${power.value}`; // For SPH (Sphere)
                    } else if (power.power === 2) {
                      return `CYL: ${power.value}`; // For CYL (Cylinder)
                    } else if (power.power === 3) {
                      return `ADD: ${power.value}`; // For ADD (Addition)
                    }
                    return ""; // If no matching power type
                  })
                  .join(" / ")} `}
              </TableCell>

              <TableCell align="right">{row.buyQty}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">
                {parseInt(row.price) * row.buyQty}
              </TableCell>
            </TableRow>
          ))}
          {Object.values(OtherInvoiceList).map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton onClick={() => dispatch(removeOtherItem(row.id))}>
                  <Delete color="error" />
                </IconButton>
              </TableCell>

              <TableCell>{`${row.name}  `}</TableCell>

              <TableCell align="right">{row.buyQty}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">
                {parseInt(row.price) * row.buyQty}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell rowSpan={3} />
            <TableCell align="right" colSpan={2}>
              Subtotal
            </TableCell>
            <TableCell align="right">{subtotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1} />
            <TableCell align="right">Discounts</TableCell>
            <TableCell align="right">
              <Input
                sx={{ width: "100%" }} // Optional for full width
                value={discount}
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleDiscountChange
                }
                inputProps={{ style: { textAlign: "right" } }} // Correct way
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={2}>
              Total
            </TableCell>
            <TableCell align="right">{grandTotal}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
