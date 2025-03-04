import React, { useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";

const Invoice = ({ invoiceDetails }) => {
  const componentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });

  return (
    
    
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
      
        <Box
          sx={{
            p: 4,
            width: "210mm", // A5 width
            minHeight: "148mm", // A5 height
            margin: "0 auto",
            border: "1px solid #000",
            fontFamily: "Arial, sans-serif",
            "@media print": {
              width: "210mm",
              minHeight: "148mm",
              border: "none",
              margin: "0",
              padding: "2mm",
            },
          }}
        ref={componentRef}>
        
        {/* Header Section */}
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          Date: 2025.02.15 &nbsp;&nbsp;&nbsp;&nbsp; Time: 10.30 a.m
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold", mt: 2 }}>
          VISION PLUS OPTICIANS (PVT) LTD
        </Typography>

        <Grid container spacing={2} mt={2}>
          {/* Left Section - Main Invoice */}
          <Grid item xs={8}>
            {/* Prescription Table */}
            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={3}
                      sx={{ fontWeight: "bold" }}
                    >
                      Right Eye
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={3}
                      sx={{ fontWeight: "bold" }}
                    >
                      Left Eye
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>SPH</TableCell>
                    <TableCell>CYL</TableCell>
                    <TableCell>AXIS</TableCell>
                    <TableCell>SPH</TableCell>
                    <TableCell>CYL</TableCell>
                    <TableCell>AXIS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Plano</TableCell>
                    <TableCell>-0.50</TableCell>
                    <TableCell>120</TableCell>
                    <TableCell>Plano</TableCell>
                    <TableCell>-0.50</TableCell>
                    <TableCell>120</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>+2.50</TableCell>
                    <TableCell colSpan={5}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Invoice Number */}
            <Box
              sx={{
                backgroundColor: "black",
                padding: 1,
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold", flex: 1 }}>
                Invoice Number
              </Typography>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "5px 10px",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  65644
                </Typography>
              </Box>
            </Box>

            {/* Remark Field */}
            <Box
              sx={{
                backgroundColor: "black",
                padding: 1,
                color: "white",
                mt: 2,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Remark
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: "white", mt: 1 }}
              />
            </Box>

            {/* Payment Details */}
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Payment Details:
              </Typography>
              <Typography variant="body2">
                Full Amount - Rs. 10,000.00
              </Typography>
              <Typography variant="body2">
                1st Payment - Rs. 5,000.00
              </Typography>
              <Typography variant="body2">Balance - Rs. 5,000.00</Typography>
            </Box>
          </Grid>

          {/* Right Section - Invoice Summary */}
          <Grid item xs={4}>
            <Paper
              sx={{
                padding: 2,
                backgroundColor: "#fff",
                border: "1px solid black",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  backgroundColor: "black",
                  color: "white",
                  padding: 1,
                }}
              >
                65644
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold", mt: 2 }}>
                Name: Mr. Nandasena Perera
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
                Staff Member: Mr. Nithini
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
                Refraction: Mr. Piumi
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: "bold", mt: 2 }}>
                Frame:
              </Typography>
              <Typography variant="body2">- Crown 8005</Typography>
              <Typography variant="body2">- Black</Typography>
              <Typography variant="body2">- Metal Frame</Typography>
              <Typography variant="body2">- Full Frame</Typography>

              <Typography variant="body2" sx={{ fontWeight: "bold", mt: 2 }}>
                Lens:
              </Typography>
              <Typography variant="body2">- Lanka Optic</Typography>
              <Typography variant="body2">- Single Vision</Typography>
              <Typography variant="body2">- Bluecut</Typography>
            </Paper>
          </Grid>
        </Grid>
        </Box>
    

      {/* Print Button */}
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => reactToPrintFn()}
          sx={{ mt: "2mm" }}
        >
          Print Invoice
        </Button>
      </Box>
    </Box>
  );
};

export default Invoice;
