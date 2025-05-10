import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { closeStockDrawer } from "../../features/invoice/stockDrawerSlice";
import ExternalLense from "../../view/transaction/factory_order/ExternalLense";
import PowerToFrameFilter from "../PowerToFrameFilter";
import LensFilter from "../lensFilter/LensFilter";

export default function DrawerStock() {
  const dispatch = useDispatch();
  const stockDrawerType = useSelector(
    (state: RootState) => state.stock_drawer.stockDrawerType
  );
  const stockDrawerOpen = useSelector(
    (state: RootState) => state.stock_drawer.stockDrawerOpen
  );
  const DrawerList = (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1300px",
        margin: "0 auto",
        flexDirection: "column",
        gap: 1,
        justifyContent: "center",
      }}
      role="presentation"
    >
      <IconButton onClick={() => dispatch(closeStockDrawer())}>
        <Close />
      </IconButton>
      <Box>
        {stockDrawerType === "frame" ? (
          <PowerToFrameFilter />
        ) : stockDrawerType === "lense" ? (
          // <PowerToLenseFilter refractionDetail={refractionDetail} />
          <LensFilter />
        ) : stockDrawerType === "none_stock_lense" ? (
          <ExternalLense />
        ) : (
          <>Error Refresh The Page</>
        )}
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        hideBackdrop={true}
        anchor="bottom"
        open={stockDrawerOpen}
        onClose={() => dispatch(closeStockDrawer())}
        PaperProps={{
          style: { height: "50vh" }, // adjust the height to 50% of the viewport height
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
