import { Delete } from "@mui/icons-material";
import { Paper, Typography, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeLense } from "../features/invoice/lenseFilterSlice";
import { LenseModel, LenseWithQty } from "../model/LenseModel";
import { blue, orange, purple, yellow } from "@mui/material/colors";

export default function InvoiceLenseItem({ lense }: LenseWithQty) {
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
      <Typography variant="body2">Type: {lense?.type_name}</Typography>
      <Typography variant="body2">Brand: {lense?.brand_name}</Typography>
      <Typography variant="body2">Coating: {lense?.coating_name}</Typography>
      <Typography variant="body2">Quantity: {lense?.buyQty}</Typography>
      <Typography variant="body2">Unite Price: {lense?.price}</Typography>
      <Typography variant="body2">
        Total Price: {parseInt(lense?.price) * lense?.buyQty}
      </Typography>
      <IconButton onClick={() => dispatch(removeLense(lense.id))} color="error">
        <Delete />
      </IconButton>
    </Paper>
  );
}
