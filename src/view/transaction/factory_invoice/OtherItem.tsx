import React from "react";
import useGetOtherItems from "../../../hooks/useGetOtherItems";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import DropdownInput from "../../../components/inputui/DropdownInput";
import {
  removeOtherItem,
  setotherItem,
} from "../../../features/invoice/otherItemSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Delete, Remove } from "@mui/icons-material";
export default function OtherItem() {
  const { items, itemsLoading } = useGetOtherItems();
  const [selectedItem, setSelecedIteme] = React.useState<{
    id: number | null;
    name: string | null;
    price: number;
  }>({
    id: null,
    name: null,
    price: 0,
  });
  const [price, setPrice] = React.useState<number>(0);
  const selectedFrameList = useSelector(
    (state: RootState) => state.invoice_other_Item.selectedOtherItems
  );
  const dispatch = useDispatch();
  console.log(selectedFrameList);

  const addItems = () => {
    if (selectedItem.id) {
      dispatch(
        setotherItem({
          id: selectedItem.id,
          name: selectedItem.name,
          price: price,
        })
      );
    }
  };
  return (
    <div>
      <Paper variant="elevation" sx={{ padding: 2, m: 2 }}>
        <Typography variant="h6">Select Other Items </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <DropdownInput
            options={items}
            onChange={(selectedId) => {
              if (selectedId) {
                const item = items.filter((item) => item.id === selectedId);
                setSelecedIteme(item[0]);
                setPrice(item[0].price || 0);
              } else {
                setSelecedIteme({
                  id: null,
                  name: null,
                  price: 0,
                });
                setPrice(0);
              }
            }}
            loading={itemsLoading}
            labelName="Select Code"
            defaultId={selectedItem.id}
          />
          <TextField
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
            size="small"
            value={price}
          />
          <Button onClick={addItems} variant="contained">
            Add
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Name</Typography>
            <Typography>Unit Price</Typography>
            <Typography>Qty</Typography>
            <Typography>Total Price</Typography>
            <Typography></Typography>
          </Box>
          {Object.values(selectedFrameList).length !== 0 &&
            Object.values(selectedFrameList).map((frame) => (
              <Paper
                sx={{ display: "flex", justifyContent: "space-between", p: 1 }}
              >
                <Typography>{frame.name}</Typography>
                <Typography>{frame.price}</Typography>
                <Typography>{frame.buyQty}</Typography>
                <Typography>{frame.buyQty * frame.price}</Typography>
                <IconButton
                  onClick={() => dispatch(removeOtherItem(frame.id))}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </Paper>
            ))}
        </Box>
      </Paper>
    </div>
  );
}
