import React from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import LoopIcon from "@mui/icons-material/Loop";

const FrameStore = () => {
  const frames = [
    {
      brand: "Rover",
      code: "1542",
      color: "green",
      species: "Metal",
      shape: "full",
      price: 1000,
      stockLimit: 20,
      quantity: 58,
    },
  ];

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: "100vh",
        gap:2,
        
      }}
    >
      

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, width:"1000px"   }}>
        <Table>
          {/* Table Header */}
          <TableHead >
            <TableRow>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Code</TableCell>
              <TableCell align="center">Color</TableCell>
              <TableCell align="center">Species</TableCell>
              <TableCell align="center">Shape</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Stock Limit</TableCell>
              <TableCell align="center">Quantity</TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody sx={{marginTop: 12}} >
            {frames.map((frame, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  <IconButton title="Delete">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton title="History">
                    <HistoryIcon />
                  </IconButton>
                  <IconButton title="Price and Stock Limit Edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton title="Frames Quantity Update">
                    <LoopIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">{frame.brand}</TableCell>
                <TableCell align="center">{frame.code}</TableCell>
                <TableCell align="center">{frame.color}</TableCell>
                <TableCell align="center">{frame.species}</TableCell>
                <TableCell align="center">{frame.shape}</TableCell>
                <TableCell align="center">{frame.price}</TableCell>
                <TableCell align="center">{frame.stockLimit}</TableCell>
                <TableCell align="center">{frame.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FrameStore;
