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
import { useFormContext } from "react-hook-form";
import { removeexternalLense } from "../../features/invoice/externalLenseSlice";
import { calculateExternalLensTotal } from "../../utils/calculateExternalLensTotal";

export default function InvoiceTable() {
  const { register, watch, setValue } = useFormContext();

  const dispatch = useDispatch();
  const externalLenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_external_lense.externalLense
  );
  const FrameInvoiceList = useSelector(
    (state: RootState) => state.invoice_frame_filer.selectedFrameList
  );
  const LenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_lense_filer.selectedLenses
  );
  const calculateTotal = (list: any[]) => {
    return list.reduce((acc, row) => {
      const rowTotal = parseInt(row.price) * row.buyQty;
      return acc + rowTotal;
    }, 0);
  };
  const frameTotal = calculateTotal(Object.values(FrameInvoiceList));
  const lenseTotal = calculateTotal(Object.values(LenseInvoiceList));
  const ExtraTotal = calculateExternalLensTotal(
    Object.values(externalLenseInvoiceList)
  );
  //calcuate Total
  const subtotal = frameTotal + lenseTotal + ExtraTotal;
  const grandTotal = subtotal - watch("discount");

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
            <TableCell>Remove</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(FrameInvoiceList)?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this item?"
                      )
                    ) {
                      dispatch(removeFrame(row.id));
                    }
                  }}
                >
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

          {Object.values(LenseInvoiceList)?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this item?"
                      )
                    ) {
                      dispatch(removeLense(row.id));
                    }
                  }}
                >
                  <Delete color="error" />
                </IconButton>
              </TableCell>

              <TableCell>
                {`${row?.type_name} / ${row.coating_name} / ${
                  row.brand_name
                } / ${row?.stock[0]?.powers
                  ?.map((power) => {
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
          {/* //! External Invoice */}
          {Object.values(externalLenseInvoiceList)?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to Remove this item?"
                      )
                    ) {
                      dispatch(removeexternalLense(row.id));
                    }
                  }}
                >
                  <Delete color="error" />
                </IconButton>
              </TableCell>

              <TableCell>{`${row.lensNames.typeName} / ${row.lensNames.brandName} /${row.lensNames.coatingName} `}</TableCell>

              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.price_per_unit}</TableCell>
              <TableCell align="right">{row.subtotal}</TableCell>
            </TableRow>
          ))}
          {/* //! External Invoice */}

          <TableRow>
            <TableCell rowSpan={4} />
            <TableCell rowSpan={4} />
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
                {...register("discount")}
                sx={{ width: "100%" }} // Optional for full width
                type="number"
                inputProps={{ style: { textAlign: "right" }, min: 0 }} // Correct way
                onFocus={(e) => {
                  if (e.target.value === "0") {
                    setValue("discount", "");
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setValue("discount", "0");
                  }
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={2}>
              Total
            </TableCell>
            <TableCell align="right">{grandTotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }} align="right" colSpan={2}>
              Balance
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              {grandTotal -
                (parseInt(watch("online_transfer") || 0) +
                  parseInt(watch("credit_card") || 0) +
                  parseInt(watch("cash") || 0))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
