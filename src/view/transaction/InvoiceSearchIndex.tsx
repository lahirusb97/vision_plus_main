import {
  Button,
  TextField,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getBranchName } from "../../utils/branchName";

export default function InvoiceSearchIndex() {
  const [searchQuery, setSearchQuery] = useState(`${getBranchName()}`);
  const [invoiceType, setInvoiceType] = useState<"normal" | "factory">(
    "normal"
  );
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let path = "";
    const queryParam = `?invoice_number=${encodeURIComponent(searchQuery)}`;

    if (invoiceType === "normal") {
      path = `/transaction/normal_order/view/${queryParam}`;
    } else {
      path = `/transaction/invoice/view/${searchQuery}${queryParam}`;
    }

    navigate(path);
  };

  return (
    <Paper
      variant="elevation"
      sx={{ p: 4, width: 500, minHeight: 200, mt: 10 }}
    >
      <Typography variant="h6" gutterBottom>
        Search Invoice
      </Typography>

      <form onSubmit={handleSearch}>
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <FormLabel component="legend">Invoice Type</FormLabel>
          <RadioGroup
            row
            value={invoiceType}
            onChange={(e) =>
              setInvoiceType(e.target.value as "normal" | "factory")
            }
          >
            <FormControlLabel
              value="normal"
              control={<Radio />}
              label="Normal Invoice"
            />
            <FormControlLabel
              value="factory"
              control={<Radio />}
              label="Factory Invoice"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Order Invoice Number"
          variant="outlined"
          placeholder="Enter Order Number"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Search
        </Button>
      </form>
    </Paper>
  );
}
