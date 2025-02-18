import { ChangeEvent, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const PaymentUI = () => {
  const [secondPayment, setSecondPayment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const fullAmount = 4000;
  const discount = 1000;
  const firstPayment = 1000;
  const balance = fullAmount - discount - firstPayment;
  const secondBalance = balance - (secondPayment ? parseInt(secondPayment) : 0);

  const handleSecondPaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSecondPayment(event.target.value);
  };

  const handleSave = () => {
    console.log("Second Payment:", secondPayment);
  };

  // function handleSearch(event) {
  //   console.log(event);
  // }

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 4, p: 4, borderRadius: 2, width: "800px" }}
    >
      <Box display="flex" justifyContent="center" mb={2}>
        <TextField
          label="Factory Invoice / Normal Invoice / Phone No"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <Button>
                <i className="fas fa-search"></i>
              </Button>
            ),
          }}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            width: "100%",
          }}
        >
          <Typography sx={{ fontSize: 16 }}>Name</Typography>
          <Typography sx={{ fontSize: 16 }}>Full Amount</Typography>
        </Paper>
        <Button variant="contained" color="success" sx={{ height: "56px" }}>
          Show Receipt
        </Button>
      </Box>

      <Box
        sx={{
          padding: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#fff",
        }}
      >
        {/* Full Amount */}
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography sx={{ fontSize: 16 }}>Full Amount</Typography>
          <Typography sx={{ fontSize: 16 }}>{fullAmount}</Typography>
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
          <Typography sx={{ fontSize: 16 }}>{discount}</Typography>
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
          <Typography sx={{ fontSize: 16 }}>{firstPayment}</Typography>
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
          <Typography sx={{ fontSize: 16 }}>{balance}</Typography>
        </Paper>

        {/* Second Payment*/}
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography sx={{ fontSize: 16 }}>Second Payment</Typography>
          <TextField
            type="number"
            value={secondPayment}
            onChange={handleSecondPaymentChange}
            variant="outlined"
            sx={{ maxWidth: 150 }}
          />
        </Paper>

        {/* Second Balance */}
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography sx={{ fontSize: 16 }}>Second Balance</Typography>
          <Typography sx={{ fontSize: 16 }}>{secondBalance}</Typography>
        </Paper>
      </Box>

      {/* Save Button */}
      <Box mt={4} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ backgroundColor: "#D4B4DC" }}
        >
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentUI;
