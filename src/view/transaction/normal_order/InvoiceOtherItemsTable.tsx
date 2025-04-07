import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormContext } from "react-hook-form";

export interface InvoiceItem {
  other_item: number;
  name: string;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
}

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
  total: number;
  onRemoveItem: (other_item: number) => void;
}

export default function InvoiceOtherItemsTable({
  items,
  total,
  onRemoveItem,
}: InvoiceItemsTableProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  return (
    <Box sx={{ mt: 1 }}>
      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <strong>Action</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Item Name</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Quantity</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Unit Price (Rs)</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Subtotal (Rs)</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.other_item}>
                <TableCell sx={{ m: 0, p: 0 }} align="center">
                  <Tooltip title="Remove Item">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onRemoveItem(item.other_item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ m: 0, p: 0 }} align="right">
                  {item.name}
                </TableCell>
                <TableCell sx={{ m: 0, p: 0 }} align="right">
                  {item.quantity}
                </TableCell>
                <TableCell sx={{ m: 0, p: 0 }} align="right">
                  {item.price_per_unit.toFixed(2)}
                </TableCell>
                <TableCell align="right">{item.subtotal.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  Discount
                </Typography>
              </TableCell>
              <TableCell align="right">
                <TextField
                  size="small"
                  inputProps={{
                    min: 0,
                    style: { textAlign: "right" }, // 👈 this aligns the input text to the right
                  }}
                  {...register("discount", { valueAsNumber: true })}
                  label="Discount "
                  type="number"
                  fullWidth
                  variant="outlined"
                  error={!!errors.discount}
                  helperText={errors.discount?.message}
                  onFocus={(e) => {
                    if (e.target.value === "0") {
                      setValue("discount", "");
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value === "") {
                      setValue("discount", 0);
                    }
                  }}
                />
              </TableCell>

              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  Total
                </Typography>
              </TableCell>

              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  Rs {total - watch("discount") || 0}
                </Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
