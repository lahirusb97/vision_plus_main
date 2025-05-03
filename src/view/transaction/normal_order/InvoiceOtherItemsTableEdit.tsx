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
import DiscountInput from "../../../components/inputui/DiscountInput";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { PaymentModel } from "../../../model/PaymentModel";
import { customerPaymentTotal } from "../../../utils/customerPaymentTotal";
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";
import { formatPaymentMethod } from "../../../utils/formatPaymentMethod";

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
  paymentList: PaymentModel[];
}

export default function InvoiceOtherItemsTableEdit({
  items,
  total,
  onRemoveItem,
  paymentList,
}: InvoiceItemsTableProps) {
  const { watch } = useFormContext();
  const totalPrePayments = customerPaymentTotal(paymentList);
  const discount = watch("discount") || 0;

  const grandTotal = total - discount;

  return (
    <Box sx={{ mt: 1 }}>
      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Action</TableCell>
              <TableCell align="right">Item Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Unit Price (Rs)</TableCell>
              <TableCell align="right">Subtotal (Rs)</TableCell>
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
            {paymentList.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="right" colSpan={3}>
                  {formatPaymentMethod(item.payment_method)}
                </TableCell>
                <TableCell align="right">
                  {formatDateTimeByType(item.payment_date)}
                </TableCell>
                <TableCell align="right">
                  {numberWithCommas(item.amount)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  Total
                </Typography>
              </TableCell>

              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  {numberWithCommas(
                    grandTotal -
                      totalPrePayments -
                      (parseInt(watch("online_transfer") || 0) +
                        parseInt(watch("credit_card") || 0) +
                        parseInt(watch("cash") || 0))
                  )}
                </Typography>
              </TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", border: "none" }}
                align="right"
                colSpan={4}
              >
                Balance
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", border: "none" }}
                align="right"
                colSpan={5}
              >
                {grandTotal -
                  totalPrePayments -
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
