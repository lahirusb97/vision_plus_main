import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import LoopIcon from "@mui/icons-material/Loop";

const LensStore = () => {
  const frames = [
    {
      lenstype: "Bifocal",
      coating: "Blu cut",
      SPH: "-2.50",
      CYL: "-2.00",
      ADD: "-",
      lensbrand: "eselar",
      price: 1000,
      stocklimit: 50,
      quantity: 4745,
    },
  ];

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: "100vh",
        gap: 2,
      }}
    >
      {/* Table Section */}
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, width: "1050px" }}
      >
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Lens type</TableCell>
              <TableCell align="center">Coating</TableCell>
              <TableCell align="center">SPH</TableCell>
              <TableCell align="center">CYL</TableCell>
              <TableCell align="center">ADD</TableCell>
              <TableCell align="center">Lens Brand</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Stock limit</TableCell>
              <TableCell align="center">Quantity</TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody sx={{ marginTop: 12 }}>
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
                  <IconButton title="Lens Quantity Update">
                    <LoopIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">{frame.lenstype}</TableCell>
                <TableCell align="center">{frame.coating}</TableCell>
                <TableCell align="center">{frame.SPH}</TableCell>
                <TableCell align="center">{frame.CYL}</TableCell>
                <TableCell align="center">{frame.ADD}</TableCell>
                <TableCell align="center">{frame.lensbrand}</TableCell>
                <TableCell align="center">{frame.price}</TableCell>
                <TableCell align="center">{frame.stocklimit}</TableCell>
                <TableCell align="center">{frame.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LensStore;
