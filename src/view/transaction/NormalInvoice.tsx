import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/AddBox";
import CashInput from "../../components/inputui/CashInput";
import CardInput from "../../components/inputui/CardInput";
import { useNavigate } from "react-router";

const TransactionUI = () => {
  const lensOptions = ["Option 1", "Option 2", "Option 3"]; // Replace with actual options
const navigate = useNavigate();
  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 2000,
        margin: "0 auto",
        borderRadius: 2,
      }}
    >
      {/* Row 1: Name, Phone No, Address, Sales Staff Code */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 2,
          marginLeft: 4,
          marginRight: 4,
        }}
      >
        <Paper sx={{ flex: 1, padding: 2, width: "100px", height: "30px" }}>
          <Typography>Name</Typography>
        </Paper>
        <Paper sx={{ flex: 1, padding: 2, width: "100px", height: "30px" }}>
          <Typography>Phone No</Typography>
        </Paper>
        <Paper sx={{ flex: 1, padding: 2, width: "100px", height: "30px" }}>
          <Typography>Address</Typography>
        </Paper>
        <Paper sx={{ flex: 1, padding: 2, width: "100px", height: "30px" }}>
          <Typography>Sales Staff Code</Typography>
        </Paper>
      </Box>

      {/* Row 2: Lens Cleaner Dropdown and Price */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 2,
          marginLeft: 4,
          marginRight: 4,
        }}
      >
        <TextField select label="Lens Cleaner" fullWidth sx={{ flex: 1 }}>
          {lensOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Paper sx={{ flex: 1, padding: 2 }}>
          <Typography>Price</Typography>
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          size="large"
          aria-label="add"
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Row 3: Full Amount, Discount, First Payment, Balance */}

      <Box
        sx={{
          padding: 4,
          maxWidth: 2000,
          margin: "0 auto",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* Full Amount */}
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            width: "1000px",
          }}
        >
          <Typography sx={{ fontSize: 16 }}>Full Amount</Typography>
          <TextField
            type="number"
            value="1000"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
            variant="standard"
            sx={{ textAlign: "right", maxWidth: 150 }}
          />
        </Paper>

        {/* Discount */}
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography sx={{ fontSize: 16 }}>Discount</Typography>
          <TextField
            type="number"
            value="1000"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
            variant="standard"
            sx={{ textAlign: "right", maxWidth: 150 }}
          />
        </Paper>

        {/* First Payment */}
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography sx={{ fontSize: 16 }}>First Payment</Typography>
          <TextField
            type="number"
            value="1000"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
            variant="standard"
            sx={{ textAlign: "right", maxWidth: 150 }}
          />
        </Paper>

        {/* Balance */}
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography sx={{ fontSize: 16 }}>Balance</Typography>
          <TextField
            type="number"
            value="1000"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
            variant="standard"
            sx={{ textAlign: "right", maxWidth: 150 }}
          />
        </Paper>
      </Box>

      {/* Row 4: Payment Methods (Cash and Card) */}

      <Box display="flex" flexDirection="row" gap={10} marginLeft="50px">
        <CashInput />
        <CardInput />
      </Box>

      {/* Save Button */}
      <Box
        sx={{ display: "flex", justifyContent: "right", marginRight: "30px" }}
      >
        <Button
          variant="contained"
          color="secondary"
          sx={{ backgroundColor: "#D4B4DC" }}
    
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionUI;
