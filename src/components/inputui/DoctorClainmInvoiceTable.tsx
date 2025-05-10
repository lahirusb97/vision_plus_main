import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { removeFrame } from "../../features/invoice/frameFilterSlice";
import { removeLense } from "../../features/invoice/lenseFilterSlice";
import { useFormContext } from "react-hook-form";
import { removeexternalLense } from "../../features/invoice/externalLenseSlice";

import DiscountInput from "./DiscountInput";

export default function DoctorClainmInvoiceTable() {
  const { watch } = useFormContext();

  const dispatch = useDispatch();
  const externalLenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_external_lense.externalLenseList
  );
  const ExtraTotal = useSelector(
    (state: RootState) => state.invoice_external_lense.externalLenseSubTotal
  );
  const FrameInvoiceList = useSelector(
    (state: RootState) => state.invoice_frame_filer.selectedFrameList
  );
  const LenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_lense_filer.selectedLensesList
  );
  const lenseTotal = useSelector(
    (state: RootState) => state.invoice_lense_filer.lenseSubTotal
  );

  const frameTotal = useSelector(
    (state: RootState) => state.invoice_frame_filer.framesubTotal
  );

  //calcuate Total
  const discount = watch("discount") || 0;
  const subtotal = frameTotal + lenseTotal + ExtraTotal;
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
            <TableCell>Remove</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="center">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(FrameInvoiceList)?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this item?"
                      )
                    ) {
                      dispatch(removeFrame(row.frame_id));
                    }
                  }}
                >
                  <Delete sx={{ fontSize: "1rem" }} color="error" />
                </IconButton>
              </TableCell>

              <TableCell>{`${row.frame_detail.brand_name} / ${row.frame_detail.code_name} / ${row.frame_detail.color_name} / ${row.frame_detail.species} / ${row.frame_detail.brand_type_display}`}</TableCell>
              <TableCell align="center">{row.buyQty}</TableCell>
              <TableCell align="right">{row.price_per_unit}</TableCell>
              <TableCell align="right">{row.subtotal}</TableCell>
            </TableRow>
          ))}

          {Object.values(LenseInvoiceList)?.map((row) => (
            <TableRow key={row.lense_id}>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this item?"
                      )
                    ) {
                      dispatch(removeLense(row.lense_id));
                    }
                  }}
                >
                  <Delete sx={{ fontSize: "1rem" }} color="error" />
                </IconButton>
              </TableCell>

              <TableCell>
                {`${row?.lense_detail.type_name} / ${
                  row.lense_detail.coating_name
                } / ${row.lense_detail.brand_name} / ${row?.lense_detail.powers
                  ?.map((power) => {
                    return `${power.power_name.toUpperCase()}: ${power.value}`; // For ADD (Addition)
                  })
                  .join(" / ")} `}
              </TableCell>

              <TableCell align="center">{row.buyQty}</TableCell>
              <TableCell align="right">{row.price_per_unit}</TableCell>
              <TableCell align="right">{row.subtotal}</TableCell>
            </TableRow>
          ))}
          {/* //! External Invoice */}
          {Object.values(externalLenseInvoiceList)?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to Remove this item?"
                      )
                    ) {
                      dispatch(removeexternalLense(row.external_lens_id));
                    }
                  }}
                >
                  <Delete sx={{ fontSize: "1rem" }} color="error" />
                </IconButton>
              </TableCell>

              <TableCell
                sx={{
                  whiteSpace: "normal",
                  wordBreak: "break-word", // ensures long words or URLs break to the next line
                }}
              >{`${row.external_lens_details.type_name} / ${
                row.external_lens_details.brand_name
              } /${row.external_lens_details.coating_name} /${
                row.note !== null ? row.note : ""
              } `}</TableCell>

              <TableCell align="center">{row.buyQty}</TableCell>
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
              <DiscountInput />
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
              Current Payment
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              {parseInt(watch("online_transfer") || 0) +
                parseInt(watch("credit_card") || 0) +
                parseInt(watch("cash") || 0)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }} align="right" colSpan={4}>
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
