import { Delete } from "@mui/icons-material";
import { Paper, Typography, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  ExternalLenseFilterModel,
  removeexternalLense,
} from "../features/invoice/externalLenseSlice";
interface LenseItemProps {
  lense: ExternalLenseFilterModel;
}
export default function InvoiceExternalLenseItem({ lense }: LenseItemProps) {
  const dispatch = useDispatch();

  return (
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
      <Typography variant="body2">
        Type: {lense?.external_lens_details.type_name}
      </Typography>
      <Typography variant="body2">
        Brand: {lense?.external_lens_details.brand_name}
      </Typography>
      <Typography variant="body2">
        Coating: {lense?.external_lens_details.coating_name}
      </Typography>
      <Typography variant="body2">Quantity: {lense?.buyQty}</Typography>
      <Typography variant="body2">
        Unite Price: {lense?.price_per_unit}
      </Typography>
      <Typography variant="body2">Total Price: {lense?.subtotal}</Typography>
      <IconButton
        onClick={() => dispatch(removeexternalLense(lense.external_lens_id))}
        color="error"
      >
        <Delete />
      </IconButton>
    </Paper>
  );
}
