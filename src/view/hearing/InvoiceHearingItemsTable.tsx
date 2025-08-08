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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormContext } from "react-hook-form";
import { numberWithCommas } from "../../utils/numberWithCommas";
import DiscountInput from "../../components/inputui/DiscountInput";

export interface InvoiceItem {
  hearing_item: number;
  name: string;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  serial_no: string;
  battery: string;
}

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
  total: number;
  onRemoveItem: (hearing_item: number) => void;
}

export default function InvoiceHearingItemsTable({
  items,
  total,
  onRemoveItem,
}: InvoiceItemsTableProps) {
  const { watch } = useFormContext();
  const grandTotal = total - (watch("discount") || 0);
  return (
    <Box sx={{ mt: 1 }}>
      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Action</TableCell>
              <TableCell align="left">Item Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Unit Price (Rs)</TableCell>
              <TableCell align="right">Subtotal (Rs)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.hearing_item}>
                <TableCell sx={{ m: 0, p: 0 }} align="center">
                  <Tooltip title="Remove Item">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onRemoveItem(item.hearing_item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ m: 0, p: 0 }} align="left">
                  {item.name} | Serial No - {item.serial_no} | Battery - {item.battery}
                </TableCell>
                <TableCell sx={{ m: 0, p: 0 }} align="center">
                  {item.quantity}
                </TableCell>
                <TableCell sx={{ m: 0, p: 0 }} align="right">
                  {item.price_per_unit.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {numberWithCommas(item.subtotal)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                <Typography variant="subtitle1">Discount</Typography>
              </TableCell>
              <TableCell align="right">
                <DiscountInput />
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
                  Rs {numberWithCommas(total - watch("discount") || 0)}
                </Typography>
              </TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} sx={{ fontWeight: "bold" }} align="right">
                Current Payment
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                {parseInt(watch("online_transfer") || 0) +
                  parseInt(watch("credit_card") || 0) +
                  parseInt(watch("cash") || 0)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} sx={{ fontWeight: "bold" }} align="right">
                Balance
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                {grandTotal -
                  (parseInt(watch("online_transfer") || 0) +
                    parseInt(watch("credit_card") || 0) +
                    parseInt(watch("cash") || 0))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
