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
import { parseInt } from "lodash";
import { HearingItemStockSerializer } from "../model/HearingtemStockSerializer";
import useGetHearingItem from "../hooks/useGetHearingItem";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface InvoiceOtherItemsProps {
  onAddItem: (
    item: HearingItemStockSerializer,
    qty: number,
    price: number,
    serialNo: string,
    battery: string,
    nextServiceDate: string | null,
  ) => void;
}

export default function InvoiceHearingItems({
  onAddItem,
}: InvoiceOtherItemsProps) {
  const [selectedItem, setSelectedItem] =
    useState<HearingItemStockSerializer | null>(null);
  // const [qty, setQty] = useState<string>("1");
  const [price, setPrice] = useState<string>("");
  const [serialNo, setSerialNo] = useState<string>("");
  const [battery, setBattery] = useState<string>("");
  const [nextServiceDate, setNextServiceDate] = useState<Dayjs | null>(null);

  const { hearingItem, hearingItemLoading, searchHearingItem } =
    useGetHearingItem();

  const handleAddItem = () => {
    if (!selectedItem) return;

    // Dispatch action to add item to parent reducer
    onAddItem(selectedItem, Number(1), Number(price || 0), serialNo, battery, nextServiceDate?.format("YYYY-MM-DD") || null);
    setSelectedItem(null);
    // setQty("1");
    setPrice("");
    setSerialNo("");
    setBattery("");
    setNextServiceDate(null);
  };

  return (
    <Paper sx={{ padding: 1, mt: 1 }}>
      <Typography variant="h6" mb={2} color="primary">
        Select Item to Add
      </Typography>

      <Autocomplete
        size="small"
        loading={hearingItemLoading}
        options={hearingItem}
        getOptionLabel={(option) => option.item.name}
        isOptionEqualToValue={(option, value) =>
          option.item.id === value.item.id
        }
        onInputChange={(_, value) => searchHearingItem(value)}
        value={selectedItem}
        onChange={(_, newValue) => {
          setSelectedItem(newValue);
          if (newValue) setPrice(newValue.item.price.toString());
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
        renderOption={(props, option) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { key, ...otherProps } = props;
          return (
            <li key={option.item.id} {...otherProps}>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Typography>
                  {option.item.name} | {option.item.code}
                </Typography>
                <Chip
                  label={`Rs ${numberWithCommas(option.item.price)}`}
                  size="small"
                  color="secondary"
                />
              </Stack>
            </li>
          );
        }}
      />

      {selectedItem && (
        <Typography
          sx={{
            mt: 1,
            color: selectedItem?.stock[0]?.qty > 0 ? "green" : "red",
          }}
        >
          Avilable Qty : {selectedItem?.stock[0]?.qty}
        </Typography>
      )}

      {selectedItem && (
        <Box mt={2} display="flex" gap={1} alignItems="center">
          <Grid container spacing={2} alignItems="center">
            {/* <Grid item xs={4}>
              <TextField
                size="small"
                label="Quantity"
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                inputProps={{ min: 1 }}
                fullWidth
                variant="outlined"
                color="primary"
              />
            </Grid> */}

            <Grid item xs={4}>
              <TextField
                size="small"
                label="Unit Price"
                type="number"
                value={parseInt(price)}
                onChange={(e) => setPrice(e.target.value)}
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
                label="Serial No"
                type="text"
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
                fullWidth
                variant="outlined"
                color="primary"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                label="Battery"
                type="text"
                value={battery}
                onChange={(e) => setBattery(e.target.value)}
                fullWidth
                variant="outlined"
                color="primary"
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Next Service Date"
                  value={nextServiceDate}
                  onChange={(newValue) => setNextServiceDate(newValue)}
                  format="YYYY-MM-DD"
                />
              </LocalizationProvider>
            </Grid>

            {/* <Grid item xs={4}>
              <Typography>
                Subtotal : Rs. {numberWithCommas(Number(qty) * Number(price))}
              </Typography>
            </Grid> */}
          </Grid>
        </Box>
      )}

      <Box mt={1} textAlign="right">
        <Button
          variant="contained"
          onClick={handleAddItem}
          color="primary"
          disabled={!selectedItem || Number(price) <= 0}
          size="small"
        >
          Add to Invoice
        </Button>
      </Box>
    </Paper>
  );
}
