import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { RootState } from "../../store/store";
import { setdoctorClaimItem } from "../../features/invoice/doctorClaimSlice";
import stringToIntConver from "../../utils/stringToIntConver";
import { numberWithCommas } from "../../utils/numberWithCommas";

interface DoctorClaimItem {
  id: number;
  quantity: number;
  price_per_unit: string;
  subtotal: number;
  details: string;
}

const DoctorClaimItem: React.FC = () => {
  const dispatch = useDispatch();
  const doctorClaimPayload = useSelector(
    (state: RootState) => state.doctor_claim_invoice.doctorClaimPayload
  );
  const invoiceItems = doctorClaimPayload?.invoiceItems || [];

  const [form, setForm] = useState<Omit<DoctorClaimItem, "id" | "subtotal">>({
    details: "",
    quantity: 1,
    price_per_unit: "",
  });

  const subtotal =
    form.quantity * stringToIntConver(form.price_per_unit || "0");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price_per_unit" ? value : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: invoiceItems.length + 1,
      quantity: form.quantity,
      price_per_unit: stringToIntConver(form.price_per_unit),
      subtotal,
      details: form.details,
    };

    dispatch(setdoctorClaimItem(newItem));
    console.log(newItem);
    setForm({
      details: "",
      quantity: 1,
      price_per_unit: "",
    });
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 1200, mx: "auto", mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add Doctor Claim Item
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", gap: 1, alignItems: "center" }}
        onSubmit={handleSubmit}
      >
        <TextField
          size="small"
          label="Details"
          name="details"
          value={form.details}
          onChange={handleChange}
          margin="normal"
          sx={{ width: "400px" }}
          required
        />
        <TextField
          size="small"
          label="Quantity"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          inputProps={{ min: 1 }}
          margin="normal"
          required
        />
        <TextField
          size="small"
          label="Price per Unit"
          name="price_per_unit"
          type="number"
          value={form.price_per_unit}
          onChange={handleChange}
          inputProps={{ min: 0 }}
          margin="normal"
          required
        />
        <Box mt={2} mb={2}>
          <Typography>
            <strong>Subtotal:</strong> {numberWithCommas(subtotal)}
          </Typography>
        </Box>
        <Button
          size="small"
          variant="contained"
          color="primary"
          type="submit"
          sx={{ py: 1.5, fontWeight: 600, width: 200 }}
        >
          Add
        </Button>
      </Box>
    </Paper>
  );
};

export default DoctorClaimItem;
