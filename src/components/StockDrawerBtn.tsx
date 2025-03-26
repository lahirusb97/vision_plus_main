import { Box, Button } from "@mui/material";
import { openStockDrawer } from "../features/invoice/stockDrawerSlice";
import { useDispatch } from "react-redux";
export default function StockDrawerBtn() {
  const dispatch = useDispatch();

  return (
    <div>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          size="small"
          onClick={() => dispatch(openStockDrawer("frame"))}
          color="primary"
          variant="contained"
        >
          Frames
        </Button>
        <Button
          size="small"
          onClick={() => dispatch(openStockDrawer("lense"))}
          color="primary"
          variant="contained"
        >
          In Stock Lense
        </Button>
        {/* <Button
            onClick={() => dispatch(openStockDrawer("none_stock_lense"))}
            color="secondary"
            variant="contained"
          >
            None Stock Lense
          </Button> */}
        <Button
          size="small"
          onClick={() => dispatch(openStockDrawer("none_stock_lense"))}
          color="secondary"
          variant="contained"
        >
          None Stock Lense
        </Button>
      </Box>
    </div>
  );
}
