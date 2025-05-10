import { Box, Button } from "@mui/material";
import { openStockDrawer } from "../features/invoice/stockDrawerSlice";
import { useDispatch } from "react-redux";
import { RefractionDetailModel } from "../model/RefractionDetailModel";
import toast from "react-hot-toast";
export default function StockDrawerBtn({
  refractionDetail,
}: {
  refractionDetail: RefractionDetailModel | null;
}) {
  const dispatch = useDispatch();

  return (
    <div>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          size="small"
          onClick={() =>
            dispatch(
              openStockDrawer({
                stockDrawerType: "frame",
                refractionDetail: null,
              })
            )
          }
          color="primary"
          variant="contained"
        >
          Frames
        </Button>
        <Button
          size="small"
          onClick={() => {
            if (refractionDetail) {
              dispatch(
                openStockDrawer({
                  stockDrawerType: "lense",
                  refractionDetail: refractionDetail,
                })
              );
            } else {
              toast.error("No Refraction Detail Found to open Lense Store");
            }
          }}
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
          onClick={() =>
            dispatch(
              openStockDrawer({
                stockDrawerType: "none_stock_lense",
                refractionDetail: null,
              })
            )
          }
          color="secondary"
          variant="contained"
        >
          None Stock Lense
        </Button>
      </Box>
    </div>
  );
}
