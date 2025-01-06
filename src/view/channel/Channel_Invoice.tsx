import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  TextField,
  
} from "@mui/material";

function Channel_Invoice() {
  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
        
      }}
    >
      <Paper elevation={3} sx={{ width: "600px", padding: 3, border:"1px solid black", }}>
        <Typography variant="h6" align="center">
          VISION PLUS OPTICIANS (PVT) LTD
        </Typography>
        <Typography variant="subtitle2" align="center">
          34, Aluthgama Road, Mathugama
        </Typography>
        <Typography variant="subtitle2" align="center">
          November 6, 2024 | Tel: 034-2234569 / 071-7353639
        </Typography>

        <Box mt={2} display="flex" pl={2} gap={2}>
        <Typography variant="body2">
                Channel No: <strong>12345</strong>
              </Typography>

              <Typography variant="body2" paddingLeft={20}>
                Channel Date: <strong>2024-11-06</strong>
              </Typography>

        </Box>

        <Box mt={2}>
        <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Name of Doctor</TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="doctorName"

                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Consultant Fee</TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="consultantFee"
                      type="number"
                      
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Establishment Fee</TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="establishmentFee"
                      type="number"
                     
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="total"
                      type="number"
                     
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Paid</TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="paid"
                      type="number"
                      
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
          
        

        <Box mt={3} display="flex" justifyContent="center">
          <Button variant="contained" color="primary">
            Print Invoice
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Channel_Invoice;