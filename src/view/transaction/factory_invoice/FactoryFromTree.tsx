import React, { useState } from "react";
import {
  Input,
  Box,
  Button,
  Paper,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";
import CashInput from "../../../components/inputui/CashInput";
import CardInput from "../../../components/inputui/CardInput";

export default function FactoryFromTree({ handleNext, handleBack }) {
  const selectedFrameList = useSelector(
    (state) => state.invoice_frame_filer.selectedFrameList
  );
  const totalPrice = selectedFrameList.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  const [discount, setDiscount] = useState(0);
  const [cash, setcash] = useState(0);
  const [card, setCard] = useState(0);
  const [firstPay, setFirstPay] = useState(0);

  return (
    <div style={{ width: "1200px" }}>
      <Grid container spacing={2} justifyContent="flex-start">
        {selectedFrameList.map((frame, index) => (
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              padding: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: 1,
              alignItems: "center",
            }}
          >
            <Typography variant="body2">Code: {frame.code}</Typography>
            <Typography variant="body2">Brand: {frame.brand}</Typography>
            <Typography variant="body2">Color: {frame.color}</Typography>
            <Typography variant="body2">Size: {frame.size}</Typography>
            <Typography variant="body2">Price: {frame.price}</Typography>
          </Paper>
        ))}
      </Grid>
      <Paper sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Paper sx={inputStyle2}>
          <Typography>Total Price</Typography>
          <Typography>{totalPrice}</Typography>
        </Paper>
        <Paper sx={inputStyle2}>
          <Paper sx={inputStyle2}>
            <Typography>Discout</Typography>
          </Paper>
          <Paper>
            <Input
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              type="number"
            />
          </Paper>
        </Paper>
        <Paper sx={inputStyle2}>
          <Paper sx={inputStyle2}>
            <Typography>First Payment </Typography>
          </Paper>
          <Paper>
            <Input
              value={firstPay}
              onChange={(e) => setFirstPay(Number(e.target.value))}
              type="number"
            />
          </Paper>
        </Paper>
        <Paper sx={inputStyle2}>
          <Typography>Blance</Typography>
          <Typography>
            {totalPrice - (discount + card + cash + firstPay)}
          </Typography>
        </Paper>
      </Paper>
      <div style={{ display: "flex", padding: 10 }}>
        <CashInput cash={cash} setcash={setcash} />
        <CardInput card={card} setCard={setCard} />
      </div>
      <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
        <Button onClick={handleBack} variant="contained">
          Back
        </Button>
        <Button type="submit" variant="contained">
          Submite
        </Button>
      </Box>
    </div>
  );
}
const inputStyle2 = {
  Width: 600,
  padding: 1,
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
  gap: 2,
};
