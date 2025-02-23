import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  TableHead,
} from "@mui/material";
import { useLocation } from "react-router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const InvoiceView = () => {
  const location = useLocation();
  const { lense, frame, order, patient } = location.state || {};

  const componentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });
  console.log(order);

  return (
    <div>
      <Box
        sx={{
          p: 4,
          maxWidth: 700,
          margin: "auto",
          border: "1px solid black",
          marginTop: "20px",
        }}
        ref={componentRef}
      >
        {/* Logo and Header */}
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <img
            src="\src\assets\defalt\Rectangle 522.png"
            alt="Vision Plus Logo"
            style={{ height: 50 }}
          />
        </Box>

        <Typography variant="h5" align="center" fontWeight="bold">
          VISION PLUS OPTICIANS (PVT) LTD
        </Typography>
        <Typography variant="body1" align="center">
          Tel: 034 2247354 / 077 7854695
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="body2">
              <strong>Invoice No:</strong> 584644
            </Typography>
            <Typography variant="body2">
              <strong>Customer Name:</strong> {patient.name}
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> {patient.address}
            </Typography>
            <Typography variant="body2">
              <strong>Phone Number:</strong> {patient.phone_number}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body2">No: 34, Aluthgama Road</Typography>
            <Typography variant="body2">Mathugama</Typography>
            <Typography variant="body2">Sri Lanka</Typography>
            <Typography variant="body2">November 05, 2024</Typography>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table
            size="small"
            sx={{ minWidth: 700, maxWidth: "1200px" }}
            aria-label="spanning table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Desc</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(frame).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{`${row.brand_name} / ${row.code_name} / ${row.color_name} / ${row.species}`}</TableCell>
                  <TableCell align="right">{row.buyQty}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">
                    {parseInt(row.price) * row.buyQty}
                  </TableCell>
                </TableRow>
              ))}
              {Object.values(lense).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {`${row.stock.lens_type} / ${
                      row.stock.coating
                    } / ${row.powers
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
              {/* {Object.values(OtherInvoiceList).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <IconButton
                      onClick={() => dispatch(removeOtherItem(row.id))}
                    >
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
              ))} */}
              <TableRow>
                <TableCell rowSpan={3} />

                <TableCell align="right" colSpan={2}>
                  Subtotal
                </TableCell>
                <TableCell align="right">{order.sub_total}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1} />
                <TableCell align="right">Discounts</TableCell>
                <TableCell align="right">{order.discount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right" colSpan={2}>
                  Total
                </TableCell>
                <TableCell align="right">{order.total_price}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer Note */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, fontWeight: "Bold" }}
        >
          Each of these brands has strengths that cater to specific user needs.
          Consider what aligns best with your priorities—whether speed,
          endurance, affordability, or brand support.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => reactToPrintFn()}
        sx={{ mt: 2 }}
      >
        Print Invoice
      </Button>
    </div>
  );
};

export default InvoiceView;
