import { Delete } from "@mui/icons-material";
import { Paper, Typography, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeFrame } from "../features/invoice/frameFilterSlice";
export default function InvoiceFrameItem({ frame }) {
  const dispatch = useDispatch();
  return (
    <div>
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
        <Typography variant="body2">Code: {frame.code}</Typography>
        <Typography variant="body2">Brand: {frame.brand}</Typography>
        <Typography variant="body2">Color: {frame.color}</Typography>
        <Typography variant="body2">Size: {frame.size}</Typography>

        <Typography variant="body2">Quantity: {frame.buyQty}</Typography>
        <Typography variant="body2">Unite Price: {frame.price}</Typography>
        <Typography variant="body2">
          Total Price: {parseInt(frame.price) * frame.buyQty}
        </Typography>
        <IconButton
          onClick={() => dispatch(removeFrame(frame.id))}
          color="error"
        >
          <Delete />
        </IconButton>
      </Paper>
    </div>
  );
}
