import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import LoopIcon from "@mui/icons-material/Loop";

const LensStore = () => {
  const frames = [
    {
      itemname: "lens clenner",
      price: 1000,
      quantity: 453,
    },
  ];

  return (
    <Box
      sx={{
        padding: 4,
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
              <TableCell align="center">Item Name</TableCell>
              <TableCell align="center">Price</TableCell>
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
                <TableCell align="center">{frame.itemname}</TableCell>
                <TableCell align="center">{frame.price}</TableCell>
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
