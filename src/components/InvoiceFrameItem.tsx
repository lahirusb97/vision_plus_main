import { Delete } from "@mui/icons-material";
import { Paper, Typography, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  FrameFilterModel,
  removeFrame,
} from "../features/invoice/frameFilterSlice";
import { numberWithCommas } from "../utils/numberWithCommas";

interface Props {
  frame: FrameFilterModel;
}

export default function InvoiceFrameItem({ frame }: Props) {
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
        <Typography variant="body2">
          Code: {frame.frame_detail.code_name}
        </Typography>
        <Typography variant="body2">
          Brand: {frame.frame_detail.brand_name}
        </Typography>
        <Typography variant="body2">
          Color: {frame.frame_detail.color_name}
        </Typography>
        <Typography variant="body2">Size: {frame.frame_detail.size}</Typography>
        <Typography variant="body2">
          Species: {frame.frame_detail.species}
        </Typography>
        <Typography variant="body2">
          {frame.frame_detail.brand_type_display}
        </Typography>

        <Typography variant="body2">Quantity: {frame.buyQty}</Typography>
        <Typography variant="body2">
          Unite Price: {numberWithCommas(frame.price_per_unit)}
        </Typography>
        <Typography variant="body2">
          Total Price: {numberWithCommas(frame.subtotal)}
        </Typography>
        <IconButton
          onClick={() => dispatch(removeFrame(frame.frame_id))}
          color="error"
        >
          <Delete />
        </IconButton>
      </Paper>
    </div>
  );
}
