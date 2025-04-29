import { useState } from "react";
import useGetOtherItem from "../hooks/useGetOtherItem";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Stack,
  Chip,
  Grid,
} from "@mui/material";
import { OtherItemModel } from "../model/OtherItemModel";
import { numberWithCommas } from "../utils/numberWithCommas";

interface InvoiceOtherItemsProps {
  onAddItem: (item: OtherItemModel, qty: number, price: number) => void;
}

export default function InvoiceOtherItems({
  onAddItem,
}: InvoiceOtherItemsProps) {
  const [selectedItem, setSelectedItem] = useState<OtherItemModel | null>(null);
  const [qty, setQty] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);

  const { otherItem, otherItemLoading, searchOtherItem } = useGetOtherItem();

  const handleAddItem = () => {
    if (!selectedItem) return;

    // Dispatch action to add item to parent reducer
    onAddItem(selectedItem, qty, price);
    setSelectedItem(null);
    setQty(1);
    setPrice(0);
  };

  return (
    <Paper sx={{ padding: 1, mt: 1 }}>
      <Typography variant="h6" mb={2} color="primary">
        Select Item to Add
      </Typography>

      <Autocomplete
        size="small"
        loading={otherItemLoading}
        options={otherItem}
        getOptionLabel={(option) => option.item.name}
        isOptionEqualToValue={(option, value) =>
          option.item.id === value.item.id
        }
        onInputChange={(_, value) => searchOtherItem(value)}
        value={selectedItem}
        onChange={(_, newValue) => {
          setSelectedItem(newValue);
          if (newValue) setPrice(parseFloat(newValue.item.price));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for Items"
            fullWidth
            variant="outlined"
            color="primary"
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Typography>{option.item.name}</Typography>
              <Chip
                label={`Rs ${numberWithCommas(option.item.price)}`}
                size="small"
                color="secondary"
              />
            </Stack>
          </li>
        )}
      />

      {selectedItem && (
        <Box mt={2} display="flex" gap={1} alignItems="center">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                size="small"
                label="Quantity"
                type="number"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                inputProps={{ min: 1 }}
                fullWidth
                variant="outlined"
                color="primary"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                label="Unit Price"
                type="number"
                value={price.toFixed(2)}
                onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
                InputProps={{
                  startAdornment: <Typography>Rs</Typography>,
                }}
                fullWidth
                variant="outlined"
                color="primary"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                label="Subtotal"
                value={(qty * price).toFixed(2)}
                InputProps={{
                  readOnly: true,
                  startAdornment: <Typography>Rs</Typography>,
                }}
                fullWidth
                variant="outlined"
                color="primary"
              />
            </Grid>
          </Grid>
        </Box>
      )}

      <Box mt={1} textAlign="right">
        <Button
          variant="contained"
          onClick={handleAddItem}
          color="primary"
          disabled={!selectedItem || qty <= 0 || price <= 0}
          size="small"
        >
          Add to Invoice
        </Button>
      </Box>
    </Paper>
  );
}
