import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';

const Channel_Invoice = () => {
  return (
    <Box
      sx={{
        padding: '20px',
        maxWidth: '800px',
        margin: 'auto',
        border: '1px solid black',
        borderRadius: '8px',
        marginTop:'20px',
      }}
    >
      
      <TableContainer>
      <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
        VISION PLUS OPTICLANS (PVT) LTD
      </Typography>
      <Typography align="center">Tel: 034 2247354 / 077 7854695</Typography>

      <Table>
        <TableBody>
          
          <TableRow sx={{ gap:'2' }}>
            <TableCell align="left" sx={{ border: "none", padding: "5px 10px " }}>
              <Typography>
                <strong>Invoice No:</strong> 584644
              </Typography>
            </TableCell>
            <TableCell align="left" sx={{ border: "none", padding: "5px 10px" }}>
              <Typography>No: 34, Aluthgama Road,</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left" sx={{ border: "none", padding: "5px 10px" }}>
              <Typography>
                <strong>Customer Name:</strong> Dinuka Sadaruwan
              </Typography>
            </TableCell>
            <TableCell align="left" sx={{ border: "none", padding: "5px 10px" }}>
              <Typography>Mathugama,</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left" sx={{ border: "none", padding: "5px 10px" }}>
              <Typography>
                <strong>Address:</strong> No: 25/A Agalawatte Road, Yatiyana
              </Typography>
            </TableCell>
            <TableCell align="left" sx={{ border: "none", padding: "5px 10px" }}>
              <Typography>Sri Lanka</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left" sx={{ border: "none", padding: "5px 10px " }}>
              <Typography>
                <strong>Phone Number:</strong> +9477152625
              </Typography>
            </TableCell>
            <TableCell align="left" sx={{ border: "none", padding: "5px 10px" }}>
              <Typography>November 05th, 2024</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
      

      
      <TableContainer sx={{ marginTop:'30px', }} component={Paper}>
        <Table sx={{ border:'1px solid black'}}>
          <TableHead >
            <TableRow sx={{ borderBottom:"1px solid black" }} >
              <TableCell sx={{ borderBottom:"1px solid black" }}><strong>Items Name</strong></TableCell>
              <TableCell sx={{ borderBottom:"1px solid black" }}align="center"><strong>Quantity</strong></TableCell>
              <TableCell sx={{ borderBottom:"1px solid black" }}align="right"><strong>Price</strong></TableCell>
              <TableCell sx={{ borderBottom:"1px solid black" }}align="right"><strong>Last Price</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ borderBottom:'1px solid black' }}>
              <TableCell sx={{ borderBottom:"1px solid black" }}><strong>Blucut Photocromic</strong></TableCell>
              <TableCell sx={{ borderBottom:"1px solid black" }}align="center"><strong>1</strong></TableCell>
              <TableCell sx={{ borderBottom:"1px solid black" }}align="right"><strong>5000.00</strong></TableCell>
              <TableCell sx={{ borderBottom:"1px solid black" }}align="right"><strong>5000.00</strong></TableCell>
            </TableRow>
            <TableRow sx={{ border:'1px solid black' }}>
              <TableCell sx={{ borderBottom:"1px solid black" }}><strong>Rover</strong></TableCell>
              <TableCell sx={{ borderBottom:"1px solid black" }} align="center"><strong>1</strong></TableCell>
              <TableCell sx={{ borderBottom:"1px solid black" }} align="right"><strong>5000.00</strong></TableCell>
              <TableCell sx={{ borderBottom:"1px solid black" }} align="right"><strong>5000.00</strong></TableCell>
            </TableRow>
            <TableRow sx={{ border:'1px solid black' }}>
            <TableCell sx={{ borderBottom:"1px solid black" }} colSpan={3}><strong>Full Amount</strong></TableCell>
              
              <TableCell sx={{ borderBottom:"1px solid black" }} align="right"><strong>10000.00</strong></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{ borderBottom:"1px solid black" }} colSpan={3}><strong>Discount</strong></TableCell>
              
              <TableCell sx={{ borderBottom:"1px solid black" }} align="right"><strong>1000.00</strong></TableCell>
            </TableRow>
            <TableRow sx={{ border:'1px solid black' }}>
            <TableCell sx={{ borderBottom:"1px solid black" }} colSpan={3}><strong>Cash / Card</strong></TableCell>
              
              <TableCell sx={{ borderBottom:"1px solid black" }} align="right"><strong>10000.00</strong></TableCell>
            </TableRow>
            <TableRow sx={{ border:'1px solid black' }}>
            <TableCell sx={{ borderBottom:"1px solid black" }} colSpan={3}><strong>Balance</strong></TableCell>
              
              <TableCell sx={{ borderBottom:"1px solid black" }} align="right"><strong>9000.00</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      
      <Typography variant="body2" align="center" sx={{ marginTop: '20px' }}>
       <strong> Each of these brands has strengths that cater to specific user needs, so consider what aligns best with your
        priorities—whether that’s speed, endurance, affordability, or brand support.</strong>
      </Typography>
    </Box>
  );
};

export default Channel_Invoice;