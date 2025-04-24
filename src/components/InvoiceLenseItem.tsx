import { Delete } from "@mui/icons-material";
import { Paper, Typography, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  LenseFilterModel,
  removeLense,
} from "../features/invoice/lenseFilterSlice";
interface LenseItemProps {
  lense: LenseFilterModel;
}
export default function InvoiceLenseItem({ lense }: LenseItemProps) {
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
        Type: {lense?.lense_detail.type_name}
      </Typography>
      <Typography variant="body2">
        Brand: {lense?.lense_detail.brand_name}
      </Typography>
      <Typography variant="body2">
        Coating: {lense?.lense_detail.coating_name}
      </Typography>
      <Typography variant="body2">Quantity: {lense?.buyQty}</Typography>
      <Typography variant="body2">
        Unite Price: {lense?.price_per_unit}
      </Typography>
      <Typography variant="body2">Total Price: {lense?.subtotal}</Typography>
      <IconButton
        onClick={() => dispatch(removeLense(lense.lense_id))}
        color="error"
      >
        <Delete />
      </IconButton>
    </Paper>
  );
}
